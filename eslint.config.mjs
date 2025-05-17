import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals", 
    "prettier",
    "plugin:tailwindcss/recommended",
    "next/typescript"),
    {
      plugins: {
        react,
        "unused-imports": unusedImports,
      },
  
      rules: {
        "newline-before-return": "warn",
        "tailwindcss/no-custom-classname": "off",
        "tailwindcss/classnames-order": "warn",
        "tailwindcss/migration-from-tailwind-2": "warn",
        "tailwindcss/enforces-shorthand": "warn",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "prefer-const": "off", 
        "react/no-unescaped-entities":"off",
        "react-hooks/exhaustive-deps":"off",
  
        "padded-blocks": [
          "error",
          {
            blocks: "never",
          },
        ],
  
        "no-multiple-empty-lines": [
          "error",
          {
            max: 1,
            maxEOF: 0,
          },
        ],
  
        "react/jsx-indent": "off",
        "react/jsx-no-useless-fragment": "error",
  
        "react/jsx-newline": "off",
  
        "unused-imports/no-unused-imports": "error",
  
        "no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
          },
        ],
  
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
            ],
            "newlines-between": "always",
          },
        ],
  
        "import/no-duplicates": "error",
  
        "import/newline-after-import": [
          "error",
          {
            count: 1,
          },
        ],
        "import/no-useless-path-segments": "error",
        "import/no-unresolved": "error",
        "import/first": "error",
        "import/no-named-as-default": "error",
  
        "import/no-cycle": [
          "error",
          {
            maxDepth: 1,
          },
        ],
      },
    },
  // {
  //   rules: {
  //     "@typescript-eslint/no-unused-vars": "off",
  //     "@typescript-eslint/no-explicit-any": "off",
  //     "prefer-const": "off", 
  //     "react/no-unescaped-entities":"off",
  //     "react-hooks/exhaustive-deps":"off",
  //   },
  // },
];

export default eslintConfig;