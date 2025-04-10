import path from 'path';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default tseslint.config(
  {
    ignores: ['./build/', './*.config.mjs'],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 1,
      '@typescript-eslint/consistent-type-assertions': [2, { assertionStyle: 'angle-bracket' }],
      '@typescript-eslint/explicit-function-return-type': 2,
      '@typescript-eslint/consistent-type-exports': [
        2,
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      '@typescript-eslint/default-param-last': 2,
      '@typescript-eslint/method-signature-style': [2, 'method'],
      '@typescript-eslint/prefer-reduce-type-parameter': 2,
    },

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  }
);
