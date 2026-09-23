import { Page } from "@playwright/test";

/**
 * Page Object Model for the Salesforce Contacts flow covered by the
 * assessment:
 *
 *   navigate -> log in -> App Launcher -> Contacts -> switch list view
 *   -> count contacts -> open a specific contact -> read the Email field
 *
 * Salesforce selectors vary between orgs (Lightning vs. Classic, custom
 * Lightning layouts, etc.), so each method carries a TODO to confirm the
 * exact selector in the live org during the assessment.
 */
export class ContactsPage {
  constructor(private readonly page: Page) {}

  /** Org base URL. Set SALESFORCE_BASE_URL in the environment. */
  static baseUrl(): string {
    return (
      process.env.SALESFORCE_BASE_URL ??
      process.env.LOGIN_URL ??
      "https://lls.my.salesforce-sites.com/saml/StartSSO"
    );
  }

  async goto(): Promise<void> {
    await this.page.goto(ContactsPage.baseUrl(), {
      waitUntil: "domcontentloaded",
    });
  }

  async login(username: string, password: string): Promise<void> {
    await this.page
      .getByRole("textbox", { name: "Interpreter / Agent ID" })
      .fill(username);
    await this.page.getByRole("textbox", { name: "PIN" }).fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async openAppLauncher(): Promise<void> {
    // TODO(live): confirm the App Launcher ("waffle") selector.
    await this.page.pause(); // Pauses execution
    await this.page.getByRole("link", { name: "All Tabs" }).click();
  }

  async openContactsApp(): Promise<void> {
    // TODO(live): confirm app search + selection selectors.
    await this.page.getByRole("link", { name: "Contacts Contacts" }).click();
  }

  async switchListView(viewName: string): Promise<void> {
      await this.page.getByLabel("*View:").selectOption({ label: viewName });
  }

  async countContacts(): Promise<number> {
    const rows = this.page.locator(".x-grid3-row");
    return rows.count();
  }

  async openContact(fullName: string): Promise<void> {
    await this.page.getByRole("link", { name: fullName }).click();
  }

  async readEmail(): Promise<string> {
    const emailText = await this.page
      .locator('a[href^="mailto:"]')
      .first()
      .textContent();
    return emailText?.trim() ?? "";
  }
}
