module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "only-warn"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "airbnb-base",
    "airbnb-typescript/base",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2021,
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "no-unused-vars": "warn",
    "no-undef": "warn",
    "no-var": "warn",
    "array-callback-return": "warn",
    "class-methods-use-this": "off",
    eqeqeq: "warn",
    "no-case-declarations": "warn",
    "no-empty-pattern": "warn",
    "no-new-wrappers": "warn",
    "no-console": "off",
    "import/no-import-module-exports": "off",
    quotes: "off",
    "linebreak-style": "off",
    "object-curly-newline": "off",
    "max-len": ["warn", { code: 200 }],
    "no-underscore-dangle": "off",
    "no-param-reassign": ["error", { props: false }],
    camelcase: "off",
    "max-classes-per-file": "off",
    "@typescript-eslint/quotes": "off",
  },
};
