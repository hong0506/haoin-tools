#!/usr/bin/env ts-node

/**
 * i18n Validation Script
 * Enforces 100% translation coverage and placeholder integrity
 * 
 * Usage:
 *   npm run i18n:validate
 *   npm run i18n:validate -- --strict  (fail on warnings)
 *   npm run i18n:validate -- --locale=zh  (check single locale)
 */

import * as fs from 'fs';
import * as path from 'path';

// Configuration
const LOCALES_DIR = path.join(__dirname, '../src/i18n/locales');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['zh', 'es', 'pt', 'id', 'vi', 'fr', 'de', 'ja', 'ko'];

// Terms that are allowed to be identical to English
const DO_NOT_TRANSLATE = [
  'Haoin',
  'HaoIn',
  'QR',
  'JSON',
  'URL',
  'API',
  'SVG',
  'PNG',
  'JPG',
  'JPEG',
  'CSV',
  'XML',
  'HTML',
  'CSS',
  'JWT',
  'UUID',
  'Base64',
  'MD5',
  'SHA',
  'SHA-256',
  'SHA-512',
  'HTTP',
  'HTTPS',
  'REST',
  'SQL',
  'Lorem Ipsum',
  'Lorem',
  'Ipsum',
  'QRCode',
  'Regex',
  'RegEx',
  'JavaScript',
  'TypeScript',
  'React',
  'Vite',
  'OAuth',
  'WiFi',
  'Wi-Fi',
  'GitHub',
  'GitLab',
  'npm',
  'yarn',
  'pnpm',
];

// Validation result types
interface ValidationIssue {
  key: string;
  type: 'missing' | 'empty' | 'placeholder_mismatch' | 'identical' | 'invalid_json';
  message: string;
  severity: 'error' | 'warning';
  sourceValue?: string;
  targetValue?: string;
}

interface LocaleValidationResult {
  locale: string;
  totalKeys: number;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  passed: boolean;
}

interface ValidationReport {
  timestamp: string;
  sourceLocale: string;
  totalSourceKeys: number;
  results: LocaleValidationResult[];
  overallPassed: boolean;
  summary: {
    totalLocales: number;
    passedLocales: number;
    failedLocales: number;
    totalErrors: number;
    totalWarnings: number;
  };
}

/**
 * Flatten nested JSON into dot-notation keys
 */
function flattenJSON(obj: Record<string, any>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenJSON(value, newKey));
    } else if (typeof value === 'string') {
      result[newKey] = value;
    }
  }

  return result;
}

/**
 * Extract placeholders from text (e.g., {name}, {count})
 */
function extractPlaceholders(text: string): string[] {
  const matches = text.match(/\{[a-zA-Z0-9_]+\}/g);
  return matches || [];
}

/**
 * Check if text contains any protected term
 */
function containsProtectedTerm(text: string): boolean {
  const lowerText = text.toLowerCase();
  return DO_NOT_TRANSLATE.some(term => {
    const lowerTerm = term.toLowerCase();
    // Match whole words only
    const regex = new RegExp(`\\b${lowerTerm}\\b`, 'i');
    return regex.test(lowerText);
  });
}

/**
 * Load and parse JSON file
 */
