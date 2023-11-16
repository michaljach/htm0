import type { Config } from "jest";

const config: Config = {
  setupFiles: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "./src/jsx-transformer.ts",
  },
};

export default config;
