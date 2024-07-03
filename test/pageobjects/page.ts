export default class Page {
  async open() {
    await browser.url("https://vaulttest.badhouseplants.net/#/login");
  }
  /*async waitForPageLoad() {
    await this.logo.waitForDisplayed({ timeout: 10000 });
    await this.createAccountButton.waitForDisplayed({ timeout: 10000 });
  }*/
  get navigationBar() {
    return $("nav.navbar.navbar-expand.navbar-dark");
  }
}
