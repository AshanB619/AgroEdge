module.exports = {
    env: {
      browser: true, // Enable browser globals (e.g., window, document)
      node: true, // Enable Node.js globals (e.g., process)
      es2021: true, // Enable modern JavaScript features
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'next', // Includes eslint-config-next rules
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['@typescript-eslint'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['off'],
      'no-console': 'off',
      '@next/next/no-html-link-for-pages': 'off',
    },
    ignorePatterns: ['node_modules/**', 'dist/**', '.next/**'],
  };