export type TestUser = {
  email: string;
  password: string;
};

export function getTestUser(): TestUser {
  const { TEST_EMAIL: email, TEST_PASSWORD: password } = process.env;

  if (!email || !password) {
    throw new Error(
      "Authenticated scenarios require TEST_EMAIL and TEST_PASSWORD for a disposable test account.",
    );
  }

  return { email, password };
}

export function uniqueName(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10_000)}`;
}
