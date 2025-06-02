/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  testMatch: ["**/_tests_/**/*.ts", "**/?(*.)+(spec|test).ts"],
};