import RegistrationPage from "../pageobjects/registration.page.js";

describe("Registration validation", () => {
  beforeEach(async () => {
    await RegistrationPage.open();
  });

  it("does not submit an invalid email address", async () => {
    await RegistrationPage.emailInput.setValue("not-an-email");
    await RegistrationPage.nameInput.setValue("QA User");
    await RegistrationPage.masterPasswordInput.setValue("SafePassword!42");
    await RegistrationPage.confirmMasterPasswordInput.setValue("SafePassword!42");
    await RegistrationPage.createAccountButton.click();

    await expect(RegistrationPage.emailInput).toHaveAttribute("aria-invalid", "true");
  });

  it("does not submit mismatched passwords", async () => {
    await RegistrationPage.emailInput.setValue("qa.user@example.test");
    await RegistrationPage.nameInput.setValue("QA User");
    await RegistrationPage.masterPasswordInput.setValue("SafePassword!42");
    await RegistrationPage.confirmMasterPasswordInput.setValue("DifferentPassword!42");
    await RegistrationPage.createAccountButton.click();

    await expect(RegistrationPage.confirmMasterPasswordInput).toHaveAttribute("aria-invalid", "true");
  });
});
