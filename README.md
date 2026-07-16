# Vaultwarden UI Automation

End-to-end UI checks for a Vaultwarden-compatible password-manager deployment.

## Stack

- TypeScript
- WebdriverIO
- Mocha
- Chrome

## Coverage

- Login page: key UI elements, navigation to registration, and transition to the master-password step.
- Authentication validation: malformed email handling and an invalid master-password rejection.
- Registration page: creating an account with generated test data and confirmation feedback.
- Registration validation: invalid email addresses and mismatched passwords.
- Vault: create and read back a login item.
- Vault lifecycle: create, search, read, and delete a secure note in one self-cleaning scenario.
- Organizations: create an organization.
- Sends: create and inspect a text send.

The suite is intentionally split by risk and prerequisites:

- **Smoke** — login UI and registration validation; does not need credentials or create data.
- **Registration** — creates a disposable account.
- **Authenticated** — creates and validates vault data, organizations, and sends using a disposable account.

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

`TEST_BASE_URL` must point to a test-only instance. The registration scenario creates a new account on every run.

Authenticated scenarios also require a disposable account:

```bash
TEST_BASE_URL=https://your-vaultwarden-instance.example \
TEST_EMAIL=qa@example.test \
TEST_PASSWORD='your-test-password' \
npm run test:e2e
```

Never use a personal vault or production credentials for this suite.
The authenticated item-lifecycle test removes the data it created even when an assertion fails.

For a quick, no-credential smoke check:

```bash
TEST_BASE_URL=https://your-vaultwarden-instance.example npm run test:smoke
```

Run only the scenarios that create a registration account:

```bash
TEST_BASE_URL=https://your-vaultwarden-instance.example npm run test:registration
```

Run only the authenticated scenarios:

```bash
TEST_BASE_URL=https://your-vaultwarden-instance.example \
TEST_EMAIL=qa@example.test \
TEST_PASSWORD='your-test-password' \
npm run test:authenticated
```

Copy `.env.example` to a local `.env` file as a reference for the required values. The file is ignored by Git. Screenshots from failed browser tests are stored locally in `reports/screenshots/`.

## Structure

```text
test/
  pageobjects/     page actions and selectors
  specs/           independent user-facing scenarios, grouped into suites
  support/         environment validation, generated data, reusable UI waits
wdio.conf.ts       test-runner configuration
```

## Run through Selenoid

Selenoid runs browser sessions inside Docker containers and exposes its dashboard on `http://localhost:8080`.

```bash
docker pull selenoid/vnc:chrome_128.0
docker compose -f docker-compose.selenoid.yml up -d
```

Confirm that Selenoid is available:

```bash
curl http://localhost:4444/status
```

Then run the suite through the remote browser:

```bash
TEST_BASE_URL=https://your-vaultwarden-instance.example \
TEST_EMAIL=qa@example.test \
TEST_PASSWORD='your-test-password' \
npm run test:selenoid
```

Use `SELENOID_HOST`, `SELENOID_PORT`, `SELENOID_BROWSER`, and `SELENOID_BROWSER_VERSION` to point the runner at a remote Selenoid host or a different configured browser image.

## Notes

The public practice environment originally used by this project is no longer available. The test target is therefore supplied through `TEST_BASE_URL`, rather than hard-coded in the test code.
