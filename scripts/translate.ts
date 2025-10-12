#!/usr/bin/env ts-node

/**
 * Robust Machine Translation CLI
 * Translates i18n JSON files using OpenAI or Anthropic
 * 
 * Usage:
 *   npm run i18n:translate
 *   npm run i18n:translate -- --locale zh
 *   npm run i18n:translate -- --provider anthropic
 */

import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

// Load environment variables
config();

// Configuration
const LOCALES_DIR = path.join(__dirname, '../src/i18n/locales');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['zh', 'es', 'pt', 'id', 'vi', 'fr', 'de', 'ja', 'ko'];
const BATCH_SIZE = 200;
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // ms

// DO NOT TRANSLATE - Brand names, technical terms, file formats
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
];

// Locale display names for better translations
const LOCALE_NAMES: Record<string, string> = {
  zh: 'Simplified Chinese (简体中文)',
  es: 'Spanish (Español)',
  pt: 'Portuguese (Português do Brasil)',
  id: 'Indonesian (Bahasa Indonesia)',
  vi: 'Vietnamese (Tiếng Việt)',
  fr: 'French (Français)',
  de: 'German (Deutsch)',
  ja: 'Japanese (日本語)',
  ko: 'Korean (한국어)',
};

// Provider type
type Provider = 'openai' | 'anthropic';

// Translation result
interface TranslationResult {
  locale: string;
  total: number;
  translated: number;
  skipped: number;
  errors: number;
}

/**
 * Flatten nested JSON into dot-notation keys
 */
function flattenJSON(obj: any, prefix = ''): Record<string, string> {
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
 * Unflatten dot-notation keys back to nested JSON
 */
function unflattenJSON(flat: Record<string, string>): any {
  const result: any = {};

  for (const [key, value] of Object.entries(flat)) {
    const keys = key.split('.');
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!current[k]) {
        current[k] = {};
      }
      current = current[k];
    }

    current[keys[keys.length - 1]] = value;
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
 * Build translation prompt
 */
function buildPrompt(
  texts: Record<string, string>,
  targetLocale: string,
  localeName: string
): string {
  const glossary = DO_NOT_TRANSLATE.join(', ');
  const entries = Object.entries(texts)
    .map(([key, value]) => `${key}|||${value}`)
    .join('\n');

  return `You are a professional translator. Translate the following UI strings to ${localeName}.

CRITICAL RULES:
1. Preserve ALL placeholders like {name}, {count}, {value}, {min}, {max} EXACTLY as they appear
2. Do NOT translate these terms: ${glossary}
3. Keep HTML tags unchanged (e.g., <strong>, <code>, <br>)
4. Maintain punctuation and formatting
5. Keep emojis unchanged
6. Output format: key|||translated_text (one per line)
7. Do not add explanations or comments

Input format: key|||english_text

${entries}

Translate each line, keeping the key|||format:`;
}

/**
 * Parse translation response
 */
function parseTranslationResponse(response: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = response.trim().split('\n');

  for (const line of lines) {
    const match = line.match(/^(.+?)\|\|\|(.+)$/);
    if (match) {
      const [, key, translation] = match;
      result[key.trim()] = translation.trim();
    }
  }

  return result;
}

/**
 * Validate translation preserves placeholders
 */
function validateTranslation(original: string, translated: string): boolean {
  const originalPlaceholders = extractPlaceholders(original);
  const translatedPlaceholders = extractPlaceholders(translated);

  if (originalPlaceholders.length !== translatedPlaceholders.length) {
    return false;
  }

  for (const placeholder of originalPlaceholders) {
    if (!translatedPlaceholders.includes(placeholder)) {
      return false;
    }
  }

  return true;
}

/**
 * Translate using OpenAI
 */
async function translateWithOpenAI(
  texts: Record<string, string>,
  targetLocale: string,
  localeName: string
): Promise<Record<string, string>> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not found in environment variables');
  }

  const openai = new OpenAI({ apiKey });
  const prompt = buildPrompt(texts, targetLocale, localeName);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are a professional UI/UX translator. Follow instructions precisely.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0,
    max_tokens: 4000,
  });

  const responseText = completion.choices[0]?.message?.content || '';
  return parseTranslationResponse(responseText);
}

