import { defineConfig } from 'eslint-define-config'

export default defineConfig({
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended'
  ],
  rules: {
    // Reglas personalizadas aquí
  },
  ignorePatterns: ['dist/**', 'node_modules/**', 'coverage/**'],
  env: {
    node: true,
    browser: true,
    es2022: true
  }
})
