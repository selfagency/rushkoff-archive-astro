/* eslint-env node */
module.exports = {
  ignorePatterns: ['dist', 'node_modules', 'coverage', 'package.json'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'eslint-config-airbnb-typescript',
    'plugin:perfectionist/recommended-natural',
    'plugin:security/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.md'],
      parser: 'eslint-plugin-markdownlint/parser',
      extends: ['plugin:markdownlint/recommended'],
    },
  ],
  plugins: ['@typescript-eslint', 'perfectionist'],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
