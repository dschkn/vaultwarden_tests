import Page from "./page.ts";

class Login extends Page {
  get logo() {
    return $("svg[version='1.1']");
  }
  get createAccountButton() {
    return $("a[href='#/register']");

  }
  async open() {
    await browser.url("https://vaulttest.ru.badhouseplants.net//#/login");
  }
  async login() {
    // Просто пропускаем выполнение
    await $("input[id='bit-input-1']").waitForDisplayed();
    await $("input[id='bit-input-1']").setValue("test_user@test.com");
    await $("button[bitbutton][buttontype='primary']").isClickable();
    await $("button[bitbutton][buttontype='primary']").click()
    await $("input[id='bit-input-0']").waitForDisplayed();
    await $("input[id='bit-input-0']").setValue("test_user_password")
    await $("button[bitbutton][buttontype='primary'][bitformbutton][type='submit']").isClickable()
    await $("button[bitbutton][buttontype='primary'][bitformbutton][type='submit']").click()
}

get loginImg(){
  return $("svg[version='1.1']")
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
    return $("input[formcontrolname='rememberEmail']");
  }
  get loginInputEmail() {
    return $("input[id='bit-input-8']");
    
  }
  get continueButton() {
    return $('button[buttontype="primary"]');;
  }
  get masterPasswordLabel() {
    return $("bit-label=Master password");
}
  get masterPasswordInput() {
    return $("input[formcontrolname='masterPassword']");
}
  get loginWithMasterPasswordButton() {
    return $("button[type='submit']");
  }
}

export default Login;
