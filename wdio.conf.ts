import type { Options } from "@wdio/types";

export const config: Options.Testrunner = {
  runner: "local",
  specs: ["./test/specs/**/*.spec.ts"],
  suites: {
    smoke: ["./test/specs/login.spec.ts", "./test/specs/registration-validation.spec.ts"],
    registration: ["./test/specs/registration.spec.ts"],
    authenticated: [
      "./test/specs/main-features.spec.ts",
      "./test/specs/organization-access.spec.ts",
      "./test/specs/sends.spec.ts",
    ],
  },
  maxInstances: 1,
  capabilities: [{ browserName: "chrome" }],
  baseUrl: process.env.TEST_BASE_URL ?? "http://localhost:8080",
  logLevel: "warn",
  waitforTimeout: 10_000,
  connectionRetryTimeout: 120_000,
  connectionRetryCount: 2,
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60_000,
  },
  afterTest: async (_test, _context, { error }) => {
    if (error) {
      await browser.saveScreenshot(`./reports/screenshots/failed-${Date.now()}.png`);
    }
  },
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: "./tsconfig.json",
      transpileOnly: true,
    },
  },
};
