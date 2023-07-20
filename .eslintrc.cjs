module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@typescript-eslint"],
  rules: {
    "no-unused-vars": "error",
    // "no-console": "warn",
    // "no-undefined": "error",
    // "no-unused-expressions": "error",
    "no-unreachable": "error",
    "prefer-const": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
