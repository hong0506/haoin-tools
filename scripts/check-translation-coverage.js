#!/usr/bin/env node

/**
 * Check translation coverage across all locales
 * Usage: node scripts/check-translation-coverage.js [--fail-on-missing]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES_DIR = path.join(__dirname, '../src/i18n/locales');
const BASE_LOCALE = 'en.json';
const FAIL_ON_MISSING = process.argv.includes('--fail-on-missing');

function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error(`❌ Error loading ${filePath}:`, error.message);
    return null;
  }
}

function getAllKeys(obj, prefix = '') {
  let keys = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

function getValueByPath(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function checkCoverage() {
  const baseFile = path.join(LOCALES_DIR, BASE_LOCALE);
  const baseTranslations = loadJSON(baseFile);
  
  if (!baseTranslations) {
    console.error(`❌ Cannot load base locale: ${BASE_LOCALE}`);
    process.exit(1);
  }

  const baseKeys = getAllKeys(baseTranslations);
  console.log(`📚 Base locale (${BASE_LOCALE}) has ${baseKeys.length} keys\n`);

  const locales = fs.readdirSync(LOCALES_DIR)
    .filter(f => f.endsWith('.json') && f !== BASE_LOCALE)
    .sort();

  const report = {
    baseLocale: BASE_LOCALE,
    totalKeys: baseKeys.length,
    locales: {},
    overallCoverage: 0,
  };

  let hasErrors = false;

  locales.forEach(locale => {
    const localeFile = path.join(LOCALES_DIR, locale);
    const translations = loadJSON(localeFile);
    
    if (!translations) return;

    const missingKeys = [];
    const emptyKeys = [];
    const presentKeys = [];

    baseKeys.forEach(key => {
      const value = getValueByPath(translations, key);
      
      if (value === undefined) {
        missingKeys.push(key);
      } else if (value === '' || (typeof value === 'string' && value.trim() === '')) {
        emptyKeys.push(key);
      } else {
        presentKeys.push(key);
      }
    });

    const coverage = (presentKeys.length / baseKeys.length * 100).toFixed(2);
    const localeCode = locale.replace('.json', '');

    report.locales[localeCode] = {
      coverage: parseFloat(coverage),
      present: presentKeys.length,
      missing: missingKeys.length,
      empty: emptyKeys.length,
      missingKeys,
      emptyKeys,
    };

    const icon = coverage >= 100 ? '✅' : coverage >= 90 ? '⚠️' : '❌';
    console.log(`${icon} ${localeCode.toUpperCase()}: ${coverage}% (${presentKeys.length}/${baseKeys.length})`);

    if (missingKeys.length > 0) {
      console.log(`   📋 Missing: ${missingKeys.length} keys`);
      if (FAIL_ON_MISSING) hasErrors = true;
    }
    
    if (emptyKeys.length > 0) {
      console.log(`   ⚠️  Empty: ${emptyKeys.length} keys`);
    }
  });

  // Calculate overall coverage
  const coverages = Object.values(report.locales).map(l => l.coverage);
  report.overallCoverage = (coverages.reduce((a, b) => a + b, 0) / coverages.length).toFixed(2);

  console.log(`\n📊 Overall Coverage: ${report.overallCoverage}%`);

  // Save detailed report
  const reportFile = path.join(__dirname, '../i18n-coverage-report.json');
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(`📄 Detailed report: ${reportFile}\n`);

  if (FAIL_ON_MISSING && hasErrors) {
    console.error('❌ Translation coverage check failed! Missing translations detected.');
    process.exit(1);
  }

  if (report.overallCoverage < 100) {
    console.warn('⚠️  Translation coverage is incomplete. Run: npm run i18n:translate');
  } else {
    console.log('✅ All translations complete!');
  }
}

checkCoverage();
