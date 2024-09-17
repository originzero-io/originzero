module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "airbnb-base",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "prettier", "only-warn"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    // "prettier/prettier": [
    //   "error",
    //   {
    //     printWidth: 100,
    //     endOfLine: "auto",
    //     tabWidth: 2,
    //     useTabs: false,
    //     trailingComma: "all",
    //     semi: true,
    //     singleQuote: false,
    //   },
    // ],
    quotes: "off",
    "max-len": [
      "error",
      {
        code: 200, // Maksimum satır karakter sayısı
        comments: 200, // Yorumlar için ayrı maksimum karakter sayısı
        ignoreUrls: true, // URL'leri kuralın dışında tut
        ignoreStrings: true, // Stringleri kuralın dışında tut
        ignoreTemplateLiterals: true, // Template literal ifadelerini kuralın dışında tut
      },
    ],
    "import/no-unresolved": "off",
    "react/function-component-definition": "off",
    "no-confusing-arrow": "off",
    "import/extensions": "off",
  },
};
