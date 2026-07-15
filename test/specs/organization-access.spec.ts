import LoginPage from "../pageobjects/login.page.js";
import OrganizationPage from "../pageobjects/organization.page.js";
import VaultPage from "../pageobjects/vault.page.js";
import { getTestUser, uniqueName } from "../support/test-user.js";
import { expectToastToContain } from "../support/ui.js";

describe("Organization access", () => {
  before(async () => {
    const user = getTestUser();
    await LoginPage.login(user.email, user.password);
  });

  it("creates an organization", async () => {
    await OrganizationPage.create(uniqueName("organization"));
    await expectToastToContain(VaultPage.toast, "Organization created");
  });
});
