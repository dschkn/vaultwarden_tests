import { MainPage } from "./mainpage.ts";
import { expect } from "chai";


export class ItemFill extends MainPage {
    
    
    async fillCommonFieldsLogin(generatedName: string): Promise<void> {
        await this.newItemDropdownButton.click();
        await this.itemButton.click();
        await this.newItemLoginNameInput.waitForDisplayed();
        await this.newItemLoginNameInput.setValue(generatedName);
        await this.loginUsernameInput.waitForDisplayed();
        await this.loginUsernameInput.setValue("Name");
        await this.loginPasswordInput.waitForDisplayed();
        await this.loginPasswordInput.setValue("some_random_password");
        await this.loginTotpInput.waitForDisplayed();
        await this.loginTotpInput.setValue("authenticator_key");
        await this.loginUriInput.waitForDisplayed();
        await this.loginUriInput.setValue("test@test.com");
        await this.loginUriMatchSelect.waitForDisplayed();
        await this.loginUriMatchSelect.selectByVisibleText("Host");
        await this.notesTextarea.waitForDisplayed();
        await this.notesTextarea.setValue("Random text");
        await this.newCustomFieldLink.waitForDisplayed();
        await this.newCustomFieldLink.click();
        await this.fieldNameInput.waitForDisplayed();
        await this.fieldNameInput.setValue("Custom field name");
        await this.fieldValueInput.waitForDisplayed();
        await this.fieldValueInput.setValue("Custom field value");
    }
    async loginItemFill(generatedName: string): Promise<void> {
        await this.fillCommonFieldsLogin(generatedName);
        await this.saveButton.waitForClickable();
        await this.saveButton.click();
    }

    async loginItemCheck(generatedName: string) {
        await this.getItemSelectorByTitle(generatedName).waitForDisplayed(); //m
        await this.getItemSelectorByTitle(generatedName).click();
        await this.newItemLoginNameInput.waitForDisplayed();
        const newItemLoginNameInput = await this.newItemLoginNameInput.getValue();
        expect(newItemLoginNameInput).to.include(generatedName);
        await this.loginUsernameInput.waitForDisplayed();
        const loginUsernameInput = await this.loginUsernameInput.getValue();
        expect(loginUsernameInput).to.include("Name");
        await this.loginPasswordInput.waitForDisplayed();
        const loginPasswordInput = await this.loginPasswordInput.getValue();
        expect(loginPasswordInput).to.include("some_random_password");
        await this.loginTotpInput.waitForDisplayed();
        const loginTotpInput = await this.loginTotpInput.getValue();
        expect(loginTotpInput).to.include("authenticator_key");
        await this.loginUriInput.waitForDisplayed();
        const loginUriInput = await this.loginUriInput.getValue();
        expect(loginUriInput).to.include("test@test.com");
        await this.loginUriMatchSelect.waitForDisplayed();
        await this.loginUriMatchSelect.selectByVisibleText("Host");
        const selectedValue = await this.loginUriMatchSelect.getValue();
        const selectedText = await this.loginUriMatchSelect.$(`option[value="${selectedValue}"]`).getText();
        expect(selectedText).to.include("Host");
        await this.notesTextarea.waitForDisplayed();
        const notesTextarea = await this.notesTextarea.getValue();
        expect(notesTextarea).to.include("Random text");
        await this.fieldNameInput.waitForDisplayed();
        const fieldNameInput = await this.fieldNameInput.getValue();
        expect(fieldNameInput).to.include("Custom field name");
        await this.fieldValueInput.waitForDisplayed();
        const fieldValueInput = await this.fieldValueInput.getValue();
        expect(fieldValueInput).to.include("Custom field value");
        await this.saveButton.waitForClickable();
        await this.saveButton.click();
    }
    async fillCommonFieldsCard(generatedCardName: string): Promise<void> {
        await this.newItemDropdownButton.waitForClickable();
        await this.newItemDropdownButton.click();
        await this.itemButton.waitForClickable();
        await this.itemButton.click();
        await this.typeSelect.waitForClickable();
        await this.typeSelect.selectByIndex(1);
        await this.newItemLoginNameInput.waitForDisplayed();
        await this.newItemLoginNameInput.setValue(generatedCardName); 
        await this.cardCardholderNameInput.waitForDisplayed();
        await this.cardCardholderNameInput.setValue("Steve Jobs");
        await this.cardNumberInput.waitForDisplayed();
        await this.cardNumberInput.setValue("1111222233334444");
        await this.cardExpMonthSelect.waitForDisplayed();
        await this.cardExpMonthSelect.selectByIndex(6);
        await this.cardExpYearInput.waitForDisplayed();
        await this.cardExpYearInput.setValue("2040");
        await this.cardBrandSelect.waitForDisplayed();
        await this.cardBrandSelect.selectByIndex(2);
        await this.cardCodeInput.waitForDisplayed();
        await this.cardCodeInput.setValue("123");
        await this.notesTextarea.waitForDisplayed();
        await this.notesTextarea.setValue("Notes");
    }

