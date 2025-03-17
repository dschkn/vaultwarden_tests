export default class Sends {
    get sendButton() {
        return $('a[href="#/sends"]')
    }

    get newSendItem() {
        return $("button[buttontype='primary']")

    }

    async waitAndClick(element: ChainablePromiseElement): Promise<void> {
        await element.waitForDisplayed();
        await element.waitForClickable();
        await element.click();
    }

    get newNameInput() {
        return $('input[formcontrolname="name"]');
    }

    get typeOfSend() {
        return $('//label[normalize-space()="Text"]//input');
    }
    get textArea() {
        return $('textarea[id="text"]');
    }
    get saveButton() {
        return $("button[aria-label='Save']")
      }
    get copyLinkCheckBox() {
        return $("input[formcontrolname='copyLink']")
    }
    get copiedTitleText() {
        return $('/html/body/app-root/ng-component/auth-anon-layout/main/div[2]/div/app-send-access/form/div/p');
    }

    get bitWardenInfo(){
        return $("div.tw-text-sm")
    }
    get copiedText() {
        return $("textarea[id='text']");
    }

    
    
    
    element(generatedSendName: string) {
        return $(`//button[normalize-space()="${generatedSendName}"]`);
    }
    async findAndClickIconByText(text: string): Promise<void> {
        const row = await $(`//tr[td/button[normalize-space(text())='${text}']]`);
        const spanIcon = await row.$(".//td//span[contains(@class, 'tw-relative')]");
        await spanIcon.click();
    }


}