import LoginPage from "../pageobjects/login.page.js";
import VaultPage from "../pageobjects/vault.page.js";
import { getTestUser, uniqueName } from "../support/test-user.js";
import { expectToastToContain } from "../support/ui.js";

describe("Vault item lifecycle", () => {
  before(async () => {
    const user = getTestUser();
    await LoginPage.login(user.email, user.password);
  });

  it("creates, searches, reads, and deletes a secure note", async () => {
    const note = {
      name: uniqueName("secure-note"),
      notes: "Disposable data created by the automated test suite.",
    };

    try {
      await VaultPage.createSecureNote(note);
      await expectToastToContain(VaultPage.toast, "Item added");

      await VaultPage.search(note.name);
      await VaultPage.openItem(note.name);
      await expect(VaultPage.nameInput).toHaveValue(note.name);
      await expect(VaultPage.notesInput).toHaveValue(note.notes);
    } finally {
      await VaultPage.closeItem();
      await VaultPage.clearSearch();
      if (await VaultPage.itemByName(note.name).isExisting()) {
        await VaultPage.deleteItem(note.name);
        await expectToastToContain(VaultPage.toast, "Item deleted");
      }
    }
  });
});
