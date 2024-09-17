/*import Login from "../pageobjects/login.ts";

describe("Page elements test", () => {
  it("should display the logo", async () => {
    let LoginPage = new Login();
    await LoginPage.open();
    await LoginPage.waitForPageLoad();
    await expect(LoginPage.logo).toBeDisplayed();
  });

  it("should display the create account button", async () => {
    let LoginPage = new Login();
    await LoginPage.waitForPageLoad();
    await expect(LoginPage.createAccountButton).toBeDisplayed();
  });

  it("clicks the Create account button", async () => {
    let LoginPage = new Login();
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

// webdriver@test.com
// webdriver_test
*/
