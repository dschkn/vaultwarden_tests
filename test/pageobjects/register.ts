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

  async masterPasswordBitError() {
    let masterPasswordInput = await $("#register-form_input_master-password");
    let parentElement = await masterPasswordInput.parentElement();
    let bitErrorElement = await parentElement.$("div[id*=bit-error]");
    return bitErrorElement;
  }

  async confirmMasterPasswordBitError() {
    let confirmMasterPasswordInput = await $(
      "#register-form_input_confirm-master-password"
    );
    let parentElement = await confirmMasterPasswordInput.parentElement();
    let bitErrorElement = await parentElement.$("div[id*=bit-error]");
    return bitErrorElement;
  }
  get errorSummary() {
    return $(
      "bit-error-summary.tw-block.tw-text-danger.tw-mt-2.ng-touched.ng-dirty.ng-invalid"
    );
  }

  get dialogContainer() {
    return $("#cdk-dialog-container");
  }

  get dialogHeader() {
    return $(
      "div.tw-flex.tw-flex-col.tw-items-center.tw-gap-2.tw-px-4.tw-pt-4.tw-text-center.ng-tns-c3905586946-0"
    );
  }

  get noButton() {
    return $(
      'button[buttontype="secondary"].tw-bg-transparent.tw-border.tw-border-solid.tw-border-text-muted.tw-font-semibold.tw-inline-block.tw-px-3.tw-py-1.5.tw-rounded.tw-text-center.tw-transition.ng-star-inserted'
    );
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

  generateRandomShortPassword(): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
    let password = "";
    for (let i = 0; i < 6; i++) {
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
