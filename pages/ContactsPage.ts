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

  /** Org base URL. Set SALESFORCE_BASE_URL in your environment. */
  static baseUrl(): string {
    return (
      process.env.SALESFORCE_BASE_URL ??
      process.env.LOGIN_URL ??
      "https://login.salesforce.com"
    );
  }

  async goto(): Promise<void> {
    await this.page.goto(ContactsPage.baseUrl(), { waitUntil: "domcontentloaded" });
  }

  async login(username: string, password: string): Promise<void> {
    // TODO(live): confirm selectors on the Salesforce login page.
    await this.page.fill("#username", username);
    await this.page.fill("#password", password);
    await this.page.click("#Login");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async openAppLauncher(): Promise<void> {
    // TODO(live): confirm the App Launcher ("waffle") selector.
    await this.page.click(".slds-icon-waffle");
  }

  async openContactsApp(): Promise<void> {
    // TODO(live): confirm app search + selection selectors.
    await this.page.fill('input[placeholder*="Search apps"]', "Contacts");
    await this.page.keyboard.press("Enter");
  }

  async switchListView(viewName: string): Promise<void> {
    // TODO(live): confirm the list-view dropdown + option selectors.
    await this.page.getByRole("button", { name: "List View" }).click();
    await this.page.getByText(viewName, { exact: true }).click();
  }

  async countContacts(): Promise<number> {
    // TODO(live): confirm the row/table selector used to count contacts.
    const rows = this.page.locator('table tbody tr[data-aura-class^="uiVirtualDataTable"]');
    return rows.count();
  }

  async openContact(fullName: string): Promise<void> {
    // TODO(live): confirm how contact rows link to the record detail page.
    await this.page.getByRole("link", { name: fullName }).click();
  }

  async readEmail(): Promise<string> {
    // TODO(live): confirm the Email field selector on the record detail page.
    return (await this.page.locator('a[href^="mailto:"]').first().getAttribute("href"))?.replace(/^mailto:/, "") ?? "";
  }
}
