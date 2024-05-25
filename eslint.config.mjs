import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
import angularParser from '@angular-eslint/template-parser';
// import importLints from 'eslint-plugin-import';
// import rxjsLints from 'eslint-plugin-rxjs';
import angularLints from '@angular-eslint/eslint-plugin';
// import angularLintsTemplate from '@angular-eslint/eslint-plugin-template';
import prettierLints from 'eslint-plugin-prettier';

const __dirname = import.meta.dirname;
const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
  recommendedConfig: js.configs.recommended, // optional unless using "eslint:recommended"
  allConfig: js.configs.all, // optional unless using "eslint:all"
});

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parser: angularParser,
      parserOptions: {
        parser: angularParser,
      },
    },
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  // ...compat.config(importLints.configs.recommended),
  // ...compat.config(importLints.configs.typescript),
  // ...compat.config(rxjsLints.configs.recommended),
  ...compat.config(angularLints.configs.recommended),
  // ...compat.config(angularLintsTemplate.configs.recommended),
  // ...compat.config(angularLintsTemplate.configs.accessibility),
  ...compat.config(prettierLints.configs.recommended),

  {
    files: ['**/*.ts', '**/*.tsx'],
    settings: {
      // Manually add "src/" directory to import plugin's "internal" group
      'import/internal-regex': '^src/',
    },
    rules: {
      // Angular fixes
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
      '@typescript-eslint/no-extraneous-class': [
        'error',
        { allowWithDecorator: true },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': ['error'],

      // Preferences
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'forbid',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
      ],
      // 'import/no-unresolved': 'off',
      // 'import/order': [
      //   'error',
      //   {
      //     groups: [
      //       // Global
      //       ['builtin', 'external'],

      //       // Project
      //       ['internal', 'parent', 'sibling', 'index'],

      //       // Misc.
      //       'type',
      //       'object',
      //       'unknown',
      //     ],
      //     'newlines-between': 'always',
      //     alphabetize: {
      //       order: 'asc',
      //       caseInsensitive: true,
      //     },
      //   },
      // ],

      // RxJS fixes.
      // 'import/namespace': 'off',
      // 'rxjs/finnish': [
      //   'error',
      //   {
      //     functions: false,
      //     methods: false,
      //     names: {
      //       '^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate)$': false,
      //     },
      //     parameters: true,
      //     properties: true,
      //     strict: false,
      //     types: {
      //       '^EventEmitter$': false,
      //       '^Store$': false,
      //     },
      //     variables: true,
      //   },
      // ],
      // 'rxjs/no-compat': ['error'],
      // 'rxjs/no-exposed-subjects': ['error'],
      // 'rxjs/no-nested-subscribe': ['off'],
    },
  },
  // {
  //   files: ['*.html'],
  //   extends: ['plugin:@angular-eslint/template/recommended'],
  //   rules: {},
  // },
  {
    ignores: [
      '.angular/**',
      'karma.conf.js',
      'postcss.config.js',
      'tailwind.config.js',
    ],
  },
];
