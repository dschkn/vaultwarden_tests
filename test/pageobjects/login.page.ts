import Page from "./page.js";

class LoginPage extends Page {
  get logo(): ChainablePromiseElement {
    return $("img.logo.logo-themed");
  }

  get createAccountLink(): ChainablePromiseElement {
    return $('a[routerlink="/register"]');
  }

  get emailInput(): ChainablePromiseElement {
    return $("#login_input_email");
  }

  get rememberEmailCheckbox(): ChainablePromiseElement {
    return $('input[formcontrolname="rememberEmail"]');
  }

  get continueButton(): ChainablePromiseElement {
    return $('button[type="button"][buttontype="primary"]');
  }

  get masterPasswordInput(): ChainablePromiseElement {
    return $("#login_input_master-password");
  }

  get submitButton(): ChainablePromiseElement {
    return $('button[type="submit"][buttontype="primary"]');
  }

  async open(): Promise<void> {
    await super.open("/#/login");
    await this.logo.waitForDisplayed();
  }

  async continueWithEmail(email: string): Promise<void> {
    await this.emailInput.setValue(email);
    await this.continueButton.click();
    await this.masterPasswordInput.waitForDisplayed();
  }
}

export default new LoginPage();
