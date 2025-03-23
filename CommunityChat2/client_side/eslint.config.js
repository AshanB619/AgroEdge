import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    // Apply to JavaScript and TypeScript files
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: typescriptParser, // Use TypeScript parser for .ts and .tsx files
      sourceType: 'module', // Support ES modules
      globals: {
        // Define globals for Next.js and React
        React: 'readonly',
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      // Use recommended rules from ESLint and TypeScript
      ...js.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      // Add custom rules or override defaults as needed
      'no-unused-vars': 'off', // Warn on unused variables
      '@typescript-eslint/no-unused-vars': ['off'], // Warn on unused variables in TypeScript
      'no-console': 'off', // Warn on console.log statements
    },
  },
  {
    // Ignore certain files and directories
    ignores: ['node_modules/**', 'dist/**', '.next/**'],
  },
];