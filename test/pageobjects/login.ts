import Page from "./page.ts";

class Login extends Page {
  get logo() {
    return $("img.logo.logo-themed");
  }
  get createAccountButton() {
    return $('a[routerlink="/register"]');
  }
  async open() {
    await browser.url("https://vaulttest.badhouseplants.net/#/login");
  }
  async waitForPageLoad() {
    await this.logo.waitForDisplayed({ timeout: 10000 });
    await this.createAccountButton.waitForDisplayed({ timeout: 10000 });
  }
  get emailInput() {
    return $("#register-form_input_email");
  }
  get nameInput() {
    return $("#register-form_input_name");
  }
  async fillEmail(email: string) {
    await this.emailInput.waitForExist({ timeout: 5000 }); // Ждем пока элемент станет доступным
    await this.emailInput.setValue(email);
  }
  async fillName(name: string) {
    // Проверь в прошлом проекте - это было не в pageobjects а в spec
    await this.nameInput.waitForExist({ timeout: 5000 }); // Ждем пока элемент станет доступным
    await this.nameInput.setValue(name);
  }
  get rememberEmailCheckbox() {
    return $('input[type="checkbox"][formcontrolname="rememberEmail"]');
  }
  get loginInputEmail() {
    return $("#login_input_email");
  }
  get continueButton() {
    return $('button[type="button"][buttontype="primary"]');
  }
  get masterPasswordLabel() {
    return $("bit-label=Master password");
}
  get masterPasswordInput() {
    return $("#login_input_master-password");
}
  get loginWithMasterPasswordButton() {
    return $('button[buttontype="primary"]');
  }
}

export default Login;
