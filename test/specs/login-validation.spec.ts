import LoginPage from "../pageobjects/login.page.js";

describe("Login email validation", () => {
  it("marks a malformed email address as invalid before authentication", async () => {
    await LoginPage.open();
    await LoginPage.emailInput.setValue("not-an-email");

    const isValid = await browser.execute(
      (input: unknown) => (input as HTMLInputElement).validity.valid,
      await LoginPage.emailInput,
    );

    await expect(isValid).toBe(false);
  });
});