    async cardItemFill(generatedCardName: string): Promise<void> {
        await this.fillCommonFieldsCard(generatedCardName);
        await this.saveButton.waitForClickable();
        await this.saveButton.click();
    }



    async cardItemCheck(generatedCardName: string) {
        await this.getItemSelectorByTitle(generatedCardName).waitForDisplayed();
        await this.getItemSelectorByTitle(generatedCardName).click();
        await this.newItemLoginNameInput.waitForDisplayed();
        const newItemLoginNameInput = await this.newItemLoginNameInput.getValue();
        expect(newItemLoginNameInput).to.contain(generatedCardName);
        await this.cardCardholderNameInput.waitForDisplayed();
        const cardCardholderNameInput = await this.cardCardholderNameInput.getValue();
        expect(cardCardholderNameInput).to.contain("Steve Jobs");
        await this.cardNumberInput.waitForDisplayed();
        const cardNumberInput = await this.cardNumberInput.getValue();
        expect(cardNumberInput).to.contain("1111222233334444");
        await this.cardExpYearInput.waitForDisplayed();
        const cardExpYearInput = await this.cardExpYearInput.getValue();
        expect(cardExpYearInput).to.contain("2040");
        await this.cardCodeInput.waitForDisplayed();
        const cardCodeInput = await this.cardCodeInput.getValue();
        expect(cardCodeInput).to.contain("123");
        await this.notesTextarea.waitForDisplayed();
        const notesTextarea = await this.notesTextarea.getValue();
        expect(notesTextarea).to.contain("Notes");
        await this.saveButton.waitForClickable();
        await this.saveButton.click();
    }
    async identityItemFill(generatedIdentityName: string) {
        await this.newItemDropdownButton.waitForClickable();
        await this.newItemDropdownButton.click();
        await this.itemButton.waitForClickable();
        await this.itemButton.click();
        await this.typeSelect.waitForClickable();
        await this.typeSelect.selectByIndex(2);
        await this.identityNameInput.waitForDisplayed();
        await this.identityNameInput.setValue(generatedIdentityName);
        await this.idTitleSelect.waitForDisplayed();
        await this.idTitleSelect.selectByIndex(1);
        await this.firstNameInput.waitForDisplayed();
        await this.firstNameInput.setValue("Albus");
        await this.middleNameInput.waitForDisplayed();
        await this.middleNameInput.setValue("Percival");
        await this.lastNameInput.waitForDisplayed();
        await this.lastNameInput.setValue("Dumbledore");
        await this.usernameInput.waitForDisplayed();
        await this.usernameInput.setValue("Wizard");
        await this.companyInput.waitForDisplayed();
        await this.companyInput.setValue("Hogwarts");
        await this.ssnInput.waitForDisplayed();
        await this.ssnInput.setValue("111222333444");
        await this.passportNumberInput.waitForDisplayed();
        await this.passportNumberInput.setValue("000000000000");
        await this.licenseNumberInput.waitForDisplayed();
        await this.licenseNumberInput.setValue("111111111111");
        await this.emailInput.waitForDisplayed();
        await this.emailInput.setValue("email@test.com");
        await this.phoneInput.waitForDisplayed();
        await this.phoneInput.setValue("+0123456789");
        await this.address1Input.waitForDisplayed();
        await this.address1Input.setValue("12 Grimmauld Place");
        await this.cityInput.waitForDisplayed();
        await this.cityInput.setValue("London");
        await this.stateInput.waitForDisplayed();
        await this.stateInput.setValue("Great Britain");
        await this.notesTextarea.waitForDisplayed();
        await this.notesTextarea.setValue("Notes");
        await this.saveButton.waitForClickable();
        await this.saveButton.click();
    }

