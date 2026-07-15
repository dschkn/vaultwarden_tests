import { clickWhenReady } from "../support/ui.js";

class OrganizationPage {
  get createOrganizationLink(): ChainablePromiseElement {
    return $('a[href="#/create-organization"]');
  }

  get nameInput(): ChainablePromiseElement {
    return $('input[type="text"]');
  }

  get submitButton(): ChainablePromiseElement {
    return $('button[type="submit"]');
  }

  async create(name: string): Promise<void> {
    await clickWhenReady(this.createOrganizationLink);
    await this.nameInput.waitForDisplayed();
    await this.nameInput.setValue(name);
    await clickWhenReady(this.submitButton);
  }
}

export default new OrganizationPage();
