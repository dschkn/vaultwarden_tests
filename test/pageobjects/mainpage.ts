import Page from "./page.ts";
import { scrollUntilDisplayed } from "./utils";
import { ChainablePromiseElement } from "webdriverio";

class MainPage extends Page {
  get newOrganisationLink() {
    return $('a[href="#/create-organization"].filter-button');
  }
  get newOrganisationTitle() {
    return $('h1[bittypography="h1"][title="New organisation"]');
  }
  get nameInput() {
    return $("#bit-input-36");
  }
  get nameInputAlternative() {
    return $(
      'input[bitinput][formcontrolname="name"].tw-block.tw-border.tw-border-secondary-600'
    );
  }
  get submitButton() {
    return $('button[type="submit"][buttontype="primary"]');
  }

  //все предыдущее работает, не трогай
  get newItemDropdownButton() {
    return $("#newItemDropdown");
  }
  get itemButton() {
    return $('button[role="menuitem"]');
  }
  get newItemLoginNameInput() {
    return $("#name");
  }
  get loginUsernameInput() {
    return $("#loginUsername");
  }
  get loginPasswordInput() {
    return $("#loginPassword");
  }
  get loginTotpInput() {
    return $("#loginTotp");
  }
  get loginUriInput() {
    return $("#loginUri0");
  }
  get loginUriMatchSelect() {
    return $("#loginUriMatch0");
  }
  get notesTextarea() {
    return $("#notes");
  }
  get newCustomFieldLink() {
    return $("a.d-inline-block.mb-2");
  }
  get fieldNameInput() {
    return $("#fieldName0");
  }
  get fieldValueInput() {
    return $("#fieldValue0");
  }
  get saveButton() {
    return $("button.btn.btn-primary.btn-submit");
  }
  get toastContainer() {
    return $("#toast-container");
  }
  get typeSelect() {
    return $("#type");
  }

  //теперь геттеры для CARD
  get cardCardholderNameInput() {
    return $("#cardCardholderName");
  }
  get cardBrandSelect() {
    return $("#cardBrand");
  }
  get cardNumberInput() {
    return $("#cardNumber");
  }
  get cardExpMonthSelect() {
    return $("#cardExpMonth");
  }
  get cardExpYearInput() {
    return $("#cardExpYear");
  }
  get cardCodeInput() {
    return $("#cardCode");
  }
  someElementWithText(text: string): Promise<Element> {
    return $(`//*[contains(text(), "${text}")]`);
  }
  //теперь геттеры для Identity
  get identityNameInput() {
    return $("#name");
  }
  get idTitleSelect() {
    return $(`select[name="Identity.Title"]`);
  }
  get firstNameInput() {
    return $("#idFirstName");
  }
  get middleNameInput() {
    return $("#idMiddleName");
  }
  get lastNameInput() {
    return $("#idLastName");
  }
  get usernameInput() {
    return $("#idUsername");
  }
  get companyInput() {
    return $("#idCompany");
  }
  get ssnInput() {
    return $("#idSsn");
  }
  get passportNumberInput() {
    return $("#idPassportNumber");
  }
  get licenseNumberInput() {
    return $("#idLicenseNumber");
  }
  get emailInput() {
    return $("#idEmail");
  }
  get phoneInput() {
    return $("#idPhone");
  }
  get address1Input() {
    return $("#idAddress1");
  }
  get cityInput() {
    return $("#idCity");
  }
  get stateInput() {
    return $("#idState");
  }

  //Геттеры для Secure note
  get secureNoteNameInput() {
    return $("#name");
  }

  getItemByName(item: string) {
    return $(item);
  }

  get binFilterButton() {
    return $('button.filter-button[title="Filter: Bin"]');
  }
  rowElementByTitle(itemTitle: string) {
    const rowXPath = `//tr[td[3]//button[@title="${itemTitle}"]]`;
    return $(rowXPath);
  }
  get passwordManagerLink() {
    return $(
      'a[routerlink="."][title="Password Manager"][aria-label="Password Manager"]'
    );
  }
  // геттеры Folder
  get folderButton() {
    return $("button[role='menuitem']:has(i.bwi-folder)");
  }
  get header() {
    return $(
      "header.tw-flex.tw-justify-between.tw-items-center.tw-gap-4.tw-border-0.tw-border-b.tw-border-solid.tw-border-secondary-300.tw-p-4.ng-tns-c1767497433-4"
    );
  }
  get folderNameInput() {
    return $("[formcontrolname='name']");
  }
  get folderSaveButton() {
    return $("button[bitbutton][buttontype='primary'][type='submit']");
  }
  getFilterButton(folderName) {
    return $(
      `button.filter-button[title="Filter: ${folderName}"][aria-label="Filter: ${folderName}"]`
    );
  }
  async getEditButtonForFolder(folderName) {
    const editButton = await $(
      `//span[contains(@class, 'filter-buttons')]//button[@title="Filter: ${folderName}"]/following-sibling::span/button[@class="edit-button ng-star-inserted"]`
    );
    await editButton.scrollIntoView();
    await editButton.waitForDisplayed({ timeout: 10000 });
    return editButton;
  }
  get editHeader() {
    return $(
      "header.tw-flex.tw-justify-between.tw-items-center.tw-gap-4.tw-border-0.tw-border-b.tw-border-solid.tw-border-secondary-300.tw-p-4.ng-tns-c1767497433-27"
    );
  }
  get deleteButton() {
    return $(
      'button[buttontype="danger"][biticonbutton="bwi-trash"][title="Delete"][aria-label="Delete"]'
    );
  }
  get yesButton() {
    return $(
      '//button[@type="submit" and @buttontype="primary" and contains(., "Yes")]'
    );
  }

  //collections
  get collectionButton() {
    return $("button[role='menuitem']:has(i.bwi-collection)");
  }
  get dialogHeader() {
    return $(
      "header.tw-flex.tw-justify-between.tw-items-center.tw-gap-4.tw-border-0.tw-border-b.tw-border-solid.tw-border-secondary-300.tw-p-4.ng-tns-c1767497433-130"
    );
  }
  get newCollectionSaveButton() {
    return $("button[bitbutton][buttontype='primary'][type='submit']");
  }
  get errorMessage() {
    return $("bit-error[aria-live='assertive']");
  }
  get collectionsNameInput() {
    return $("[formcontrolname='name'][required][aria-invalid='true']");
  }
  getFilterButton(folderName) {
    return $(
      `button.filter-button[title="Filter: ${folderName}"][aria-label="Filter: ${folderName}"]`
    );
  }
}

export default MainPage;
