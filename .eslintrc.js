module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ['@typescript-eslint', 'react'],
  env: {
    browser: true,
    es6: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    indent: ["error", 2],
    semi: ["error", "never"],
    quotes: ["error", "single"]
  }
};