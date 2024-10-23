import Registration from "../pageobjects/register.ts";
import { expect } from "chai";

describe("Page elements test", () => {
  let RegistrationPage = new Registration();
  const currentTime = new Date().getTime();
  const generatedEmail = `user${currentTime}@test.com`;
  const wrongEmail = `user${currentTime}test.com`;
  const generatedPassword = RegistrationPage.fixedPassword();
  const shortPassword = RegistrationPage.fixedShortPassword();

  it("clicks the Create account button", async () => {
    let RegistrationPage = new Registration();
    await RegistrationPage.open();
    await RegistrationPage.createAccount.click();
    await RegistrationPage.fillInForm.waitForDisplayed();
  });

  it("checks whether the information entered in the email field is actually an email", async () => {
    let RegistrationPage = new Registration();
    await RegistrationPage.emailInput.setValue(wrongEmail);
    await RegistrationPage.emailBitError();
  });

  it("should enter a randomly generated email based on current time into the email input field", async () => {
    let RegistrationPage = new Registration();
    await RegistrationPage.emailInput.setValue(generatedEmail);
  });

  it("checks if password length is correct", async () => {
    let RegistrationPage = new Registration();
    await RegistrationPage.masterPasswordInput.setValue(shortPassword);
    await RegistrationPage.confirmMasterPasswordInput.setValue(
      "any_another_password123456789"
    );
    await RegistrationPage.masterPasswordBitError(); //ловит сообщение что пасворд недостаточно длинный
    await RegistrationPage.masterPasswordInput.clearValue();
    await RegistrationPage.masterPasswordInput.setValue(generatedPassword);
  });

  it("checks the sameness of the entered passwords", async () => {
    let RegistrationPage = new Registration();
    await RegistrationPage.confirmMasterPasswordBitError(); // ловит сообщение что пасворды не одинаковые
  });

  it("should fill the hint input with 'HINT'", async () => {
    const RegistrationPage = new Registration();
    await RegistrationPage.hintInput.setValue("HINT");
  });

  it("checks final error prompt", async () => {
    const RegistrationPage = new Registration();
    await RegistrationPage.createAccountButton.click();
    await RegistrationPage.errorSummary.waitForDisplayed(); // ловит всплывающее сообщение внизу что вообще есть ошибки
  });
  /*
  it("checks the popup window is displayed", async () => {
    const RegistrationPage = new Registration();
    await RegistrationPage.masterPasswordInput.setValue("111111111111");
    await RegistrationPage.confirmMasterPasswordInput.setValue("111111111111");
    await RegistrationPage.createAccountButton.click();
    await browser.pause(5000);
    await RegistrationPage.dialogContainer.waitForDisplayed();
    await RegistrationPage.noButton.click();
  });


  /*
  it("checks the inability to create account with short password.", async () => {
    const RegistrationPage = new Registration();
    await RegistrationPage.masterPasswordInput.setValue(shortPassword);
    await RegistrationPage.confirmMasterPasswordInput.setValue(shortPassword);
    const initialUrl = await browser.getUrl();
    await RegistrationPage.createAccountButton.click();
    await browser.pause(2000);
    await RegistrationPage.errorSummary.waitForDisplayed();
    const newUrl = await browser.getUrl();
    expect(newUrl).equal(initialUrl);
  });*/
});
