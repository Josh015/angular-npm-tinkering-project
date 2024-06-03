import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import importeslint from 'eslint-plugin-import';
// import rxjsLints from 'eslint-plugin-rxjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const __dirname = import.meta.dirname;
const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
  recommendedConfig: eslint.configs.recommended, // optional unless using "eslint:recommended"
  allConfig: eslint.configs.all, // optional unless using "eslint:all"
});

export default tseslint.config(
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jasmine,
        ...globals.jest,
        ...globals.jquery,
        ...globals.node,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    ignores: ['.angular', 'node_modules', '.vscode'],
  },
  eslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    settings: {
      // Manually add "src/" directory to import plugin's "internal" group
      'import/internal-regex': '^src/',
    },
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angular.configs.tsRecommended,
      ...compat.config(importeslint.configs.recommended),
      ...compat.config(importeslint.configs.typescript),
      // ...compat.config(rxjsLints.configs.recommended),
      eslintPluginPrettierRecommended,
    ],
    processor: angular.processInlineTemplates,
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
      '@typescript-eslint/unbound-method': 'off',

      // Preferences
      '@angular-eslint/prefer-on-push-component-change-detection': ['error'],
      '@typescript-eslint/restrict-template-expressions': 'off',
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
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          groups: [
            // Global
            ['builtin', 'external'],

            // Project
            ['internal', 'parent', 'sibling', 'index'],

            // Misc.
            'type',
            'object',
            'unknown',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // RxJS fixes.
      'import/namespace': 'off',
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
  {
    files: ['**/*.component.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/attributes-order': 'warn',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
    },
  },
);
