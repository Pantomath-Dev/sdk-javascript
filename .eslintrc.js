module.exports = {
  env: {
    es2021: true,
    node: true
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['airbnb-typescript/base', 'plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'prettier'],
  rules: {
    // Add custom rules here
    'comma-dangle': 0,
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    '@typescript-eslintno-loop-func': 0
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
};
