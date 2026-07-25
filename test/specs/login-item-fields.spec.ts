import LoginPage from "../pageobjects/login.page.js";
import VaultPage from "../pageobjects/vault.page.js";
import { getTestUser, uniqueName } from "../support/test-user.js";
import { expectToastToContain } from "../support/ui.js";

describe("Login item fields", () => {
  before(async () => {
    const user = getTestUser();
    await LoginPage.login(user.email, user.password);
  });

  it("persists a one-time-password secret and a custom field", async () => {
    const item = {
      name: uniqueName("advanced-login-item"),
      username: "qa-user",
      password: "ExamplePassword!42",
      uri: "https://example.test",
      notes: "Advanced field coverage.",
      totp: "JBSWY3DPEHPK3PXP",
      customField: {
        name: "Environment",
        value: "test",
      },
    };

    try {
      await VaultPage.createLoginItem(item);
      await expectToastToContain(VaultPage.toast, "Item added");

      await VaultPage.openItem(item.name);
      await expect(VaultPage.totpInput).toHaveValue(item.totp);
      await expect(VaultPage.customFieldNameInput).toHaveValue(item.customField.name);
      await expect(VaultPage.customFieldValueInput).toHaveValue(item.customField.value);
    } finally {
      await VaultPage.closeItem();
      if (await VaultPage.itemByName(item.name).isExisting()) {
        await VaultPage.deleteItem(item.name);
        await expectToastToContain(VaultPage.toast, "Item deleted");
      }
    }
  });
});
