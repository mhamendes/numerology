const sortImports = {
  groups: [
    // Side effect imports first i.e. import "some-polyfill";
    ['^\\u0000'],
    // React, react-native, react prefixed imports, all other 3rd party imports
    ['^react$', '^react-native$', '^react', '^@?\\w'],
    // Shared code imports
    ['^:.*'],
    // Root level and App specific imports
    ['^@/(components|hooks|pages|messages|lib|i18n)(/.*)?'],
    // Parent imports. Put `..` last.
    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
    // Other relative imports. Put same-folder imports and `.` last.
    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
  ],
};

module.exports = {
  root: true,
  ignorePatterns: ['*.js'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'next/typescript',
  ],
  plugins: ['no-relative-import-paths', 'simple-import-sort'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'simple-import-sort/imports': ['warn', sortImports],
    'simple-import-sort/exports': 'warn',
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
};
