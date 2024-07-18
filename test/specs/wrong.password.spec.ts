import Registration from "../pageobjects/register.ts";
import { expect } from "chai";

describe("Page elements test", () => {
  let RegistrationPage = new Registration();
  const currentTime = new Date().getTime();
  const generatedEmail = `user${currentTime}@test.com`;
  const generatedPassword = RegistrationPage.generateRandomPassword();
  const shortPassword = RegistrationPage.generateRandomShortPassword();

  it("clicks the Create account button", async () => {
    let RegistrationPage = new Registration();
    await RegistrationPage.open();
    await RegistrationPage.createAccount.click();
    await RegistrationPage.fillInForm.waitForDisplayed();
  });

  it("should enter a randomly generated email based on current time into the email input field", async () => {
    let RegistrationPage = new Registration();
    await RegistrationPage.emailInput.setValue(generatedEmail);
  });

  it("should fill the registration form with a random name", async () => {
    let registrationPage = new Registration();
    const randomName = `User${Math.floor(Math.random() * 10000)}`;
    await registrationPage.nameInput.setValue(randomName);
    expect(await registrationPage.nameInput.getValue()).to.equal(randomName);
  });

  it("checks if password length is correct", async () => {
    let RegistrationPage = new Registration();
    await RegistrationPage.masterPasswordInput.setValue(shortPassword);
    await RegistrationPage.confirmMasterPasswordInput.setValue(
      "any another password"
    );
    await RegistrationPage.masterPasswordBitError(); //ловит сообщение что пасворд недостаточно длинный
    await RegistrationPage.masterPasswordInput.clearValue();
    await RegistrationPage.masterPasswordInput.setValue(generatedPassword);
  });

  it("checks the sameness of the entered passwords", async () => {
    let RegistrationPage = new Registration();
    await RegistrationPage.confirmMasterPasswordBitError(); // ловит что пасворды не одинаковые
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

  it("checks the popup window is displayed", async () => {
    const RegistrationPage = new Registration();
    await RegistrationPage.masterPasswordInput.setValue("111111111111");
    await RegistrationPage.confirmMasterPasswordInput.setValue("111111111111");
    await RegistrationPage.createAccountButton.click();
    await RegistrationPage.dialogContainer.waitForDisplayed({ timeout: 15000 }); // Увеличение таймаута до 15 секунд
    await RegistrationPage.noButton.click();
  });

  it("checks the inability to create account with short password.", async () => {
    const RegistrationPage = new Registration();
    await RegistrationPage.masterPasswordInput.setValue(shortPassword);
    await RegistrationPage.confirmMasterPasswordInput.setValue(shortPassword);
    const initialUrl = await browser.getUrl();
    await RegistrationPage.createAccountButton.click();
    await browser.pause(2000);
    const newUrl = await browser.getUrl();
    expect(newUrl).equal(initialUrl);
  });
});
