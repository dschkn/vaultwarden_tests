import LoginPage from "../pageobjects/login.page.js";
import SendsPage from "../pageobjects/sends.page.js";
import VaultPage from "../pageobjects/vault.page.js";
import { getTestUser, uniqueName } from "../support/test-user.js";
import { expectToastToContain } from "../support/ui.js";

describe("Sends", () => {
  before(async () => {
    const user = getTestUser();
    await LoginPage.login(user.email, user.password);
  });

  it("creates and opens a text send", async () => {
    const name = uniqueName("text-send");
    const text = "A disposable text send created by the end-to-end suite.";

    await SendsPage.createTextSend(name, text);
    await expectToastToContain(VaultPage.toast, "Send saved");

    await SendsPage.sendByName(name).waitForDisplayed();
    await SendsPage.sendByName(name).click();
    await expect(SendsPage.nameInput).toHaveValue(name);
    await expect(SendsPage.textInput).toHaveValue(text);
  });
});
