import Registration from "../pageobjects/register.ts";
import Login from "../pageobjects/login.ts";
import { ItemFill } from "../pageobjects/itemfill.ts";
import { MainPage } from "../pageobjects/mainpage.ts";
import { Helpers } from "../tools/helpers.ts";

describe("Page elements test", async () => {
  const generatedItems = {
    Login: `Name_${Date.now()}`,
    Card: `CardName_${Date.now()}`,
    Identity: `Identity_${Date.now()}`,
    SecureNote: `Secure_note_${Date.now()}`,
  };

  let mainPage: MainPage;
  let itemFill: ItemFill;
  let registrationPage: Registration;
  let loginPage: Login;
  let helpers: Helpers;

before(async () => {
    registrationPage = new Registration();
    loginPage = new Login();
    mainPage = new MainPage();
    itemFill = new ItemFill();
    helpers = new Helpers();

    await registrationPage.open();
    await browser.deleteAllCookies();
    await loginPage.login();
});


  it("creates a new item of type Login", async () => {
    await itemFill.loginItemFill(generatedItems.Login);
    await helpers.waitForToast(mainPage.toastContainer, "Item added");
    await browser.pause(7000)
    await itemFill.loginItemCheck(generatedItems.Login); 
    await helpers.waitForToast(mainPage.toastContainer, "Item saved");
  });

  it("creates a new item of type Card", async () => {
    await itemFill.cardItemFill(generatedItems.Card);
    await helpers.waitForToast(mainPage.toastContainer, "Item added");
    await itemFill.cardItemCheck(generatedItems.Card);
    await helpers.waitForToast(mainPage.toastContainer, "Item saved");
  });

  it("creates a new item of type Identity", async () => {
    await itemFill.identityItemFill(generatedItems.Identity);
    await helpers.waitForToast(mainPage.toastContainer, "Item added");
    await itemFill.identityItemCheck(generatedItems.Identity);
    await helpers.waitForToast(mainPage.toastContainer, "Item saved");
  });

  it("creates a new item of type Secure note", async () => {
    await itemFill.secureNoteItemFill(generatedItems.SecureNote);
    await helpers.waitForToast(mainPage.toastContainer, "Item added");
    await itemFill.secureNoteItemCheck(generatedItems.SecureNote); //m
    await helpers.waitForToast(mainPage.toastContainer, "Item saved");
  });

  it("deletes all items left in the trash", async () => {
    if (await mainPage.element.isDisplayed()) {
      await mainPage.checkAllButton.waitForClickable();
      await mainPage.checkAllButton.click();
      await mainPage.pageOptions.waitForClickable();
      await mainPage.pageOptions.click();
      await mainPage.deleteSelected.waitForClickable();
      await mainPage.deleteSelected.click();
      await mainPage.submit.click();
      await helpers.waitForToast(mainPage.toastContainer, "sent to trash");

      await mainPage.binFilterButton.waitForDisplayed();
      await mainPage.binFilterButton.click();
      await mainPage.checkAllButton.waitForClickable();
      await mainPage.checkAllButton.click();
      await mainPage.pageOptions.waitForClickable();
      await mainPage.pageOptions.click();
      await mainPage.permanentlyDeleteSelected.waitForClickable();
      await mainPage.permanentlyDeleteSelected.click();
      await mainPage.permanentlyDeleteButton.click();
      await helpers.waitForToast(mainPage.toastContainer, "permanently deleted"); 
  } else {
     return;
  }
  });
  
});
