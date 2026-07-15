# Vaultwarden UI Automation

End-to-end UI checks for a Vaultwarden-compatible password-manager deployment.

## Stack

- TypeScript
- WebdriverIO
- Mocha
- Chrome

## Coverage

- Login page: key UI elements, navigation to registration, and transition to the master-password step.
- Registration page: creating an account with generated test data and confirmation feedback.

## Run locally

Install dependencies:

```bash
npm ci
```

Check TypeScript without starting a browser:

```bash
npm run test:check
```

Run the end-to-end suite against an available deployment:

```bash
TEST_BASE_URL=https://your-vaultwarden-instance.example npm run test:e2e
```

`TEST_BASE_URL` must point to a test-only instance. The suite creates a new account on every registration run.

## Structure

```text
test/
  pageobjects/     page actions and selectors
  specs/           independent user-facing scenarios
wdio.conf.ts       test-runner configuration
```

## Notes

The public practice environment originally used by this project is no longer available. The test target is therefore supplied through `TEST_BASE_URL`, rather than hard-coded in the test code.
