module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  rules: {
    "react/display-name": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "off",
      {
        argsIgnorePattern: "^_|^unused$",
        varsIgnorePattern: "^_|^unused$",
      },
    ],
  },
};
