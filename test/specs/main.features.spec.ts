import Registration from "../pageobjects/register.ts";
import Login from "../pageobjects/login.ts";
import { MainPage, DropDownMenuButtons } from "../pageobjects/mainpage.ts";
import { expect } from "chai";
import { Helpers } from "../tools/helpers.ts";

describe("Page elements test", () => {
  const generatedName = `Name_${Date.now()}`; 
  const generatedCardName = `CardName_${Date.now()}`; 
  const generatedIdentityName = `Identity_${Date.now()}`; 
  const generatedSecureNote = `Secure_note_${Date.now()}`; 
  const generatedFolderName = `Folder_${Date.now()}`; 

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
    await mainPage.newItemLoginNameInput.setValue(generatedName);
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

    await mainPage.scrollAndSearchByVariable(generatedName);
    await Helpers.waitForToastToDisappear(mainPage.toastContainer);
    /* СТАРЫЙ СПОСОБ
    const rowElement = await browser.$(`//tr[td//text()[contains(., '${generatedName}')]]`);
    await rowElement.waitForDisplayed();
    const buttonElement = await rowElement.$(".//td[5]//button"); 
    await buttonElement.waitForDisplayed();
    await buttonElement.click();
   */
    //НОВЫЙ СПОСОБ 
    await mainPage.waitForButtonElementIsDisplayedAndClick(generatedName); 
    
    const deleteButton = await mainPage.dropDownButton(DropDownMenuButtons.Delete);
    await deleteButton.waitForDisplayed();
    await deleteButton.click(); 
    await mainPage.yesButton.waitForDisplayed();
    await mainPage.yesButton.click();
    await mainPage.binFilterButton.waitForDisplayed();
    await mainPage.binFilterButton.click();


/*
    const rowElement2 = await browser.$(`//tr[td//text()[contains(., '${generatedName}')]]`);
    await rowElement2.waitForDisplayed();
    const buttonElement2 = await rowElement2.$(".//td[5]//button"); 
    await buttonElement2.waitForDisplayed();
    await buttonElement2.click();
    */
    await mainPage.waitForButtonElementIsDisplayedAndClick(generatedName); 

    const deleteButton2 = await mainPage.dropDownButton(DropDownMenuButtons.PermanentlyDelete);
    await deleteButton2.waitForDisplayed();
    await deleteButton2.click(); 
    await mainPage.yesButton.waitForDisplayed();
    await mainPage.yesButton.click();



    //было (работает)
    //Helpers.verifyElementNotPresent(browser, itemSelector);
    //стало ;не работает()
    await mainPage.verifyItemNotPresent(generatedName);

    await mainPage.passwordManagerLink.click();
    
    await browser.pause(7000);
    
  });
