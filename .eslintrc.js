module.exports = {
  parser:"babel-eslint",
  extends: "airbnb",
  env: {
    "jest": true,
    "browser": true,
  },
  rules: {
    "import/extensions": ["off", "never"],
    "import/no-named-as-default": "off",
    "import/no-unresolved": "off",
    "no-undef": "off",
    "prefer-template": "off",
    "no-console": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-one-expression-per-line": "off"
  }
};
