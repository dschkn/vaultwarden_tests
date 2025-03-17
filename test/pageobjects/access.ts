// import Page from "./page.ts";
// import { ChainablePromiseElement } from "webdriverio";
// import { Helpers } from "../tools/helpers.ts";
import { ItemFill } from "../pageobjects/itemfill.ts";

export class Access extends ItemFill {
    get newOrganisationButton() {
        return $('a[href="#/create-organization"]');
    }
    get inputName() {
        return $('input[type="text"]');
    }
    get submitButton() {
        return $('button[type="submit"]');
    }
    get collectionsButton(){
        return $("button[title='Filter: Collections']")
    }

    selectCollection(collection: string) {
        return $(`//label[text()="${collection}"]`);
    }
    async selectCollectionInMain(collectionName: string) {
        const collection = $(`button[title="View collection - ${collectionName}"]`);
        await collection.waitForDisplayed({ timeout: 10000 });
        await collection.isClickable();
        await collection.click();
    }
    
    

    createdItem(generatedName: string) {
        return $(`button[title="Edit item - ${generatedName}"]`);
    }
    async switchButtonClick() {
        const but = $('i[class="bwi bwi-fw bwi-filter !tw-m-0"]');
        await but.waitForClickable();
        await but.click();
    }
   async passwordManager() {
        const button = $('a[aria-label="Password Manager"]');
        await button.waitForClickable();
        await button.click();
    }

    async organisationSelectAndClick(organisationName: string) {
        const org = $(`button[aria-label="vault: ${organisationName}"]`);
        await org.waitForDisplayed();
        await org.waitForClickable();
        await org.click();
    }

    async loginItemFillWithCollection(generatedName: string, organisationName: string, collectionName: string): Promise<void> {
        await this.fillCommonFieldsLogin(generatedName);
        await this.whoOwnThisItem.click();
        await this.whoOwnThisItem.selectByVisibleText(organisationName);
        await (await this.selectCollection(collectionName)).waitForClickable();
        await (await this.selectCollection(collectionName)).click();
        await this.saveButton.waitForClickable();
        await this.saveButton.click();
    }
    
    

    async cardItemFillWithCollection(generatedCardName: string, organisationName: string, collectionName: string): Promise<void> {
        await this.fillCommonFieldsCard(generatedCardName);
        await this.whoOwnThisItem.click();
        await this.whoOwnThisItem.selectByVisibleText(organisationName);
        await (await this.selectCollection(collectionName)).waitForClickable();
        await (await this.selectCollection(collectionName)).click();
        // await browser.pause(7000)
        
        await this.saveButton.waitForClickable();
        await this.saveButton.click();
    }


}