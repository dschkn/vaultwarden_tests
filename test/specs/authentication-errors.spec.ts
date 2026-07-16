import LoginPage from "../pageobjects/login.page.js";
import { getTestUser } from "../support/test-user.js";
import { expectToastToContain } from "../support/ui.js";

describe("Authentication validation", () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it("rejects a valid account with an incorrect master password", async () => {
    const user = getTestUser();
    await LoginPage.continueWithEmail(user.email);
    await LoginPage.submitPassword("intentionally-wrong-password");

    await expectToastToContain(LoginPage.toastContainer, "Username or password is incorrect");
    await expect(LoginPage.masterPasswordInput).toBeDisplayed();
  });
});
