export default abstract class Page {
  async open(path: string): Promise<void> {
    await browser.url(path);
  }
}
