export async function expectToastToContain(
  toast: ChainablePromiseElement,
  expectedText: string,
): Promise<void> {
  await toast.waitForDisplayed();
  await browser.waitUntil(async () => (await toast.getText()).includes(expectedText), {
    timeoutMsg: `Expected toast to contain: ${expectedText}`,
  });
}

export async function clickWhenReady(element: ChainablePromiseElement): Promise<void> {
  await element.waitForClickable();
  await element.click();
}