function loadJSON(filePath: string): Record<string, any> | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error: any) {
    console.error(`❌ Failed to load ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Validate placeholders match between source and target
 */
function validatePlaceholders(
  sourceText: string,
  targetText: string,
  key: string
): ValidationIssue | null {
  const sourcePlaceholders = extractPlaceholders(sourceText);
  const targetPlaceholders = extractPlaceholders(targetText);

  // Check if counts match
  if (sourcePlaceholders.length !== targetPlaceholders.length) {
    return {
      key,
      type: 'placeholder_mismatch',
      severity: 'error',
      message: `Placeholder count mismatch: source has ${sourcePlaceholders.length}, target has ${targetPlaceholders.length}`,
      sourceValue: sourceText,
      targetValue: targetText,
    };
  }

  // Check if all placeholders are present
  for (const placeholder of sourcePlaceholders) {
    if (!targetPlaceholders.includes(placeholder)) {
      return {
        key,
        type: 'placeholder_mismatch',
        severity: 'error',
        message: `Missing placeholder ${placeholder} in translation`,
        sourceValue: sourceText,
        targetValue: targetText,
      };
    }
  }

  return null;
}

/**
 * Check if translation is identical to source (possibly untranslated)
 */
function checkIdenticalTranslation(
  sourceText: string,
  targetText: string,
  key: string
): ValidationIssue | null {
  // If texts are identical and don't contain protected terms, it's suspicious
  if (sourceText === targetText && !containsProtectedTerm(sourceText)) {
    return {
      key,
      type: 'identical',
      severity: 'warning',
      message: 'Translation identical to source (possibly untranslated)',
      sourceValue: sourceText,
      targetValue: targetText,
    };
  }

  return null;
}

/**
 * Validate a single locale against source
 */
function validateLocale(
  sourceTexts: Record<string, string>,
  targetLocale: string
): LocaleValidationResult {
  const result: LocaleValidationResult = {
    locale: targetLocale,
    totalKeys: Object.keys(sourceTexts).length,
    errors: [],
    warnings: [],
    passed: true,
  };

  // Load target locale file
  const targetPath = path.join(LOCALES_DIR, `${targetLocale}.json`);
  
  if (!fs.existsSync(targetPath)) {
    result.errors.push({
      key: '__FILE__',
      type: 'missing',
      severity: 'error',
      message: `Locale file ${targetLocale}.json does not exist`,
    });
    result.passed = false;
    return result;
  }

  const targetJSON = loadJSON(targetPath);
  if (!targetJSON) {
    result.errors.push({
      key: '__FILE__',
      type: 'invalid_json',
      severity: 'error',
      message: `Failed to parse ${targetLocale}.json`,
    });
    result.passed = false;
    return result;
  }

  const targetTexts = flattenJSON(targetJSON);

  // Validate each key
  for (const [key, sourceValue] of Object.entries(sourceTexts)) {
    const targetValue = targetTexts[key];

    // Check if key exists
    if (targetValue === undefined) {
      result.errors.push({
        key,
        type: 'missing',
        severity: 'error',
        message: 'Key missing in target locale',
        sourceValue,
      });
      continue;
    }

    // Check if value is empty
    if (targetValue.trim() === '') {
      result.errors.push({
        key,
        type: 'empty',
        severity: 'error',
        message: 'Translation is empty',
        sourceValue,
        targetValue,
      });
      continue;
    }

    // Validate placeholders
    const placeholderIssue = validatePlaceholders(sourceValue, targetValue, key);
    if (placeholderIssue) {
      result.errors.push(placeholderIssue);
      continue;
    }

    // Check for identical translations (warning only)
    const identicalIssue = checkIdenticalTranslation(sourceValue, targetValue, key);
    if (identicalIssue) {
      result.warnings.push(identicalIssue);
    }
  }

  // Mark as failed if there are errors
  if (result.errors.length > 0) {
    result.passed = false;
  }

  return result;
}

/**
 * Generate validation report
 */
function generateReport(results: LocaleValidationResult[]): ValidationReport {
  const report: ValidationReport = {
    timestamp: new Date().toISOString(),
    sourceLocale: SOURCE_LOCALE,
    totalSourceKeys: results[0]?.totalKeys || 0,
    results,
    overallPassed: results.every(r => r.passed),
    summary: {
      totalLocales: results.length,
      passedLocales: results.filter(r => r.passed).length,
      failedLocales: results.filter(r => !r.passed).length,
      totalErrors: results.reduce((sum, r) => sum + r.errors.length, 0),
      totalWarnings: results.reduce((sum, r) => sum + r.warnings.length, 0),
    },
  };

  return report;
}

/**
 * Print validation results to console
 */
function printResults(report: ValidationReport, strictMode: boolean) {
  console.log('\n' + '═'.repeat(70));
  console.log('🔍 i18n VALIDATION REPORT');
  console.log('═'.repeat(70));
  console.log();
  console.log(`📅 Timestamp: ${report.timestamp}`);
  console.log(`📖 Source: ${report.sourceLocale}.json (${report.totalSourceKeys} keys)`);
  console.log(`🌍 Locales: ${report.summary.totalLocales}`);
  console.log();

  // Print summary table
  console.log('┌──────────┬─────────┬──────────┬──────────┬──────────┐');
  console.log('│ Locale   │ Status  │ Errors   │ Warnings │ Coverage │');
  console.log('├──────────┼─────────┼──────────┼──────────┼──────────┤');

  for (const result of report.results) {
    const locale = result.locale.padEnd(8);
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    const errors = result.errors.length.toString().padStart(6);
    const warnings = result.warnings.length.toString().padStart(8);
    const coverage = `${((result.totalKeys - result.errors.filter(e => e.type === 'missing').length) / result.totalKeys * 100).toFixed(1)}%`.padStart(8);
    
    console.log(`│ ${locale} │ ${status} │ ${errors} │ ${warnings} │ ${coverage} │`);
  }

  console.log('└──────────┴─────────┴──────────┴──────────┴──────────┘');
  console.log();

  // Print detailed issues
  let hasDetailedOutput = false;

  for (const result of report.results) {
    if (result.errors.length === 0 && result.warnings.length === 0) {
      continue;
    }

    hasDetailedOutput = true;
    console.log(`\n📍 ${result.locale.toUpperCase()} Details:`);
    console.log('─'.repeat(70));

    // Print errors
    if (result.errors.length > 0) {
      console.log(`\n❌ Errors (${result.errors.length}):`);
      
      // Group by type
      const errorsByType = result.errors.reduce((acc, err) => {
        if (!acc[err.type]) acc[err.type] = [];
        acc[err.type].push(err);
        return acc;
      }, {} as Record<string, ValidationIssue[]>);

      for (const [type, errors] of Object.entries(errorsByType)) {
        console.log(`\n  ${type.toUpperCase()} (${errors.length}):`);
        errors.slice(0, 5).forEach(err => {
          console.log(`    • ${err.key}`);
          console.log(`      ${err.message}`);
          if (err.sourceValue) {
            console.log(`      Source: "${err.sourceValue.substring(0, 60)}${err.sourceValue.length > 60 ? '...' : ''}"`);
          }
          if (err.targetValue !== undefined) {
            console.log(`      Target: "${err.targetValue.substring(0, 60)}${err.targetValue.length > 60 ? '...' : ''}"`);
          }
        });
        if (errors.length > 5) {
          console.log(`    ... and ${errors.length - 5} more`);
        }
      }
    }

    // Print warnings
    if (result.warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${result.warnings.length}):`);
      result.warnings.slice(0, 5).forEach(warn => {
        console.log(`    • ${warn.key}: ${warn.message}`);
      });
      if (result.warnings.length > 5) {
        console.log(`    ... and ${result.warnings.length - 5} more`);
      }
    }
  }

  // Print summary
  console.log('\n' + '═'.repeat(70));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(70));
  console.log(`Locales validated: ${report.summary.totalLocales}`);
  console.log(`✅ Passed: ${report.summary.passedLocales}`);
  console.log(`❌ Failed: ${report.summary.failedLocales}`);
  console.log(`Errors: ${report.summary.totalErrors}`);
  console.log(`Warnings: ${report.summary.totalWarnings}`);
  console.log();

  if (report.overallPassed) {
    if (report.summary.totalWarnings > 0 && strictMode) {
      console.log('⚠️  PASSED with warnings, but STRICT MODE is enabled');
      console.log('Fix warnings or run without --strict flag');
      return false;
    }
    console.log('✅ ALL VALIDATIONS PASSED!');
    if (report.summary.totalWarnings > 0) {
      console.log(`⚠️  ${report.summary.totalWarnings} warnings found (not blocking)`);
    }
    return true;
  } else {
    console.log('❌ VALIDATION FAILED!');
    console.log(`Fix ${report.summary.totalErrors} errors before deployment`);
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  // Parse arguments
  const args = process.argv.slice(2);
  const strictMode = args.includes('--strict');
  const localeArg = args.find(arg => arg.startsWith('--locale='));
  const targetLocale = localeArg?.split('=')[1];

  // Load source locale
  const sourcePath = path.join(LOCALES_DIR, `${SOURCE_LOCALE}.json`);
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source locale file not found: ${sourcePath}`);
    process.exit(1);
  }

  const sourceJSON = loadJSON(sourcePath);
  if (!sourceJSON) {
    console.error(`❌ Failed to parse source locale: ${sourcePath}`);
    process.exit(1);
  }

  const sourceTexts = flattenJSON(sourceJSON);

  // Validate locales
  const localesToValidate = targetLocale ? [targetLocale] : TARGET_LOCALES;
  const results: LocaleValidationResult[] = [];

  for (const locale of localesToValidate) {
    const result = validateLocale(sourceTexts, locale);
    results.push(result);
  }

  // Generate and print report
  const report = generateReport(results);
  const passed = printResults(report, strictMode);

  // Save report to file
  const reportPath = path.join(__dirname, '../i18n-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  console.log();

  // Exit with appropriate code
  process.exit(passed ? 0 : 1);
}

// Run
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