/**
 * Translate using Anthropic Claude
 */
async function translateWithAnthropic(
  texts: Record<string, string>,
  targetLocale: string,
  localeName: string
): Promise<Record<string, string>> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not found in environment variables');
  }

  const anthropic = new Anthropic({ apiKey });
  const prompt = buildPrompt(texts, targetLocale, localeName);

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    temperature: 0,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const responseText =
    message.content[0].type === 'text' ? message.content[0].text : '';
  return parseTranslationResponse(responseText);
}

/**
 * Translate batch with retry logic
 */
async function translateBatch(
  batch: Record<string, string>,
  targetLocale: string,
  provider: Provider,
  retries = MAX_RETRIES
): Promise<Record<string, string>> {
  const localeName = LOCALE_NAMES[targetLocale] || targetLocale;

  try {
    const translated =
      provider === 'openai'
        ? await translateWithOpenAI(batch, targetLocale, localeName)
        : await translateWithAnthropic(batch, targetLocale, localeName);

    // Validate translations
    const validated: Record<string, string> = {};
    for (const [key, original] of Object.entries(batch)) {
      const translation = translated[key];
      if (translation && validateTranslation(original, translation)) {
        validated[key] = translation;
      } else {
        console.warn(`⚠️  Invalid translation for key: ${key}`);
        validated[key] = original; // Fallback to original
      }
    }

    return validated;
  } catch (error: any) {
    if (retries > 0) {
      console.warn(
        `⚠️  Translation failed, retrying... (${retries} attempts left)`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return translateBatch(batch, targetLocale, provider, retries - 1);
    }
    throw error;
  }
}

/**
 * Split object into batches
 */
function createBatches<T>(
  obj: Record<string, T>,
  batchSize: number
): Record<string, T>[] {
  const entries = Object.entries(obj);
  const batches: Record<string, T>[] = [];

  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = Object.fromEntries(entries.slice(i, i + batchSize));
    batches.push(batch);
  }

  return batches;
}

/**
 * Translate entire locale
 */
async function translateLocale(
  sourceTexts: Record<string, string>,
  targetLocale: string,
  provider: Provider
): Promise<TranslationResult> {
  console.log(`\n🌍 Translating to ${LOCALE_NAMES[targetLocale] || targetLocale}...`);

  const result: TranslationResult = {
    locale: targetLocale,
    total: Object.keys(sourceTexts).length,
    translated: 0,
    skipped: 0,
    errors: 0,
  };

  // Load existing translations
  const targetPath = path.join(LOCALES_DIR, `${targetLocale}.json`);
  let existingTranslations: Record<string, string> = {};

  if (fs.existsSync(targetPath)) {
    const existingJSON = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
    existingTranslations = flattenJSON(existingJSON);
  }

  // Find keys that need translation
  const needsTranslation: Record<string, string> = {};
  for (const [key, value] of Object.entries(sourceTexts)) {
    const existing = existingTranslations[key];
    if (!existing || existing === value) {
      // Missing or identical to English
      needsTranslation[key] = value;
    } else {
      result.skipped++;
    }
  }

  if (Object.keys(needsTranslation).length === 0) {
    console.log(`✅ ${targetLocale}: All translations up to date!`);
    return result;
  }

  console.log(`📝 Found ${Object.keys(needsTranslation).length} keys to translate`);

  // Translate in batches
  const batches = createBatches(needsTranslation, BATCH_SIZE);
  const allTranslations: Record<string, string> = { ...existingTranslations };

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`   Batch ${i + 1}/${batches.length} (${Object.keys(batch).length} keys)...`);

    try {
      const translated = await translateBatch(batch, targetLocale, provider);
      Object.assign(allTranslations, translated);
      result.translated += Object.keys(translated).length;
    } catch (error: any) {
      console.error(`❌ Batch ${i + 1} failed:`, error.message);
      result.errors += Object.keys(batch).length;
    }

    // Small delay between batches
    if (i < batches.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Save translations
  const unflattened = unflattenJSON(allTranslations);
  fs.writeFileSync(targetPath, JSON.stringify(unflattened, null, 2) + '\n', 'utf-8');

  console.log(`✅ ${targetLocale}: ${result.translated} translated, ${result.skipped} skipped, ${result.errors} errors`);
  return result;
}

