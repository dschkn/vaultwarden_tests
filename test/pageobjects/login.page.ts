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

  get vaultNavigation(): ChainablePromiseElement {
    return $('a[aria-label="Password Manager"], div[title="Vaults"]');
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

  async login(email: string, password: string): Promise<void> {
    await this.open();
    await this.continueWithEmail(email);
    await this.masterPasswordInput.setValue(password);
    await this.submitButton.click();
    await this.vaultNavigation.waitForDisplayed();
  }
}

export default new LoginPage();
