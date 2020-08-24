module.exports = {
  parser: 'babel-eslint',
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:react/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier']
    }
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-unused-vars': 0
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: true
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  }
}
