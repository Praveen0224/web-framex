import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      "@next/next": nextPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
