import Registration from "../pageobjects/register.ts";
import Login from "../pageobjects/login.ts";
import MainPage from "../pageobjects/mainpage.ts";
import { expect } from "chai";
import { Helpers } from "../tools/helpers.ts";

describe("Page elements test", () => {
  const randomNumber: number = Math.floor(Math.random() * 1000);
  const generatedOrganisationName: string = `Organisation${randomNumber}`;
  const currentTime = new Date().getTime();
  const generatedName = `Name_${Date.now()}`; //
  const generatedCardName = `CardName_${Date.now()}`; //
  const generatedIdentityName = `Identity_${Date.now()}`; //
  const generatedSecureNote = `Secure_note_${Date.now()}`; //

  it("log in with a test account", async () => {
    let RegistrationPage = new Registration();

    await RegistrationPage.open();

    let LoginPage = new Login();
    await LoginPage.loginInputEmail.setValue("test_user@test.com");
    await LoginPage.continueButton.click();
    await LoginPage.masterPasswordInput.setValue("test_user_password");
    await LoginPage.loginWithMasterPasswordButton.click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include(`vault`);
    await LoginPage.headerTitle.waitForDisplayed();
  });

  it("creates a new item of type login", async () => {
    let mainPage = new MainPage();
    await mainPage.newItemDropdownButton.click();
    await mainPage.itemButton.click();
    await mainPage.newItemLoginNameInput.waitForDisplayed();
    await mainPage.newItemLoginNameInput.setValue(generatedName); // здесь
    await mainPage.loginUsernameInput.waitForDisplayed();
    await mainPage.loginUsernameInput.setValue("Name");
    await mainPage.loginPasswordInput.waitForDisplayed();
    await mainPage.loginPasswordInput.setValue("some_random_password");
    await mainPage.loginTotpInput.waitForDisplayed();
    await mainPage.loginTotpInput.setValue("authenticator_key");
    await mainPage.loginUriInput.waitForDisplayed();
    await mainPage.loginUriInput.setValue("test@test.com");
    await mainPage.loginUriMatchSelect.waitForDisplayed();
    await mainPage.loginUriMatchSelect.selectByVisibleText("Host");
    await mainPage.notesTextarea.waitForDisplayed();
    await mainPage.notesTextarea.setValue("Random text");
    await mainPage.newCustomFieldLink.waitForDisplayed();
    await mainPage.newCustomFieldLink.click();
    await mainPage.fieldNameInput.waitForDisplayed();
    await mainPage.fieldValueInput.waitForDisplayed();
    await mainPage.fieldNameInput.setValue("Custom field name");
    await mainPage.fieldValueInput.setValue("Custom field value");
    await mainPage.saveButton.click();
    await mainPage.toastContainer.waitForDisplayed();
    const toasterText = await mainPage.toastContainer.getText();
    expect(toasterText).to.include("Item added");
    const itemSelector = $(`button[title="Edit item - ${generatedName}"]`);
    await Helpers.scrollAndSearch(browser, itemSelector);
    const itemText = await itemSelector.getText();
    expect(itemText).to.include(generatedName);
    await Helpers.waitForToastToDisappear(mainPage.toastContainer);
    const itemTitle = `Edit item - ${generatedName}`;
    const rowElement = mainPage.rowElementByTitle(itemTitle);
    await rowElement.waitForDisplayed();
    const buttonXPath = ".//td[5]//button";
    const buttonElement = await rowElement.$(buttonXPath);
    await buttonElement.waitForDisplayed();
    await buttonElement.click();
    const deleteButtonXPath = `//button[@role="menuitem"]//span[contains(@class, 'tw-text-danger')]//i[contains(@class, 'bwi-trash')]`;
    const deleteButton = await browser.$(deleteButtonXPath);
    await deleteButton.waitForDisplayed();
    await deleteButton.click();
    const confirmDialogSelector = "div.tw-my-4";
    const yesButtonSelector = 'button[type="submit"][buttontype="primary"]';
    const confirmDialog = await browser.$(confirmDialogSelector);
    await confirmDialog.isDisplayed();
    const yesButton = await browser.$(yesButtonSelector);
    await yesButton.isDisplayed();
    await yesButton.click();
    await mainPage.toastContainer.waitForDisplayed();
    const toasterTextAfter = await mainPage.toastContainer.getText();
    expect(toasterTextAfter).to.include("Item sent to bin"); //важно!
    await Helpers.verifyElementNotPresent(browser, itemSelector);
    await mainPage.binFilterButton.click();
    await Helpers.scrollAndSearch(browser, itemSelector);
    await buttonElement.waitForDisplayed();
    await buttonElement.click();
    await deleteButton.waitForDisplayed();
    await deleteButton.click();
    await confirmDialog.isDisplayed();
    await yesButton.isDisplayed();
    await yesButton.click();
    await mainPage.toastContainer.waitForDisplayed();
    const toasterTextAfter2 = await mainPage.toastContainer.getText();
    expect(toasterTextAfter2).to.include("Item permanently deleted");
    await Helpers.verifyElementNotPresent(browser, itemSelector);
  });

  /*it("creates a new item of type card", async () => {
    let mainPage = new MainPage();
    
    await mainPage.newItemDropdownButton.waitForClickable();
    await mainPage.newItemDropdownButton.click();
    await mainPage.itemButton.waitForClickable();
    await mainPage.itemButton.click();
    await mainPage.typeSelect.selectByIndex(1);
    await mainPage.newItemLoginNameInput.waitForDisplayed();
    await mainPage.newItemLoginNameInput.setValue(generatedCardName); // здесь
    await browser.pause(4000);
    await mainPage.cardCardholderNameInput.waitForDisplayed();
    await mainPage.cardCardholderNameInput.setValue("Steve Jobs");
    await mainPage.cardNumberInput.waitForDisplayed();
    await mainPage.cardNumberInput.setValue("1111222233334444");
    await mainPage.cardExpMonthSelect.waitForDisplayed();
    await mainPage.cardExpMonthSelect.selectByIndex(6);
    await mainPage.cardExpYearInput.waitForDisplayed();
    await mainPage.cardExpYearInput.setValue("2040");
    await mainPage.cardBrandSelect.waitForDisplayed();
    await mainPage.cardBrandSelect.selectByIndex(2);
    await mainPage.cardCodeInput.waitForDisplayed();
    await mainPage.cardCodeInput.setValue("123");
    await mainPage.notesTextarea.waitForDisplayed();
    await mainPage.notesTextarea.setValue("Notes");
    await mainPage.saveButton.waitForClickable();
    await mainPage.saveButton.click();
    await mainPage.toastContainer.waitForDisplayed();
    const toasterText = await mainPage.toastContainer.getText();
    expect(toasterText).to.include("Item added");
  });

  it("creates a new item of type Identity", async () => {
    let mainPage = new MainPage();
    await browser.waitUntil(
      async () =>
        !(await browser.$('p[data-testid="toast-message"]').isDisplayed()),
      {
        timeout: 10000,
        timeoutMsg: "Toast message did not disappear before clicking",
      }
    );
    await browser.pause(2000);
    await mainPage.newItemDropdownButton.waitForClickable();
    await mainPage.newItemDropdownButton.click();
    await mainPage.itemButton.waitForClickable();
    await mainPage.itemButton.click();
    await mainPage.typeSelect.selectByIndex(2);
    await mainPage.identityNameInput.waitForDisplayed();
    await mainPage.identityNameInput.setValue(generatedIdentityName);
    await browser.pause(4000);
    await mainPage.idTitleSelect.waitForDisplayed();
    await mainPage.idTitleSelect.selectByIndex(1);
    await mainPage.firstNameInput.waitForDisplayed();
    await mainPage.firstNameInput.setValue("Albus"); // еще бы надо поймать ошибки если неправильно ввел имя символы там......)/%)§(=§% ) или слишком длинное бляя
    await mainPage.middleNameInput.waitForDisplayed();
    await mainPage.middleNameInput.setValue("Percival");
    await mainPage.lastNameInput.waitForDisplayed();
    await mainPage.lastNameInput.setValue("Dumbledore");
    await mainPage.usernameInput.waitForDisplayed();
    await mainPage.usernameInput.setValue("Wizard");
    await mainPage.companyInput.waitForDisplayed();
    await mainPage.companyInput.setValue("Hogwarts");
    await mainPage.ssnInput.waitForDisplayed();
    await mainPage.ssnInput.setValue("111222333444");
    await mainPage.passportNumberInput.waitForDisplayed();
    await mainPage.passportNumberInput.setValue("000000000000");
    await mainPage.licenseNumberInput.waitForDisplayed();
    await mainPage.licenseNumberInput.setValue("111111111111");
    await mainPage.emailInput.waitForDisplayed();
    await mainPage.emailInput.setValue("email@test.com");
    await mainPage.phoneInput.waitForDisplayed();
    await mainPage.phoneInput.setValue("+0123456789");
    await mainPage.address1Input.waitForDisplayed();
    await mainPage.address1Input.setValue("12 Grimmauld Place");
    await mainPage.cityInput.waitForDisplayed();
    await mainPage.cityInput.setValue("London");
    await mainPage.stateInput.waitForDisplayed();
    await mainPage.stateInput.setValue("Great Britain");
    await mainPage.notesTextarea.waitForDisplayed();
    await mainPage.notesTextarea.setValue("Notes");
    await mainPage.saveButton.click();
    await mainPage.toastContainer.waitForDisplayed();
    const toasterText = await mainPage.toastContainer.getText();
    expect(toasterText).to.include("Item added");
  });

  it("creates a new item of type Secure note", async () => {
    let mainPage = new MainPage();
    await browser.waitUntil(
      async () => !(await mainPage.toastContainer.isDisplayed()), // Проверка невидимости элемента
      {
        timeout: 5000,
        timeoutMsg: "Toast message did not disappear before clicking",
      }
    );
    await mainPage.newItemDropdownButton.waitForClickable();
    await mainPage.newItemDropdownButton.click();
    await mainPage.itemButton.click();
    await mainPage.typeSelect.selectByIndex(3);
    await mainPage.secureNoteNameInput.waitForDisplayed();
    await mainPage.secureNoteNameInput.setValue(generatedSecureNote); //
    await browser.pause(4000);
    await mainPage.notesTextarea.waitForDisplayed();
    await mainPage.notesTextarea.setValue("Notes");
    await mainPage.saveButton.click();
    await mainPage.toastContainer.waitForDisplayed();
    const toasterText = await mainPage.toastContainer.getText();
    expect(toasterText).to.include("Item added");

    await browser.pause(15000);
  });

  /*it("creates a new organization", async () => {
    let mainPage = new MainPage();
    await mainPage.newOrganisationLink.click();
    await mainPage.newOrganisationTitle.waitForDisplayed();
    await mainPage.nameInputAlternative.setValue(generatedOrganisationName);
    await mainPage.submitButton.click();
    await browser.pause(7000);
    // здесб должна быть проверка что новая организация отобразилась
    //Как сделать так чтобы он находил элемент Organisation756 по сгенерированному имени?
  });
  */
});
