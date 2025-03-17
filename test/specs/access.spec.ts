import Registration from "../pageobjects/register.ts";
import Login from "../pageobjects/login.ts";
import { Access } from "../pageobjects/access.ts";
import { MainPage } from "../pageobjects/mainpage.ts";
import { Helpers } from "../tools/helpers.ts";

describe("Page elements test", async () => {
    
        const mainPage = new MainPage();
        const accessPage = new Access();
        const helpers = new Helpers();
    
        const generatedName = `Name_${Date.now()}`;
        const generatedCardName = `CardName_${Date.now()}`;
        const organisationName = `Organisation_${Date.now()}`;
        const anotherOrganisation = `AnotherOrg_${Date.now()}`;
        const collectionName = `Collection_${Date.now()}`;
        const anotherCollection = `AnotherColl_${Date.now()}`;
    before(async() => {
        let RegistrationPage = new Registration();
        let LoginPage = new Login();
        await RegistrationPage.open();
        await browser.deleteAllCookies();
        await LoginPage.login();
        await LoginPage.loginImg.waitForDisplayed({ timeout: 10000 }); 
        await LoginPage.headerTitle.waitForDisplayed();
    })

    it("creates a new organisation", async () => {
        await accessPage.newOrganisationButton.waitForClickable();
        await accessPage.newOrganisationButton.click();
        await accessPage.inputName.waitForClickable();
        await accessPage.inputName.click();
        await accessPage.inputName.setValue(organisationName);
        await accessPage.submitButton.waitForClickable();
        await accessPage.submitButton.click();
        await helpers.waitForToast(mainPage.toastContainer, "Organization created");
    });

    it("creates a new collection", async () => {
        await mainPage.newItemDropdownButton.waitForClickable();
        await mainPage.newItemDropdownButton.click();
        await mainPage.collectionButton.waitForDisplayed();
        await mainPage.collectionButton.click();
        await mainPage.collectionInfoNameInput.waitForDisplayed();
        await mainPage.collectionInfoNameInput.setValue(collectionName);
        await accessPage.submitButton.waitForClickable();
        await accessPage.submitButton.click();
        await helpers.waitForToast(mainPage.toastContainer, "Created collection");
    });

    it("creates a new item of type Login", async () => {
        await accessPage.loginItemFillWithCollection(generatedName, organisationName, collectionName);
        await helpers.waitForToast(mainPage.toastContainer, "Item added");
    });

    it("checks if the element is available only in the corresponding collection", async () => {
        await accessPage.selectCollectionInMain(collectionName);
        await browser.pause(7000)
        
        await accessPage.createdItem(generatedName).waitForDisplayed();
    
        await accessPage.collectionsButton.click();
        await accessPage.selectCollectionInMain("Default collection");
        await mainPage.verifyItemNotPresent(generatedName);
        await accessPage.collectionsButton.click();
        await accessPage.selectCollectionInMain("Unassigned");
        await mainPage.verifyItemNotPresent(generatedName);
    });

    it("checks if the item is available in its organization within the password manager", async () => {
        await accessPage.passwordManager();
        await accessPage.organisationSelectAndClick(organisationName);
        await accessPage.createdItem(generatedName).isDisplayed();
    });

    it("creates another new organisation", async () => {
        await accessPage.newOrganisationButton.waitForClickable();
        await accessPage.newOrganisationButton.click();
        await accessPage.inputName.waitForClickable();
        await accessPage.inputName.click();
        await accessPage.inputName.setValue(anotherOrganisation);
        await accessPage.submitButton.waitForClickable();
        await accessPage.submitButton.click();
        await helpers.waitForToast(mainPage.toastContainer, "Organization created");
    });

    it("creates another new collection", async () => {
        await mainPage.newItemDropdownButton.waitForClickable();
        await mainPage.newItemDropdownButton.click();
        await mainPage.collectionButton.waitForDisplayed();
        await mainPage.collectionButton.click();
        await mainPage.collectionInfoNameInput.waitForDisplayed();
        await mainPage.collectionInfoNameInput.setValue(anotherCollection);
        await accessPage.submitButton.waitForClickable();
        await accessPage.submitButton.click();
        await helpers.waitForToast(mainPage.toastContainer, "Created collection");
        await accessPage.passwordManager();
    });
    

    it("checks if the element is available only in the corresponding organisation", async () => {
        await accessPage.organisationSelectAndClick(anotherOrganisation);
        await mainPage.verifyItemNotPresent(generatedName);
        await accessPage.organisationSelectAndClick(organisationName);
        await accessPage.createdItem(generatedName).isDisplayed();
    });

    it("creates a new item of type card", async () => {
        await accessPage.cardItemFillWithCollection(generatedCardName, anotherOrganisation, anotherCollection);
        await helpers.waitForToast(mainPage.toastContainer, "Item added");
    });
    
    it("Checks if the corresponding items are available only within their designated organizations and collections.", async () => {
        await accessPage.organisationSelectAndClick(anotherOrganisation);
        await mainPage.verifyItemNotPresent(generatedName);
        await accessPage.createdItem(generatedCardName).isDisplayed();
        await accessPage.organisationSelectAndClick(organisationName);
        await mainPage.verifyItemNotPresent(generatedCardName);
        await accessPage.createdItem(generatedName).isDisplayed();
    });

});