/**
 * Main execution
 */
async function main() {
  console.log('🌍 Haoin Tools - Machine Translation CLI\n');

  // Parse arguments
  const args = process.argv.slice(2);
  const localeArg = args.find((arg) => arg.startsWith('--locale='));
  const providerArg = args.find((arg) => arg.startsWith('--provider='));

  const targetLocale = localeArg?.split('=')[1];
  const provider = (providerArg?.split('=')[1] || 'openai') as Provider;

  // Validate provider
  if (provider !== 'openai' && provider !== 'anthropic') {
    console.error('❌ Invalid provider. Use --provider=openai or --provider=anthropic');
    process.exit(1);
  }

  console.log(`🤖 Using provider: ${provider.toUpperCase()}\n`);

  // Load source translations
  const sourcePath = path.join(LOCALES_DIR, `${SOURCE_LOCALE}.json`);
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source file not found: ${sourcePath}`);
    process.exit(1);
  }

  const sourceJSON = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
  const sourceTexts = flattenJSON(sourceJSON);

  console.log(`📖 Loaded ${Object.keys(sourceTexts).length} keys from ${SOURCE_LOCALE}.json\n`);

  // Translate
  const locales = targetLocale ? [targetLocale] : TARGET_LOCALES;
  const results: TranslationResult[] = [];

  for (const locale of locales) {
    try {
      const result = await translateLocale(sourceTexts, locale, provider);
      results.push(result);
    } catch (error: any) {
      console.error(`❌ Failed to translate ${locale}:`, error.message);
      results.push({
        locale,
        total: Object.keys(sourceTexts).length,
        translated: 0,
        skipped: 0,
        errors: Object.keys(sourceTexts).length,
      });
    }
  }

  // Print summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 TRANSLATION SUMMARY');
  console.log('═'.repeat(60));
  console.log();

  const totalKeys = Object.keys(sourceTexts).length;
  console.log(`Total source keys: ${totalKeys}`);
  console.log();

  console.log('┌────────┬───────────┬─────────┬────────┐');
  console.log('│ Locale │ Translated│ Skipped │ Errors │');
  console.log('├────────┼───────────┼─────────┼────────┤');

  for (const result of results) {
    const locale = result.locale.padEnd(6);
    const translated = result.translated.toString().padStart(9);
    const skipped = result.skipped.toString().padStart(7);
    const errors = result.errors.toString().padStart(6);
    console.log(`│ ${locale} │ ${translated} │ ${skipped} │ ${errors} │`);
  }

  console.log('└────────┴───────────┴─────────┴────────┘');
  console.log();

  const totalTranslated = results.reduce((sum, r) => sum + r.translated, 0);
  const totalErrors = results.reduce((sum, r) => sum + r.errors, 0);

  if (totalErrors > 0) {
    console.log(`⚠️  ${totalErrors} keys failed to translate`);
  }

  if (totalTranslated > 0) {
    console.log(`✅ Successfully translated ${totalTranslated} keys across ${results.length} locales`);
  } else {
    console.log(`✅ All translations are up to date!`);
  }

  console.log('\n💡 Next steps:');
  console.log('   1. Review translations in src/i18n/locales/');
  console.log('   2. Test in browser with language switcher');
  console.log('   3. Run: npm run i18n:check');
  console.log();
}

// Run
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
