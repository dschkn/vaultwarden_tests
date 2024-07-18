/*import Login from "../pageobjects/login.ts";
import Registration from "../pageobjects/register.ts";
import { expect } from "chai";

describe("Page elements test", () => {
  let RegistrationPage = new Registration();
  const currentTime = new Date().getTime();
  const generatedEmail = `user${currentTime}@test.com`;
  const generatedPassword = RegistrationPage.fixedPassword();

  it("clicks the Create account button", async () => {
    let RegistrationPage = new Registration();
    await RegistrationPage.open();
    await RegistrationPage.createAccount.click();
    await browser.waitUntil(async () => {
      return (await RegistrationPage.fillInForm).waitForDisplayed();
    });
  });

  it("should enter a randomly generated email based on current time into the email input field", async () => {
    try {
      let RegistrationPage = new Registration();
      await RegistrationPage.emailInput.setValue(generatedEmail);
      const actualEmail = await RegistrationPage.emailInput.getValue();
      expect(actualEmail).to.equal(generatedEmail);
    } catch (error) {
      console.error("Error during test execution:", error);
      throw error;
    }
  });

  it("should fill the registration form with a random name", async () => {
    let registrationPage = new Registration();
    const randomName = `User${Math.floor(Math.random() * 10000)}`;
    await registrationPage.nameInput.setValue(randomName);
    expect(await registrationPage.nameInput.getValue()).to.equal(randomName);
  });

  it("should fill the password input with a random password", async () => {
    let RegistrationPage = new Registration();
    await RegistrationPage.masterPasswordInput.setValue(generatedPassword);
    expect(await RegistrationPage.masterPasswordInput.getValue()).to.equal(
      generatedPassword
    );
    await RegistrationPage.confirmMasterPasswordInput.setValue(
      generatedPassword
    );
    expect(
      await RegistrationPage.confirmMasterPasswordInput.getValue()
    ).to.equal(generatedPassword);
  });

  it("should fill the hint input with 'HINT'", async () => {
    const RegistrationPage = new Registration();
    await RegistrationPage.hintInput.setValue("HINT");
    expect(await RegistrationPage.hintInput.getValue()).to.equal("HINT");
  });

  it("should click the Create account button", async () => {
    const registrationPage = new Registration();
    await registrationPage.createAccountButton.click();
    await registrationPage.toastContainer.waitForDisplayed();
    const toasterText = await registrationPage.toastContainer.getText();
    expect(toasterText).to.include("Your new account has been created");
    await browser.pause(2000);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include(`/login?email`);
  });

  it("should log in with a new data", async () => {
    let LoginPage = new Login();
    await LoginPage.loginInputEmail.setValue(generatedEmail);
    await LoginPage.rememberEmailCheckbox.click();
    await LoginPage.continueButton.click();
    await LoginPage.masterPasswordInput.setValue(generatedPassword);
    await LoginPage.loginWithMasterPasswordButton.click();
  });

  it("should check that login to your account was successful", async () => {
    let LoginPage = new Login();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include(`vault`);
    await LoginPage.headerTitle.waitForDisplayed();
    await browser.pause(2000);
  });
});