/*
  it("creates a new item of type card", async () => {
    let mainPage = new MainPage();

    await mainPage.newItemDropdownButton.waitForClickable();
    await mainPage.newItemDropdownButton.click();
    await mainPage.itemButton.waitForClickable();
    await mainPage.itemButton.click();
    await mainPage.typeSelect.waitForClickable();
    await mainPage.typeSelect.selectByIndex(1);
    await mainPage.newItemLoginNameInput.waitForDisplayed();
    await mainPage.newItemLoginNameInput.setValue(generatedCardName); // здесь
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

    const itemSelector = $(`button[title="Edit item - ${generatedCardName}"]`);
    await Helpers.scrollAndSearch(browser, itemSelector);
    const itemText = await itemSelector.getText();
    expect(itemText).to.include(generatedCardName);
    await Helpers.waitForToastToDisappear(mainPage.toastContainer);

    const rowElement = await browser.$(`//tr[td//text()[contains(., '${generatedCardName}')]]`);
    await rowElement.waitForDisplayed();
    const buttonElement = await rowElement.$(".//td[5]//button"); 

    await buttonElement.waitForDisplayed();
    await buttonElement.click();

    const deleteButton = await mainPage.dropDownButton(DropDownMenuButtons.Delete);
    await deleteButton.waitForDisplayed();
    await deleteButton.click(); 
    await mainPage.yesButton.waitForDisplayed();
    await mainPage.yesButton.click();
    await browser.pause(4000);
    await mainPage.binFilterButton.waitForDisplayed();
    await mainPage.binFilterButton.click();

    const rowElement2 = await browser.$(`//tr[td//text()[contains(., '${generatedCardName}')]]`);
    await rowElement2.waitForDisplayed();
    const buttonElement2 = await rowElement2.$(".//td[5]//button"); 
    await buttonElement2.waitForDisplayed();
    await buttonElement2.click();

    const deleteButton2 = await mainPage.dropDownButton(DropDownMenuButtons.PermanentlyDelete);
    await deleteButton2.waitForDisplayed();
    await deleteButton2.click(); 
    await mainPage.yesButton.waitForDisplayed();
    await mainPage.yesButton.click();

    await Helpers.verifyElementNotPresent(browser, itemSelector);
    await mainPage.passwordManagerLink.click();
    
    await browser.pause(7000);
    
  });

  it("creates a new item of type Identity", async () => {
    let mainPage = new MainPage();
    await mainPage.newItemDropdownButton.waitForClickable();
    await mainPage.newItemDropdownButton.click();
    await mainPage.itemButton.waitForClickable();
    await mainPage.itemButton.click();
    await mainPage.typeSelect.waitForClickable();
    await mainPage.typeSelect.selectByIndex(2);
    await mainPage.identityNameInput.waitForDisplayed();
    await mainPage.identityNameInput.setValue(generatedIdentityName);
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



    
    const itemSelector = $(`button[title="Edit item - ${generatedIdentityName}"]`);
    await Helpers.scrollAndSearch(browser, itemSelector);
    const itemText = await itemSelector.getText();
    expect(itemText).to.include(generatedIdentityName);
    await Helpers.waitForToastToDisappear(mainPage.toastContainer);

    const rowElement = await browser.$(`//tr[td//text()[contains(., '${generatedIdentityName}')]]`);
    await rowElement.waitForDisplayed();
    const buttonElement = await rowElement.$(".//td[5]//button"); 

    await buttonElement.waitForDisplayed();
    await buttonElement.click();

    const deleteButton = await mainPage.dropDownButton(DropDownMenuButtons.Delete);
    await deleteButton.waitForDisplayed();
    await deleteButton.click(); 
    await mainPage.yesButton.waitForDisplayed();
    await mainPage.yesButton.click();
    await browser.pause(4000);
    await mainPage.binFilterButton.waitForDisplayed();
    await mainPage.binFilterButton.click();

    const rowElement2 = await browser.$(`//tr[td//text()[contains(., '${generatedIdentityName}')]]`);
    await rowElement2.waitForDisplayed();
    const buttonElement2 = await rowElement2.$(".//td[5]//button"); 
    await buttonElement2.waitForDisplayed();
    await buttonElement2.click();

    const deleteButton2 = await mainPage.dropDownButton(DropDownMenuButtons.PermanentlyDelete);
    await deleteButton2.waitForDisplayed();
    await deleteButton2.click(); 
    await mainPage.yesButton.waitForDisplayed();
    await mainPage.yesButton.click();

    await Helpers.verifyElementNotPresent(browser, itemSelector);
    await mainPage.passwordManagerLink.click();
    
    await browser.pause(7000);
    
  });

  it("creates a new item of type Secure note", async () => {
    let mainPage = new MainPage();
    await mainPage.newItemDropdownButton.waitForClickable();
    await mainPage.newItemDropdownButton.click();
    await mainPage.itemButton.click();
    await mainPage.typeSelect.waitForClickable();
    await mainPage.typeSelect.selectByIndex(3);
    await mainPage.secureNoteNameInput.waitForDisplayed();
    await mainPage.secureNoteNameInput.setValue(generatedSecureNote); //
    await mainPage.notesTextarea.waitForDisplayed();
    await mainPage.notesTextarea.setValue("Notes");
    await mainPage.saveButton.click();
    await mainPage.toastContainer.waitForDisplayed();
    const toasterText = await mainPage.toastContainer.getText();
    expect(toasterText).to.include("Item added");


    const itemSelector = $(`button[title="Edit item - ${generatedSecureNote}"]`);
    await Helpers.scrollAndSearch(browser, itemSelector);
    const itemText = await itemSelector.getText();
    expect(itemText).to.include(generatedSecureNote);
    await Helpers.waitForToastToDisappear(mainPage.toastContainer);

    const rowElement = await browser.$(`//tr[td//text()[contains(., '${generatedSecureNote}')]]`);
    await rowElement.waitForDisplayed();
    const buttonElement = await rowElement.$(".//td[5]//button"); 

    await buttonElement.waitForDisplayed();
    await buttonElement.click();

    const deleteButton = await mainPage.dropDownButton(DropDownMenuButtons.Delete);
    await deleteButton.waitForDisplayed();
    await deleteButton.click(); 
    await mainPage.yesButton.waitForDisplayed();
    await mainPage.yesButton.click();
    await browser.pause(4000);
    await mainPage.binFilterButton.waitForDisplayed();
    await mainPage.binFilterButton.click();

    const rowElement2 = await browser.$(`//tr[td//text()[contains(., '${generatedSecureNote}')]]`);
    await rowElement2.waitForDisplayed();
    const buttonElement2 = await rowElement2.$(".//td[5]//button"); 
    await buttonElement2.waitForDisplayed();
    await buttonElement2.click();

    const deleteButton2 = await mainPage.dropDownButton(DropDownMenuButtons.PermanentlyDelete);
    await deleteButton2.waitForDisplayed();
    await deleteButton2.click(); 
    await mainPage.yesButton.waitForDisplayed();
    await mainPage.yesButton.click();

    await Helpers.verifyElementNotPresent(browser, itemSelector);
    await mainPage.passwordManagerLink.click();
    
    await browser.pause(7000);
  });
  

  it("creates a new folder", async () => {
    let mainPage = new MainPage();
    await mainPage.newItemDropdownButton.waitForClickable();
    await mainPage.newItemDropdownButton.click();
    await mainPage.folderButton.waitForClickable();
    await mainPage.folderButton.click();
    await mainPage.header.isDisplayed();
    await mainPage.folderNameInput.isDisplayed();
    await mainPage.folderNameInput.setValue(generatedFolderName);
    await mainPage.folderSaveButton.isDisplayed();
    await mainPage.folderSaveButton.click();
    await mainPage.toastContainer.waitForDisplayed();
    const toasterText = await mainPage.toastContainer.getText();
    expect(toasterText).to.include("Folder added");



    await Helpers.waitForToastToDisappear(mainPage.toastContainer);
    const filterButton = mainPage.getFilterButton(generatedFolderName);
    await Helpers.scrollAndSearch(browser, filterButton);
    await filterButton.click();
    const editButton = await mainPage.getEditButtonForFolder(
      generatedFolderName
    );
    await editButton.click();
    await mainPage.editHeader.isDisplayed();
    await mainPage.deleteButton0.waitForClickable();
    await mainPage.deleteButton0.click();
    await mainPage.yesButton.waitForClickable();
    await mainPage.yesButton.click();
    await mainPage.toastContainer.waitForDisplayed();
    const newtoasterText = await mainPage.toastContainer.getText();
    expect(newtoasterText).to.include("Folder deleted");
    await Helpers.waitForToastToDisappear(mainPage.toastContainer);
    await Helpers.verifyElementNotPresent(browser, filterButton);
  });
/*
  it("creates a new collection", async () => {
    let mainPage = new MainPage();
    await mainPage.newItemDropdownButton.waitForClickable();
    await mainPage.newItemDropdownButton.click();
    await mainPage.collectionButton.waitForClickable();
    await mainPage.collectionButton.click();
    await mainPage.dialogHeader.isDisplayed();
    await browser.pause(5000);
    await mainPage.newCollectionSaveButton.isDisplayed();
    await mainPage.newCollectionSaveButton.click();
    await mainPage.errorMessage.isDisplayed();
    const errorMessage = await mainPage.errorMessage.getText();
    expect(errorMessage).to.include("Input is required.");
    await mainPage.collectionsNameInput.waitForClickable();
    await mainPage.collectionsNameInput.setValue(collectionName);
    await mainPage.newCollectionSaveButton.isDisplayed();
    await mainPage.newCollectionSaveButton.click();
    await mainPage.toastContainer.waitForDisplayed();
    const toasterText = await mainPage.toastContainer.getText();
    expect(toasterText).to.include("Created collection");
    await Helpers.waitForToastToDisappear(mainPage.toastContainer);
    const collection = mainPage.getFilterButton(collectionName);
    await Helpers.scrollAndSearch(browser, collection);
    await browser.pause(5000);
  });
  */
});
