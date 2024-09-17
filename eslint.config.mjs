import cspellRecommended from '@cspell/eslint-plugin/recommended';
import js from '@eslint/js';
import angular from 'angular-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
// import rxjs from 'eslint-plugin-rxjs';
import globals from 'globals';
import ts from 'typescript-eslint';

const __dirname = import.meta.dirname;

export default ts.config(
  {
    ignores: ['.angular', '.vscode', 'coverage', 'dist', 'node_modules']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jasmine,
        ...globals.jquery,
        ...globals.node
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname
      }
    }
  },
  js.configs.recommended,
  cspellRecommended,
  prettierRecommended,
  {
    files: ['**/*.ts'],
    extends: [
      ...ts.configs.strictTypeChecked,
      ...ts.configs.stylisticTypeChecked,
      ...angular.configs.tsRecommended
      // ...compat.config(rxjs.configs.recommended),
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Angular fixes
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true }
      ],
      '@typescript-eslint/no-extraneous-class': [
        'error',
        { allowWithDecorator: true }
      ],
      '@typescript-eslint/unbound-method': 'off',

      // Preferences
      '@angular-eslint/prefer-on-push-component-change-detection': ['error'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
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
          trailingUnderscore: 'forbid'
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase']
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE']
        },
        {
          selector: 'typeLike',
          format: ['PascalCase']
        },
        {
          selector: 'enumMember',
          format: ['PascalCase']
        },
        {
          selector: 'objectLiteralProperty',
          format: ['camelCase', 'PascalCase']
        },
        {
          selector: [
            'classProperty',
            'objectLiteralProperty',
            'typeProperty',
            'classMethod',
            'objectLiteralMethod',
            'typeMethod',
            'accessor',
            'enumMember'
          ],
          format: null,
          modifiers: ['requiresQuotes']
        }
      ],
      'no-alert': ['error'],
      'no-console': ['warn', { allow: ['error'] }]

      // RxJS fixes.
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
    }
  },
  {
    files: ['**/*.component.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility
    ],
    rules: {
      '@angular-eslint/template/attributes-order': 'warn',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn'
    }
  }
);
