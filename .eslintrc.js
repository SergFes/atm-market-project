module.exports = {
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
    'import/prefer-default-export': 0,
    "indent": ["error", 4],
    "react/jsx-indent": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "no-restricted-syntax": "off",
    "import/named": "off",
    "no-param-reassign": "off",
    "react/button-has-type": "off",
    "lines-between-class-members": "off",
    "consistent-return": "off",
    "no-plusplus": "off",
    "react/jsx-one-expression-per-line": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react/jsx-indent-props": "off",
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': "never",
        'tsx': "never"
      }
    ]
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts','.tsx']
    },
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    node: true
  }
};
