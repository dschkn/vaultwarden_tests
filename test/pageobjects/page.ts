export default class Page {
  async open() {
    await browser.url("https://vaulttest.ru.badhouseplants.net/#/login");
  }
  /*async waitForPageLoad() {
    await this.logo.waitForDisplayed({ timeout: 10000 });
    await this.createAccountButton.waitForDisplayed({ timeout: 10000 });
  }*/
  get navigationBar() {
    return $("svg[version='1.1']");
  }
}
