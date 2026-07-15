import { clickWhenReady } from "../support/ui.js";

class SendsPage {
  get sendsLink(): ChainablePromiseElement {
    return $('a[href="#/sends"]');
  }

  get newSendButton(): ChainablePromiseElement {
    return $("button[buttontype='primary']");
  }

  get nameInput(): ChainablePromiseElement {
    return $('input[formcontrolname="name"]');
  }

  get textType(): ChainablePromiseElement {
    return $('//label[normalize-space()="Text"]//input');
  }

  get textInput(): ChainablePromiseElement {
    return $("textarea#text");
  }

  get saveButton(): ChainablePromiseElement {
    return $("button[aria-label='Save']");
  }

  sendByName(name: string): ChainablePromiseElement {
    return $(`//button[normalize-space()="${name}"]`);
  }

  async createTextSend(name: string, text: string): Promise<void> {
    await clickWhenReady(this.sendsLink);
    await clickWhenReady(this.newSendButton);
    await this.nameInput.setValue(name);
    await clickWhenReady(this.textType);
    await this.textInput.setValue(text);
    await clickWhenReady(this.saveButton);
  }
}

export default new SendsPage();
