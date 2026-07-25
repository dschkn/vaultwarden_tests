import Page from "./page.js";
import { clickWhenReady } from "../support/ui.js";

export type LoginItem = {
  name: string;
  username: string;
  password: string;
  uri: string;
  notes: string;
  totp?: string;
  customField?: {
    name: string;
    value: string;
  };
};

export type SecureNote = {
  name: string;
  notes: string;
};

class VaultPage extends Page {
  get newItemDropdown(): ChainablePromiseElement {
    return $("#newItemDropdown");
  }

  get newItemButton(): ChainablePromiseElement {
    return $('button[role="menuitem"]');
  }

  get itemType(): ChainablePromiseElement {
    return $("#type");
  }

  get nameInput(): ChainablePromiseElement {
    return $("#name");
  }

  get usernameInput(): ChainablePromiseElement {
    return $("#loginUsername");
  }

  get passwordInput(): ChainablePromiseElement {
    return $("#loginPassword");
  }

  get uriInput(): ChainablePromiseElement {
    return $("#loginUri0");
  }

  get notesInput(): ChainablePromiseElement {
    return $("#notes");
  }

  get totpInput(): ChainablePromiseElement {
    return $("#loginTotp");
  }

  get addCustomFieldLink(): ChainablePromiseElement {
    return $("#newField");
  }

  get customFieldNameInput(): ChainablePromiseElement {
    return $("#fieldName0");
  }

  get customFieldValueInput(): ChainablePromiseElement {
    return $("#fieldValue0");
  }

  get saveButton(): ChainablePromiseElement {
    return $('button[type="submit"]');
  }

  get cancelButton(): ChainablePromiseElement {
    return $('button[title="Cancel"]');
  }

  get toast(): ChainablePromiseElement {
    return $("#toast-container");
  }

  get searchInput(): ChainablePromiseElement {
    return $('input[placeholder*="Search"]');
  }

  itemByName(name: string): ChainablePromiseElement {
    return $(`button[title="Edit item - ${name}"]`);
  }

  async startNewItem(): Promise<void> {
    await clickWhenReady(this.newItemDropdown);
    await clickWhenReady(this.newItemButton);
    await this.nameInput.waitForDisplayed();
  }

  async createLoginItem(item: LoginItem): Promise<void> {
    await this.startNewItem();
    await this.nameInput.setValue(item.name);
    await this.usernameInput.setValue(item.username);
    await this.passwordInput.setValue(item.password);
    await this.uriInput.setValue(item.uri);
    await this.notesInput.setValue(item.notes);
    if (item.totp) {
      await this.totpInput.setValue(item.totp);
    }
    if (item.customField) {
      await clickWhenReady(this.addCustomFieldLink);
      await this.customFieldNameInput.setValue(item.customField.name);
      await this.customFieldValueInput.setValue(item.customField.value);
    }
    await clickWhenReady(this.saveButton);
  }

  async openItem(name: string): Promise<void> {
    await clickWhenReady(this.itemByName(name));
    await this.nameInput.waitForDisplayed();
  }

  async createSecureNote(note: SecureNote): Promise<void> {
    await this.startNewItem();
    await this.itemType.selectByVisibleText("Secure Note");
    await this.nameInput.setValue(note.name);
    await this.notesInput.setValue(note.notes);
    await clickWhenReady(this.saveButton);
  }

  async search(name: string): Promise<void> {
    await this.searchInput.waitForDisplayed();
    await this.searchInput.clearValue();
    await this.searchInput.setValue(name);
    await this.itemByName(name).waitForDisplayed();
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.clearValue();
  }

  async closeItem(): Promise<void> {
    if (await this.cancelButton.isExisting()) {
      await clickWhenReady(this.cancelButton);
    }
  }

  async deleteItem(name: string): Promise<void> {
    const row = $(`//tr[.//button[@title="Edit item - ${name}"]]`);
    const optionsButton = row.$('button[title="Options"]');
    await clickWhenReady(optionsButton);

    const deleteButton = $("span=Delete");
    await clickWhenReady(deleteButton);

    const confirmButton = $('button[type="submit"][buttontype="primary"]');
    await clickWhenReady(confirmButton);

    await browser.waitUntil(async () => !(await this.itemByName(name).isExisting()), {
      timeoutMsg: `Expected item "${name}" to disappear after deletion.`,
    });
  }
}

export default new VaultPage();
