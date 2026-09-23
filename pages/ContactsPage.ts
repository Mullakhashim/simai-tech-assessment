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
      "https://salesforce.com"
    );
  }

  async goto(): Promise<void> {
    await this.page.goto(ContactsPage.baseUrl(), {
      waitUntil: "domcontentloaded",
    });
  }

  async login(username: string, password: string): Promise<void> {
    await this.page
      .getByRole("textbox", { name: "Username" })
      .fill(username);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}