    async identityItemCheck(generatedIdentityName: string) {
        await this.getItemSelectorByTitle(generatedIdentityName).waitForDisplayed();
        await this.getItemSelectorByTitle(generatedIdentityName).click();

        const identityNameInput = await this.identityNameInput.getValue();
        expect(identityNameInput).to.contain(generatedIdentityName);
        await this.firstNameInput.waitForDisplayed();
        const firstNameInput = await this.firstNameInput.getValue();
        expect(firstNameInput).to.contain("Albus");
        await this.middleNameInput.waitForDisplayed();
        const middleNameInput = await this.middleNameInput.getValue();
        expect(middleNameInput).to.contain("Percival");
        await this.lastNameInput.waitForDisplayed();
        const lastNameInput = await this.lastNameInput.getValue();
        expect(lastNameInput).to.contain("Dumbledore");
        await this.usernameInput.waitForDisplayed();
        const usernameInput = await this.usernameInput.getValue();
        expect(usernameInput).to.contain("Wizard");
        await this.companyInput.waitForDisplayed();
        const companyInput = await this.companyInput.getValue();
        expect(companyInput).to.contain("Hogwarts");
        await this.ssnInput.waitForDisplayed();
        const ssnInput = await this.ssnInput.getValue();
        expect(ssnInput).to.contain("111222333444");
        await this.passportNumberInput.waitForDisplayed();
        const passportNumberInput = await this.passportNumberInput.getValue();
        expect(passportNumberInput).to.contain("000000000000");
        await this.licenseNumberInput.waitForDisplayed();
        const licenseNumberInput = await this.licenseNumberInput.getValue();
        expect(licenseNumberInput).to.contain("111111111111");
        await this.emailInput.waitForDisplayed();
        const emailInput = await this.emailInput.getValue();
        expect(emailInput).to.contain("email@test.com");
        await this.phoneInput.waitForDisplayed();
        const phoneInput = await this.phoneInput.getValue();
        expect(phoneInput).to.contain("+0123456789");
        await this.address1Input.waitForDisplayed();
        const address1Input = await this.address1Input.getValue();
        expect(address1Input).to.contain("12 Grimmauld Place");
        await this.cityInput.waitForDisplayed();
        const cityInput = await this.cityInput.getValue();
        expect(cityInput).to.contain("London");
        await this.stateInput.waitForDisplayed();
        const stateInput = await this.stateInput.getValue();
        expect(stateInput).to.contain("Great Britain");
        await this.notesTextarea.waitForDisplayed();
        const notesTextarea = await this.notesTextarea.getValue();
        expect(notesTextarea).to.contain("Notes");
        await this.saveButton.waitForClickable();
        await this.saveButton.click();
    }
    async secureNoteItemFill(generatedSecureNote: string) {
        await this.newItemDropdownButton.waitForClickable();
        await this.newItemDropdownButton.click();
        await this.itemButton.click();
        await this.typeSelect.waitForClickable();
        await this.typeSelect.selectByIndex(3);
        await this.secureNoteNameInput.waitForDisplayed();
        await this.secureNoteNameInput.setValue(generatedSecureNote);
        await this.notesTextarea.waitForDisplayed();
        await this.notesTextarea.setValue("Notes");
        await this.saveButton.waitForClickable();
        await this.saveButton.click();
    }

    async secureNoteItemCheck(generatedSecureNote: string) {
        await this.getItemSelectorByTitle(generatedSecureNote).waitForDisplayed(); //m
        await this.getItemSelectorByTitle(generatedSecureNote).click();
        await this.secureNoteNameInput.waitForDisplayed();
        const secureNoteNameInput = await this.secureNoteNameInput.getValue();
        expect(secureNoteNameInput).to.contain(generatedSecureNote);
        await this.notesTextarea.waitForDisplayed();
        const notesTextarea = await this.notesTextarea.getValue();
        expect(notesTextarea).to.contain("Notes");
        await this.saveButton.waitForClickable();
        await this.saveButton.click();
        await browser.pause(2000)
    }



}
