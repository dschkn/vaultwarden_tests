export default class Page {
  async open() {
    await browser.url("https://vaulttest.badhouseplants.net/#/login");
  }
  /*async waitForPageLoad() {
    await this.logo.waitForDisplayed({ timeout: 10000 });
    await this.createAccountButton.waitForDisplayed({ timeout: 10000 });
  }*/
  get sidebarNavigation() {
    return $("aside.tw-sticky.tw-inset-y-0.tw-h-screen.tw-w-60.tw-overflow-auto.tw-bg-background-alt3 > nav[slot='sidebar']");
}

  
}
