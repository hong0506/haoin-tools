#!/usr/bin/env node

/**
 * Extract hardcoded strings from TSX files
 * Usage: node scripts/extract-i18n-strings.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOOLS_DIR = path.join(__dirname, '../src/pages/tools');
const OUTPUT_FILE = path.join(__dirname, '../i18n-extraction-report.json');

// Patterns to extract
const STRING_PATTERNS = [
  // JSX text content: <div>Text here</div>
  />([^<>{}\n]+)</g,
  // String literals in JSX props: placeholder="text"
  /(?:placeholder|title|label|aria-label)=["']([^"']+)["']/g,
  // Toast messages: toast.success("text")
  /toast\.(success|error|info|warning)\(["']([^"']+)["']\)/g,
  // CardTitle, CardDescription text
  /<Card(?:Title|Description)>([^<]+)</g,
];

// Strings to ignore (common React/HTML elements)
const IGNORE_LIST = [
  /^[0-9]+$/,           // Numbers
  /^[a-z]$/i,           // Single letters
  /^[\s\n\r\t]+$/,      // Whitespace
  /^[!@#$%^&*()]+$/,    // Symbols only
  /className|onClick|onChange|onSubmit/i, // React props
  /^(div|span|button|input|select)$/i,    // HTML tags
];

function shouldIgnore(str) {
  if (!str || str.trim().length < 2) return true;
  return IGNORE_LIST.some(pattern => pattern.test(str));
}

function extractStringsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.tsx');
  const strings = new Set();

  // Extract using all patterns
  STRING_PATTERNS.forEach(pattern => {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const text = match[1] || match[2];
      if (text && !shouldIgnore(text)) {
        strings.add(text.trim());
      }
    }
  });

  return {
    file: fileName,
    path: filePath,
    stringsFound: Array.from(strings).sort(),
    count: strings.size,
  };
}

function scanToolsDirectory() {
  const files = fs.readdirSync(TOOLS_DIR)
    .filter(f => f.endsWith('.tsx'))
    .sort();

  const report = {
    timestamp: new Date().toISOString(),
    totalFiles: files.length,
    totalStringsFound: 0,
    files: [],
  };

  files.forEach(file => {
    const filePath = path.join(TOOLS_DIR, file);
    const result = extractStringsFromFile(filePath);
    report.files.push(result);
    report.totalStringsFound += result.count;
  });

  return report;
}

function main() {
  console.log('🔍 Extracting hardcoded strings from tool pages...\n');

  const report = scanToolsDirectory();

  // Save report
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2));

  // Display summary
  console.log(`✅ Scanned ${report.totalFiles} files`);
  console.log(`📝 Found ${report.totalStringsFound} hardcoded strings`);
  console.log(`📄 Report saved to: ${OUTPUT_FILE}\n`);

  // Show top 5 files with most strings
  const topFiles = report.files
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  console.log('🔝 Top 5 files with most hardcoded strings:');
  topFiles.forEach((f, i) => {
    console.log(`${i + 1}. ${f.file}: ${f.count} strings`);
  });
}

main();
