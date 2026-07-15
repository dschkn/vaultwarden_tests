import Page from "./page.js";
import { clickWhenReady } from "../support/ui.js";

export type LoginItem = {
  name: string;
  username: string;
  password: string;
  uri: string;
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

  get saveButton(): ChainablePromiseElement {
    return $('button[type="submit"]');
  }

  get toast(): ChainablePromiseElement {
    return $("#toast-container");
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
    await clickWhenReady(this.saveButton);
  }

  async openItem(name: string): Promise<void> {
    await clickWhenReady(this.itemByName(name));
    await this.nameInput.waitForDisplayed();
  }
}

export default new VaultPage();
