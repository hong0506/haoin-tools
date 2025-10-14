#!/usr/bin/env node

/**
 * Generate translation templates for all tools
 * Usage: node scripts/generate-translation-templates.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOOLS_DIR = path.join(__dirname, "../src/pages/tools");
const OUTPUT_DIR = path.join(__dirname, "../i18n-templates");

// Tool name mapping (kebab-case to Title Case)
const TOOL_NAMES = {
  "word-counter": "Word Counter",
  "json-formatter": "JSON Formatter",
  "base64-tool": "Base64 Encoder/Decoder",
  "uuid-generator": "UUID Generator",
  "password-generator": "Password Generator",
  "color-picker": "Color Picker",
  "qr-generator": "QR Code Generator",
  "url-encoder": "URL Encoder/Decoder",
  "markdown-preview": "Markdown Preview",
  "hash-generator": "Hash Generator",
  "timestamp-converter": "Timestamp Converter",
  "regex-tester": "Regex Tester",
  "lorem-ipsum": "Lorem Ipsum Generator",
  "case-converter": "Case Converter",
  "percentage-calculator": "Percentage Calculator",
  "bmi-calculator": "BMI Calculator",
  "loan-calculator": "Loan Calculator",
  "interest-calculator": "Interest Calculator",
  "investment-calculator": "Investment Calculator",
  "currency-converter": "Currency Converter",
  "credit-card-calculator": "Credit Card Calculator",
  "unit-converter": "Unit Converter",
  "age-calculator": "Age Calculator",
  "date-calculator": "Date Calculator",
  "random-picker": "Random Picker",
  "image-compressor": "Image Compressor",
  "image-resizer": "Image Resizer",
  "text-diff": "Text Diff",
  "text-sorter": "Text Sorter",
  "html-to-text": "HTML to Text",
  "csv-to-json": "CSV to JSON",
  "text-replacer": "Text Replacer",
  "duplicate-remover": "Duplicate Remover",
  "json-to-csv": "JSON to CSV",
  "xml-to-json": "XML to JSON",
  "markdown-to-html": "Markdown to HTML",
  "discount-calculator": "Discount Calculator",
  "password-strength-checker": "Password Strength Checker",
  "email-validator": "Email Validator",
  "stopwatch-timer": "Stopwatch & Timer",
  "pomodoro-timer": "Pomodoro Timer",
  "whitespace-remover": "Whitespace Remover",
  "ip-lookup": "IP Lookup",
  "barcode-generator": "Barcode Generator",
  "color-gradient-generator": "Color Gradient Generator",
  "jwt-decoder": "JWT Decoder",
  "sql-formatter": "SQL Formatter",
  "code-minifier": "Code Minifier",
  "http-status-codes": "HTTP Status Codes",
  "api-tester": "API Tester",
  "random-number": "Random Number Generator",
  "tip-calculator": "Tip Calculator",
};

function generateToolTemplate(toolId, toolName) {
  return {
    title: toolName,
    description: `${toolName} - Quick description here`,
    placeholder: "Enter your text here...",
    whatIs: `What is ${toolName}?`,
    whatIsContent: `This tool helps you [describe functionality]. Perfect for [target users]! 🚀`,
    useCases: {
      title: "Common Use Cases",
      case1: {
        title: "Use Case 1",
        description: "Description of first use case",
      },
      case2: {
        title: "Use Case 2",
        description: "Description of second use case",
      },
      case3: {
        title: "Use Case 3",
        description: "Description of third use case",
      },
      case4: {
        title: "Use Case 4",
        description: "Description of fourth use case",
      },
    },
    proTips: {
      title: "💡 Pro Tips",
      tip1: {
        label: "Tip 1",
        text: "Helpful tip text here",
      },
      tip2: {
        label: "Tip 2",
        text: "Helpful tip text here",
      },
      tip3: {
        label: "Tip 3",
        text: "Helpful tip text here",
      },
      tip4: {
        label: "Tip 4",
        text: "Helpful tip text here",
      },
    },
    relatedTools: {
      title: "🔗 Related Tools",
      tool1: {
        title: "Related Tool 1",
        description: "Short description",
      },
      tool2: {
        title: "Related Tool 2",
        description: "Short description",
      },
      tool3: {
        title: "Related Tool 3",
        description: "Short description",
      },
    },
    messages: {
      success: "Operation successful!",
      error: "Operation failed",
      cleared: "Content cleared",
      copied: "Copied to clipboard!",
      generated: "Generated successfully!",
      loaded: "Loaded successfully!",
      downloaded: "Downloaded successfully!",
    },
    buttons: {
      clear: "Clear",
      copy: "Copy",
      generate: "Generate",
      download: "Download",
      upload: "Upload",
      convert: "Convert",
      format: "Format",
      validate: "Validate",
      reset: "Reset",
    },
  };
}

function getToolIdFromFileName(fileName) {
  // Convert PascalCase to kebab-case
  // e.g., WordCounter.tsx -> word-counter
  return fileName
    .replace(".tsx", "")
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

function generateAllTemplates() {
  console.log("🔨 Generating translation templates for all tools...\n");

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all tool files
  const toolFiles = fs
    .readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .sort();

  const allTemplates = { tools: {} };
  let generatedCount = 0;

  toolFiles.forEach((file) => {
    const toolId = getToolIdFromFileName(file);
    const toolName = TOOL_NAMES[toolId] || file.replace(".tsx", "");

    const template = generateToolTemplate(toolId, toolName);
    allTemplates.tools[toolId] = template;

    // Also save individual template
    const individualFile = path.join(OUTPUT_DIR, `${toolId}.json`);
    fs.writeFileSync(
      individualFile,
      JSON.stringify({ [toolId]: template }, null, 2)
    );

    generatedCount++;
    console.log(`✅ Generated template for: ${toolId}`);
  });

  // Save combined template
  const combinedFile = path.join(OUTPUT_DIR, "all-tools-template.json");
  fs.writeFileSync(combinedFile, JSON.stringify(allTemplates, null, 2));

  console.log(`\n✨ Generated ${generatedCount} templates`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`📄 Combined file: ${combinedFile}\n`);

  // Generate instructions
  const instructions = `
# Translation Templates Generated

## Usage

1. **Review individual templates** in \`i18n-templates/\`
2. **Fill in English content** for each tool
3. **Copy to en.json**:
   \`\`\`json
   {
     "tools": {
       // Paste content from all-tools-template.json here
     }
   }
   \`\`\`
4. **Run batch translation**: \`npm run i18n:translate\`

## Template Structure

Each tool has:
- **title**: Tool name
- **description**: Short description
- **whatIs**: Section title
- **whatIsContent**: Introduction paragraph
- **useCases**: 4 use case cards
- **proTips**: 4 pro tips
- **relatedTools**: 3 related tool links
- **messages**: Toast/alert messages
- **buttons**: Button labels

## Next Steps

1. Manually fill in English content for high-priority tools
2. Use AI assistance for initial drafts
3. Review and refine
4. Batch translate to other languages
`;

  const instructionsFile = path.join(OUTPUT_DIR, "README.md");
  fs.writeFileSync(instructionsFile, instructions);

  console.log("📖 Instructions saved to: i18n-templates/README.md");
}

generateAllTemplates();
