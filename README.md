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
- Vault login item lifecycle: create, read back, and delete.
- Vault lifecycle: create, search, read, and delete a secure note in one self-cleaning scenario.
- Vault item fields: one-time-password secret and custom field persistence.
- Organizations: create an organization.
- Sends: create and inspect a text send.

| Area | Scenarios |
| --- | --- |
| Authentication | Login form, registration navigation, remember-email preference, email validation, master-password step, invalid-password rejection |
| Registration | Valid registration, invalid email, password mismatch |
| Personal vault | Login item lifecycle; secure-note create, search, read and delete; advanced login fields |
| Collaboration | Organization creation |
| Sharing | Text Send create and inspect |

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
The personal-vault lifecycle tests remove the data they created even when an assertion fails.

## Disposable local target

The repository includes a self-contained Vaultwarden target so the suite does not depend on a random public instance. Docker Desktop must be running:

```bash
docker compose -f docker-compose.vaultwarden.yml up -d
```

Wait until `http://localhost:8080` opens, then run the no-credential checks:

```bash
npm run test:local
```

For the authenticated suite, first create a disposable account through the registration scenario, then provide those credentials as `TEST_EMAIL` and `TEST_PASSWORD`. Remove the entire local target and its data when finished:

```bash
docker compose -f docker-compose.vaultwarden.yml down -v
```

The compose target is intentionally disposable. It must not be used to store real credentials.

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
docker-compose.vaultwarden.yml  disposable local target
wdio.conf.ts       test-runner configuration
```

## Run through Selenoid

Selenoid runs browser sessions inside Docker containers and exposes its dashboard on `http://localhost:8081`.

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
