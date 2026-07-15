import Page from "./page.js";

class RegistrationPage extends Page {
  get emailInput(): ChainablePromiseElement {
    return $("#register-form_input_email");
  }

  get nameInput(): ChainablePromiseElement {
    return $("#register-form_input_name");
  }

  get masterPasswordInput(): ChainablePromiseElement {
    return $("#register-form_input_master-password");
  }

  get confirmMasterPasswordInput(): ChainablePromiseElement {
    return $("#register-form_input_confirm-master-password");
  }

  get hintInput(): ChainablePromiseElement {
    return $("#register-form_input_hint");
  }

  get createAccountButton(): ChainablePromiseElement {
    return $('button[type="submit"][buttontype="primary"]');
  }

  get toastContainer(): ChainablePromiseElement {
    return $("#toast-container");
  }

  async open(): Promise<void> {
    await super.open("/#/register");
    await this.emailInput.waitForDisplayed();
  }

  async register(user: { email: string; name: string; password: string; hint: string }): Promise<void> {
    await this.emailInput.setValue(user.email);
    await this.nameInput.setValue(user.name);
    await this.masterPasswordInput.setValue(user.password);
    await this.confirmMasterPasswordInput.setValue(user.password);
    await this.hintInput.setValue(user.hint);
    await this.createAccountButton.click();
  }
}

export default new RegistrationPage();
