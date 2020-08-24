// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: true,
  moduleNameMapper: {
    '^@qilinjs/utils$': '<rootDir>/packages/qilin-utils/src/index.ts'
  }
}
