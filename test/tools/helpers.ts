import { Browser } from "webdriverio";
import { ChainablePromiseElement } from "webdriverio";

export class Helpers {
  async scrollAndSearch(
    browser: Browser,
    itemSelector: ChainablePromiseElement
  ): Promise<void> {
    const isElementExisting = await itemSelector.isExisting();
    if (!isElementExisting) {
      console.log("Element not found on the page.");
      return;
    }

    let itemDisplayed = await itemSelector.isDisplayed();
    let initScroll = await browser.execute(() => window.scrollY);

    while (!itemDisplayed) {
      await browser.execute(() => window.scrollBy(0, 200));

      const newScroll = await browser.execute(() => window.scrollY);

      if (newScroll === initScroll) {
        console.log("Reached the end of the page, element not found.");
        break; 
      }
      initScroll = newScroll;

      itemDisplayed = await itemSelector.isDisplayed();
    }

    if (itemDisplayed) {
      console.log("Element found and is displayed.");
    } else {
      console.log("Element not found after scrolling.");
    }
  }

  async waitForToastToDisappear(
    toastMessage: ChainablePromiseElement,
    timeout: number = 10000
  ): Promise<void> {
    try {
      if (await toastMessage.isDisplayed()) {
        console.log("Waiting for toast message to disappear...");

        await browser.waitUntil(
          async () => {
            try {
              return !(await toastMessage.isDisplayed());
            } catch (error) {
              return true;
            }
          },
          {
            timeout: timeout,
            timeoutMsg: "Toast message did not disappear in time",
          }
        );

        console.log("Toast message disappeared");
      }
    } catch (error) {
      console.error(
        "Error while waiting for toast message to disappear:",
        error
      );
      throw error;
    }
  }

  async verifyElementNotPresent(
    browser: Browser,
    itemSelector: ChainablePromiseElement
  ): Promise<void> {
    let itemDisplayed = await itemSelector.isDisplayed();
    let initScroll = await browser.execute(() => window.scrollY);

    while (itemDisplayed) {
      await browser.execute(() => window.scrollBy(0, 200));

      const newScroll = await browser.execute(() => window.scrollY);
      if (newScroll === initScroll) {
        console.log("Reached the end of the page without finding the element.");
        break;
      }

      initScroll = newScroll;

      itemDisplayed = await itemSelector.isDisplayed();
    }

    if (itemDisplayed) {
      throw new Error(
        "Element is still displayed on the page, but it should have been deleted."
      );
    } else {
      console.log("Element successfully deleted and not found on the page.");
    }
  }

  
  async waitForToast(
    toastContainer: ChainablePromiseElement,
    expectedText: string,
    timeout: number = 5000
): Promise<void> {
    await toastContainer.waitForDisplayed({ timeout });
  
    let actualText = "";
    const retryInterval = 200;
    const maxRetries = Math.ceil(timeout / retryInterval); 
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        actualText = await toastContainer.getText();
        console.log(`Attempt ${attempt + 1}: Actual toast text - "${actualText}"`);
  
        if (actualText.trim() !== "") {
            break; 
        }
  
        await browser.pause(retryInterval);
    }
  
    // Здесь проверяется, содержит ли actualText ожидаемый текст, а не совпадает ли полностью
    if (!actualText.includes(expectedText)) {
        throw new Error(`!!!The toast text did not match the expected: expected it to contain "${expectedText}", but got "${actualText}"`);
    }
  
    await this.waitForToastToDisappear(toastContainer);
}


  
  
}


