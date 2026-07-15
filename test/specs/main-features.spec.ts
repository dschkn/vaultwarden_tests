import LoginPage from "../pageobjects/login.page.js";
import VaultPage from "../pageobjects/vault.page.js";
import { getTestUser, uniqueName } from "../support/test-user.js";
import { expectToastToContain } from "../support/ui.js";

describe("Vault items", () => {
  before(async () => {
    const user = getTestUser();
    await LoginPage.login(user.email, user.password);
  });

  it("creates and reads back a login item", async () => {
    const item = {
      name: uniqueName("login-item"),
      username: "qa-user",
      password: "ExamplePassword!42",
      uri: "https://example.test",
      notes: "Created by the end-to-end suite.",
    };

    await VaultPage.createLoginItem(item);
    await expectToastToContain(VaultPage.toast, "Item added");

    await VaultPage.openItem(item.name);
    await expect(VaultPage.nameInput).toHaveValue(item.name);
    await expect(VaultPage.usernameInput).toHaveValue(item.username);
    await expect(VaultPage.passwordInput).toHaveValue(item.password);
    await expect(VaultPage.uriInput).toHaveValue(item.uri);
    await expect(VaultPage.notesInput).toHaveValue(item.notes);
  });
});
