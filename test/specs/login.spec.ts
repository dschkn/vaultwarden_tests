import LoginPage from "../pageobjects/login.page.js";

describe("Login page", () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it("displays the identity and entry points", async () => {
    await expect(LoginPage.logo).toBeDisplayed();
    await expect(LoginPage.createAccountLink).toBeDisplayed();
    await expect(LoginPage.emailInput).toBeDisplayed();
    await expect(LoginPage.continueButton).toBeDisplayed();
    await expect(LoginPage.emailInput).toHaveAttribute("type", "email");
  });

  it("opens the registration page", async () => {
    await LoginPage.createAccountLink.click();
    await expect(browser).toHaveUrl(expect.stringContaining("#/register"));
  });

  it("continues to the master-password step after entering an email", async () => {
    await LoginPage.continueWithEmail("qa.user@example.test");
    await expect(LoginPage.masterPasswordInput).toBeDisplayed();
  });

  it("allows the user to choose whether the email is remembered", async () => {
    await LoginPage.setRememberEmail(true);
    await expect(LoginPage.rememberEmailCheckbox).toBeSelected();

    await LoginPage.setRememberEmail(false);
    await expect(LoginPage.rememberEmailCheckbox).not.toBeSelected();
  });
});
