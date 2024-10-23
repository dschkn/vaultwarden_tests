export default class Page {
  async open() {
    await browser.url("https://vaulttest.badhouseplants.net/#/login");
  }
  get navigationBar() {
    return $("nav.navbar.navbar-expand.navbar-dark");
  }
  get headerTitle() {
    return $('h1[bittypography="h1"][nomargin][class*="tw-m-0"][class*="tw-mr-2"][class*="tw-truncate"][class*="tw-leading-10"][class*="tw-font-semibold"][class*="tw-text-3xl"]');
  }
}
  
