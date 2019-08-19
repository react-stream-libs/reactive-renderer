module.exports = {
  preset: 'ts-jest',
  "bail": false,
  "verbose": true,
  "testPathIgnorePatterns": [
    "<rootDir>/lib",
    "<rootDir>/lib_es6",
    "/node_modules/",
    "fixtures.ts",
    "/fixtures/"
  ],
  "testRegex": "(/src/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$"
};