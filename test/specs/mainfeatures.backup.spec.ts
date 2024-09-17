const itemSelector = `button[title="Edit item - ${generatedName}"]`; //вот здесь селектор какой то был неправиильный

let itemDisplayed = await mainPage
      .getItemByName(itemSelector)
      .isDisplayed();
    let initScroll = await browser.execute(() => window.scrollY);
    while (!itemDisplayed) {
      await browser.scroll(0, 200);
      expect(browser.execute(() => window.scrollY)).not.equal(initScroll);
      initScroll = browser.execute(() => window.scrollY);
      itemDisplayed = await mainPage.getItemByName(itemSelector).isDisplayed();
    }



    await browser.waitUntil(
      async () => (await browser.$(itemSelector)).waitForDisplayed(),
      {
        timeout: 5000,
        timeoutMsg: `Item with name ${generatedName} was not found in the list`,
      }
    );

    const itemElement = await browser.$(itemSelector);
    const itemText = await itemElement.getText();

    expect(itemText).to.include(generatedName);



    const toastMessage = await browser.$('p[data-testid="toast-message"]');
    if (await toastMessage.isDisplayed()) {
      console.log("Waiting for toast message to disappear...");
      await browser.waitUntil(async () => !(await toastMessage.isDisplayed()), {
        timeout: 10000, // Увеличь время ожидания при необходимости
        timeoutMsg: "Toast message did not disappear before clicking",
      });
      console.log("Toast message disappeared");
    }
    //и еще должен тут же удалять такую штуку
    





    /*
    
    await Helpers.scrollAndSearch(browser, mainPage, itemSelector);
    await Helpers.waitForElementToBeVisible(browser, itemSelector);
    await Helpers.verifyElementTextContains(
      browser,
      itemSelector,
      generatedName
    );
*/


    const itemTitle = "Edit item - Name_1726483118993"; // Текст, который вы знаете
//    const buttonToClickXPath = '//button[@title="Options"]'; // XPath для кнопки, которую нужно нажать

    // XPath для поиска строки таблицы, содержащей кнопку с известным title
    const rowXPath = `//tr[td[3]//button[@title="${itemTitle}"]]`;

    // Находим родительский элемент <tr> по известной информации
    const rowElement = await browser.$(rowXPath);

    // Проверяем, что элемент найден и видим
    if (!(await rowElement.isDisplayed())) {
      console.log(
        `Row with button title "${itemTitle}" is not found or not displayed!!!!!`
      );
      throw new Error(`Row with button title "${itemTitle}" not found!!!!!!!`);
    }
    
    // XPath для кнопки, которую нужно нажать в найденной строке
    const buttonXPath = ".//td[5]//button"; // XPath для кнопки в той же строке, в колонке 5

    // Находим кнопку внутри найденной строки
    const buttonElement = await rowElement.$(buttonXPath);

    // Проверяем, что кнопка найдена и видима
    if (!(await buttonElement.isDisplayed())) {
      console.log("Button in the specified row is not found or not displayed.");
      throw new Error("Button in the specified row not found.");
    }

    // Кликаем по кнопке
    await buttonElement.click();
    await browser.pause(5000);

    // XPath для поиска элемента "Delete" в меню
    const deleteMenuItemXPath = `//span[text()='${deleteText}']`;

    // Ожидаем появления меню и находим элемент "Delete"
    const deleteMenuItem = await browser.$(deleteMenuItemXPath);

    // Проверяем, что элемент найден и видим
    if (!(await deleteMenuItem.isDisplayed())) {
      console.log(`Delete menu item is not found or not displayed.`);
      throw new Error(`Delete menu item not found.`);
    }

    // Кликаем по элементу "Delete"
    await deleteMenuItem.click();
    await browser.pause(5000);


    import { Browser } from 'webdriverio';
