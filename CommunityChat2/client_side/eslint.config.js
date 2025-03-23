import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import nextPlugin from 'eslint-config-next';

export default [
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: typescriptParser,
      sourceType: 'module',
      globals: {
        // React/Next.js globals
        React: 'readonly',
        JSX: 'readonly',
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        localStorage: 'readonly',
        File: 'readonly',
        FileReader: 'readonly',
        // TypeScript DOM types
        HTMLDivElement: 'readonly',
        HTMLInputElement: 'readonly',
        MouseEvent: 'readonly',
        Node: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      next: nextPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      ...nextPlugin.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['off'],
      'no-console': 'off',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', '.next/**'],
  },
];