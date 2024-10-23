import Page from "./page.ts";
const FIXED_PASSWORD = "MySecurePassword123!";
const FIXED_SHORT_PASSWORD = "Ab1!Cd";

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
    let parentElement = await this.masterPasswordInput.parentElement(); //corrected
    let bitErrorElement = await parentElement.$("div[id*=bit-error]");
    return bitErrorElement;
  }

  async emailBitError() {
    let parentElement = await this.emailInput.parentElement();
    let bitErrorElement = await parentElement.$("#bit-error-0");
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
    return $("bit-error-summary[aria-live='assertive']");
  }

  get dialogContainer() {
    return $("#cdk-dialog-5v");
  }

  //selector has been shortened
  get dialogHeader() {
    return $(`div.tw-flex.tw-items-center`);
  }

  //First solution for selector that is too long
  baseButtonSelector = 'button[buttontype="secondary"]';
  buttonStyles =
    "tw-bg-transparent tw-border tw-border-solid tw-border-text-muted tw-font-semibold tw-inline-block tw-px-3 tw-py-1.5 tw-rounded tw-text-center tw-transition ng-star-inserted";

  get noButton() {
    return $(`${this.baseButtonSelector}.${this.buttonStyles}`);
  }
  //Second solution for selector that is too long
  get noButton2() {
    return $(`button[buttontype="secondary"]`);
  }

  fixedPassword(): string {
    return FIXED_PASSWORD;
  }

  fixedShortPassword(): string {
    return FIXED_SHORT_PASSWORD;
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
