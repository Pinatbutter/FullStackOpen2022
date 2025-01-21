module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'crlf' }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    'react/prop-types': 'off',
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  },
};
