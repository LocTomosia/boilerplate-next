import pluginJs from '@eslint/js'
import prettier from 'eslint-config-prettier'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        parser: tseslint.parser
      }
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['warn',
        {
          argsIgnorePattern: '^_',
          additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)'
        }
      ]
    }
  },
  {
    ignores: ['node_modules/**/*', '.next/**/*', 'dist/**/*', 'out/**/*']
  },
  prettier
]
