import Login from "../pageobjects/login.ts";

describe("Page elements test", () => {
  let LoginPage = new Login();

  it("should display the logo", async () => {
    await LoginPage.open();
    await LoginPage.waitForPageLoad();
  });

  it("should display the create account button", async () => {
    await expect(LoginPage.createAccountButton).toBeDisplayed();
  });

  it("clicks the Create account button", async () => {
    await LoginPage.open();
    await LoginPage.waitForPageLoad();
    await LoginPage.createAccountButton.click();
    await browser.waitUntil(
      async () => {
        return (await browser.getUrl()).includes("/register");
      },
      {
        timeout: 5000,
        timeoutMsg: "URL did not change to /register within 5 seconds",
      }
    );
  });
});





