import Page from "./page.ts";
import { ChainablePromiseElement } from "webdriverio";
import { Helpers } from "../tools/helpers.ts";

export class MainPage extends Page {
  helpers = new Helpers();
  //login getters
  get newOrganisationLink() {
    return $('a[href="#/create-organization"].filter-button');
  }
  get newOrganisationTitle() {
    return $('h1[bittypography="h1"][title="New organisation"]');
  }
  get nameInput() {
    return $("#bit-input-36");
  }
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
    return $('a=New custom field');
  }
  get fieldNameInput() {
    return $("#fieldName0");
  }
  get fieldValueInput() {
    return $("#fieldValue0");
  }
  get saveButton() {
    return $("button[type='submit']");
  }


  get cancelButton() {
    return $('button[title="Cancel"]')
  }
  get toastContainer() {
    return $("#toast-container"); 
  }
  get typeSelect() {
    return $("#type");
  }
  getItemSelectorByTitle(generatedName: string) {
    return $(`button[title="Edit item - ${generatedName}"]`);
  }

  async scrollAndSearchByVariable(generatedName: string) {
    const itemSelector = $(`button[title="Edit item - ${generatedName}"]`);
    await this.helpers.scrollAndSearch(browser, itemSelector);
  }

  async verifyItemNotPresent(generatedName: string) {
    const itemSelector = $(`button[title="Edit item - ${generatedName}"]`);
    await this.helpers.verifyElementNotPresent(browser, itemSelector);
  }

  async clickOptions(generatedName: string) {
    let rowElement = $(`//tr[td//text()[contains(., '${generatedName}')]]`);
    await rowElement.waitForDisplayed();
    let buttonElement = await rowElement.$('button[title="Options"]');
    await buttonElement.waitForDisplayed();
    await buttonElement.click();
  }
  async deleteObject(Option: DropDownMenuButtons) {
    let deleteButton: ChainablePromiseElement;
    deleteButton = await this.dropDownButton(Option);
    await deleteButton.waitForDisplayed();
    await deleteButton.click();
    await this.yesButton.waitForDisplayed();
    await this.yesButton.click();
  }
  
  get whoOwnThisItem() {
    return $('select[name="OrganizationId"]')
  }
  get collectionButton() {
    return $('button=Collection');
  }
  get collectionInfoNameInput() {
    return $('input.tw-w-full[formcontrolname="name"][required]');

  }





    //CARD getters
    get cardCardholderNameInput() {
      return $("#cardCardholderName");
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
  get cardBrandSelect() {
    return $("#cardBrand");
  }
  get cardCodeInput() {
    return $("#cardCode");
  }
  /*
  someElementWithText(text: string): Promise<Element> {
    return $(`//*[contains(text(), "${text}")]`);
  }
    */





  //Identity getters
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







  //Secure note getters
  get secureNoteNameInput() {
    return $("#name");
  }

  getItemByName(item: string) {
    return $(item);
  }

  get binFilterButton() {
    return $('button[aria-label="Filter: Trash"]');
  }
  rowElementByTitle(itemTitle: string) {
    const rowXPath = `//tr[td[3]//button[@title="${itemTitle}"]]`;
    return $(rowXPath);
  }

  get passwordManagerLink() {
    return $('div[title="Vaults"]');
  }
  // Folder getters
  get folderButton() {
    return $("button[role='menuitem']:has(i.bwi-folder)"); // стремный
  }
  get header() { //менять
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
  async getEditButtonForFolder(folderName) { //длинный слишком
    const editButton = await $(
      `//span[contains(@class, 'filter-buttons')]//button[@title="Filter: ${folderName}"]/following-sibling::span/button[@class="edit-button ng-star-inserted"]`
    );
    await editButton.scrollIntoView();
    await editButton.waitForDisplayed({ timeout: 10000 });
    return editButton;
  }
  get editHeader() { //длинный слишком
    return $(
      "header.tw-flex.tw-justify-between.tw-items-center.tw-gap-4.tw-border-0.tw-border-b.tw-border-solid.tw-border-secondary-300.tw-p-4.ng-tns-c1767497433-27"
    );
  }
  get deleteButton0() {
    return $(
      'button[buttontype="danger"][biticonbutton="bwi-trash"][title="Delete"][aria-label="Delete"]'
    );
  }
  get deleteButton1() {
    return $('button[buttontype="danger"][biticonbutton="bwi-trash"][title="Delete"][aria-label="Delete"]');
  }

  get yesButton() {
    return $(
      '//button[@type="submit" and @buttontype="primary" and contains(., "Yes")]'
    );
  }



  dropDownButton(button: DropDownMenuButtons): ChainablePromiseElement {
    return $(`//span[contains(., '${button}')]`);
  }

  // Delete all rrest Items getters
  get checkAllButton() {
    return $('#checkAll') 
  }

  get pageOptions(){
    return $('button[aria-label="Options"]')
  }
  get deleteSelected(){
    return $('.tw-text-danger') 
  }
  get permanentlyDeleteSelected(){
    return $('.tw-text-danger') 
  }

  get element(){
    return $('[aligncontent="middle"]')
  }

  get submit(){
    return $('[type="submit"]')
  }
  get permanentlyDeleteButton() {
    return $('[type="submit"]') 
  }

}




export enum DropDownMenuButtons {
  Delete = "Delete",
  Edit = "Edit",
  Clone = "Clone",
  PermanentlyDelete = "Permanently delete",
  CopySendLink = "Copy Send Link"
}
