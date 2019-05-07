const eslint = require('eslint')
const Linter = eslint.Linter
const SourceCode = eslint.SourceCode

const { appSrc } = require('../config/_paths')

const sourceCode = new SourceCode(appSrc, ast)
const linter = new Linter()
linter.verify(sourceCode, eslintrc)

const eslintrc = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  env: {
    browser: true,
    es6: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2],
    semi: ['error', 'never'],
    quotes: ['error', 'single']
  }
}
