import RegistrationPage from "../pageobjects/registration.page.js";

describe("Registration page", () => {
  it("accepts valid registration data", async () => {
    const user = {
      email: `qa-${Date.now()}@example.test`,
      name: "QA Test User",
      password: "SafePassword!42",
      hint: "Automated test account",
    };

    await RegistrationPage.open();
    await RegistrationPage.register(user);

    await expect(RegistrationPage.toastContainer).toHaveText(
      expect.stringContaining("Your new account has been created"),
    );
    await expect(browser).toHaveUrl(expect.stringContaining("#/login"));
  });
});
