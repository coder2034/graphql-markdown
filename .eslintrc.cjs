const error = 2;

const defaultExtends = [
  "eslint:recommended",
  "plugin:@typescript-eslint/recommended",
  "plugin:prettier/recommended",
  "prettier",
];

module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    "jest/globals": true,
    node: true,
  },
  extends: defaultExtends,
  overrides: [
    {
      extends: [
        ...defaultExtends,
        "plugin:jest/recommended",
        "plugin:jest/style",
      ],
      files: ["tests/**/*.ts"],
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ['./packages/*/tsconfig.eslint.json']
  },
  plugins: ["@typescript-eslint", "jest"],
  root: true,
  rules: {
    "@typescript-eslint/no-unnecessary-type-assertion": error,
    "@typescript-eslint/no-unnecessary-type-arguments": error,
    "@typescript-eslint/non-nullable-type-assertion-style": error,
    "@typescript-eslint/prefer-enum-initializers": error,
    "@typescript-eslint/prefer-for-of": error,
    "@typescript-eslint/prefer-includes": error,
    "@typescript-eslint/prefer-literal-enum-member": error,
    "@typescript-eslint/prefer-optional-chain": error,
    "@typescript-eslint/prefer-readonly": error,
    "@typescript-eslint/prefer-readonly-parameter-types": error,
    "@typescript-eslint/promise-function-async": error,
    "@typescript-eslint/sort-type-union-intersection-members": error,
    "@typescript-eslint/strict-boolean-expressions": error,
    "@typescript-eslint/typedef": error,
    "array-bracket-spacing": error,
    "array-element-newline": [error, "consistent"],
    "arrow-body-style": [error, "always"],
    "block-spacing": error,
    "brace-style": [
      error,
      "1tbs",
      {
        allowSingleLine: false,
      },
    ],
    camelcase: error,
    "computed-property-spacing": error,
    curly: error,
    "default-case-last": error,
    "default-param-last": error,
    "eol-last": error,
    eqeqeq: error,
    "func-call-spacing": error,
    "func-name-matching": error,
    "func-names": error,
    "func-style": [error, "declaration", { allowArrowFunctions: true }],
    "function-call-argument-newline": [error, "consistent"],
    "init-declarations": error,
    "linebreak-style": error,
    "new-parens": error,
    "no-await-in-loop": error,
    "no-console": error,
    "no-duplicate-imports": error,
    "no-else-return": error,
    "no-eq-null": error,
    "no-extra-parens": error,
    "no-labels": error,
    "no-lonely-if": error,
    "no-loop-func": error,
    "no-magic-numbers": error,
    "no-multi-assign": error,
    "no-multi-spaces": error,
    "no-multiple-empty-lines": error,
    "no-new": error,
    "no-new-func": error,
    "no-new-wrappers": error,
    "no-param-reassign": error,
    "no-return-assign": error,
    "no-return-await": error,
    "no-self-compare": error,
    "no-sequences": error,
    "no-trailing-spaces": error,
    "no-undef-init": error,
    "no-undefined": error,
    "no-underscore-dangle": error,
    "no-unneeded-ternary": error,
    "no-unreachable-loop": error,
    "no-unused-expressions": error,
    "no-use-before-define": error,
    "no-useless-computed-key": error,
    "no-useless-concat": error,
    "no-useless-rename": error,
    "no-var": error,
    "no-whitespace-before-property": error,
    "nonblock-statement-body-position": error,
    "object-curly-newline": [error, { consistent: true }],
    "one-var": [error, "never"],
    "one-var-declaration-per-line": error,
    "prefer-arrow-callback": error,
    "prefer-const": error,
    "prefer-destructuring": error,
    "prefer-named-capture-group": error,
    "prefer-object-spread": error,
    "prefer-spread": error,
    "require-atomic-updates": error,
    "require-await": error,
    "rest-spread-spacing": error,
    "sort-imports": [error, { allowSeparatedGroups: true }],
    "sort-keys": error,
    "sort-vars": error,
    "space-infix-ops": [error, { int32Hint: false }],
    "template-curly-spacing": [error, "never"],
    "wrap-iife": error,
    yoda: error,
  },
};
