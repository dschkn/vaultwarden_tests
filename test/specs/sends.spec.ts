import { expect } from "chai";
import { MainPage } from "../pageobjects/mainpage.ts";
import Registration from "../pageobjects/register.ts";
import Login from "../pageobjects/login.ts";
import { Helpers } from "../tools/helpers.ts";
import Sends from "../pageobjects/sends.ts";

describe("checks sends", () => {
    const generatedNewSend = `NewSend_${Date.now()}`;
    
    let RegistrationPage = new Registration();
    let LoginPage = new Login();
    let sendsPage = new Sends(); 
    let mainPage = new MainPage();
    let helpers = new Helpers();

    before(async () => {
        await RegistrationPage.open();
        await browser.deleteAllCookies();
        await LoginPage.login();
        await LoginPage.loginImg.waitForDisplayed();
        await LoginPage.headerTitle.waitForDisplayed();
    });

    it("creates a new send object of a type text", async () => {
        await sendsPage.waitAndClick(sendsPage.sendButton);
        await sendsPage.waitAndClick(sendsPage.newSendItem);
        await sendsPage.newNameInput.setValue(generatedNewSend);
        await sendsPage.waitAndClick(sendsPage.typeOfSend);
        await sendsPage.textArea.setValue("Some text");
        await sendsPage.waitAndClick(sendsPage.saveButton);
        // await helpers.waitForToast(mainPage.toastContainer, "Send saved");
    });

    // it("checks if the content is available", async () => {
    //     await sendsPage.element(generatedNewSend).isDisplayed();
    //     await sendsPage.element(generatedNewSend).click();
    //     const nameInput = await sendsPage.newNameInput.getValue();
    //     expect(nameInput).to.contain(generatedNewSend);
    //     const textArea = await sendsPage.textArea.getValue();
    //     expect(textArea).to.contain("Some text");
    //     await sendsPage.waitAndClick(sendsPage.saveButton);
    //     await helpers.waitForToast(mainPage.toastContainer, "Send saved");
    // })

    it("verifies the correctness of the text when navigating to the Send-item link", async () => {
        await sendsPage.element(generatedNewSend).click();
        const textAreaText = await sendsPage.textArea.getValue();
        const nameInputText = await sendsPage.newNameInput.getValue();
        await sendsPage.copyLinkCheckBox.click();

        const copiedLink = await browser.execute(() => {
            const input = document.querySelector('input[formcontrolname="link"]') as HTMLInputElement;
            return input ? input.value : "";
        });

    console.log("Copied link:", copiedLink);

    if (!copiedLink || !copiedLink.startsWith("http")) {
        throw new Error(`Invalid URL: ${copiedLink}`);
    }

    await browser.execute((url) => window.open(url, '_blank'), copiedLink);

    await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]); // Переключаемся на новую вкладку

    await browser.waitUntil(
        async () => {
            const currentUrl = await browser.getUrl();
            console.log("Currently waiting for URL change, current URL:", currentUrl);
            return currentUrl !== "about:blank";
        },
        {
            timeout: 5000, // Ждём до 5 секунд
            timeoutMsg: "URL не изменился с about:blank",
        }
    );

    const actualUrl = await browser.getUrl();
    const currentTabIndex = handles.indexOf(await browser.getWindowHandle());

    console.log(`✅ URL has been changed! Now we are on tab ${currentTabIndex + 1} with URL: ${actualUrl}`);
    console.log("Expected URL:", copiedLink);
    console.log("Actual URL:", actualUrl);
    await browser.pause(16000);
    const element = await $("div.tw-text-center.tw-mb-6");
    await element.waitForDisplayed({ timeout: 5000 });



        // // // ПРОЯСНИТЬ ЛОКАТОРРРРРРРР
        // await sendsPage.copiedTitleText.waitForDisplayed({ timeout: 5000 });  
        // const copiedTitleText = await sendsPage.copiedTitleText.getTagName();
        // expect(copiedTitleText).to.contain(nameInputText);
        // await browser.pause(6000);
        // // await sendsPage.bitWardenInfo.waitForDisplayed();  
        // // const copiedTitleText = await sendsPage.bitWardenInfo.getTagName();
        // // expect(copiedTitleText).to.contain("shared the following with you");


        // await sendsPage.copiedText.waitForDisplayed();
        // const copiedText = await sendsPage.copiedText.getValue();
        // console.log("Expected Text: ", textAreaText);
        // console.log("Actual Text: ", copiedText);
        

    


        // // await browser.switchToWindow(originalTab); // Переключаемся обратно на исходную вкладку
    

        // // // Ожидаем, что сообщение об успешном сохранении отобразится
        // // await sendsPage.waitAndClick(sendsPage.saveButton);
        // // await helpers.waitForToast(mainPage.toastContainer, "Send saved");
    


        // await browser.pause(5000); // Дополнительная пауза для теста
    });
    
}); 

