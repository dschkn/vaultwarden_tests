import Page from "./page.ts";

class Registration extends Page {
  get emailInput() {
    return $("#register-form_input_email");
  }
  get createAccount() {
    return $('a[routerlink="/register"]');
  }
  get fillInForm(): ChainablePromiseElement {
    return $(
      "div.tw-min-w-xl.tw-m-auto.tw-max-w-xl.tw-rounded.tw-border.tw-border-solid.tw-border-secondary-300.tw-bg-background.tw-p-8"
    );
  }
  get nameInput() {
    return $("#register-form_input_name");
  }
  get masterPasswordInput() {
    return $("#register-form_input_master-password");
  }
  generateRandomPassword(): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return password;
  }
  get confirmMasterPasswordInput() {
    return $("#register-form_input_confirm-master-password");
  }
  get hintInput() {
    return $("#register-form_input_hint");
  }
  get createAccountButton() {
    return $('button[type="submit"][buttontype="primary"]');
  }
  get toastContainer() {
    return $("#toast-container");
  }
}

export default Registration;
