import { Browser } from "webdriverio";
import { ChainablePromiseElement } from "webdriverio";

export class Helpers {
    static async scrollAndSearch(
      browser: Browser,
      itemSelector: ChainablePromiseElement
    ): Promise<void> {
      // Проверка, существует ли элемент на странице
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
  
        // Если позиция прокрутки не изменилась, вероятно, мы достигли конца страницы
        if (newScroll === initScroll) {
          console.log("Reached the end of the page, element not found.");
          break; // Завершаем цикл вместо выбрасывания ошибки
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
  
  static async waitForToastToDisappear(
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
  static async verifyElementNotPresent(
    browser: Browser,
    itemSelector: ChainablePromiseElement
  ): Promise<void> {
    // Инициализируем переменную для отслеживания отображения элемента
    let itemDisplayed = await itemSelector.isDisplayed();
    let initScroll = await browser.execute(() => window.scrollY);

    while (itemDisplayed) {
      await browser.execute(() => window.scrollBy(0, 200));

      const newScroll = await browser.execute(() => window.scrollY);

      // Проверяем, изменилось ли значение скролла
      if (newScroll === initScroll) {
        // Если прокрутка не изменилась, завершаем проверку
        console.log("Reached the end of the page without finding the element.");
        break;
      }

      initScroll = newScroll;

      // Проверяем снова, отображается ли элемент
      itemDisplayed = await itemSelector.isDisplayed();
    }

    // Если элемент все еще отображается, выбрасываем ошибку
    if (itemDisplayed) {
      throw new Error(
        "Element is still displayed on the page, but it should have been deleted."
      );
    } else {
      console.log("Element successfully deleted and not found on the page.");
    }
  }
}
