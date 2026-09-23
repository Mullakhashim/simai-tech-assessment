/**
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { ContactsPage } from "../../pages/ContactsPage";
*/
// ---------------------------------------------------------------------
// Trivial smoke-test steps (assessment step 5: "Verify the install").
// The Salesforce Contacts steps are added here during the live session.
// ---------------------------------------------------------------------
/**
Given("I open the Playwright homepage", async function (this: CustomWorld) {
  await this.page.goto("https://playwright.dev/", {
    waitUntil: "domcontentloaded",
  });
});

Then(
  "the page title should contain {string}",
  async function (this: CustomWorld, expected: string) {
    await expect(this.page).toHaveTitle(new RegExp(expected));
  },
);

Given("I navigate to the Salesforce org", async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  const contactsPage = new ContactsPage(this.page);
  await contactsPage.goto();
});

When("I log in with my credentials", async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions

  const contactsPage = new ContactsPage(this.page);
  const username = process.env.SALESFORCE_USERNAME || "";
  const password = process.env.SALESFORCE_PASSWORD || "";

  await contactsPage.login(username, password);
 // await this.page.waitForTimeout(120_000);
  // await this.page.pause(); // Pauses execution
});

When("I open the App Launcher", async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  const contactsPage = new ContactsPage(this.page);
  await contactsPage.openAppLauncher();
});

When("I open the Contacts app", async function (this: CustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  const contactsPage = new ContactsPage(this.page);
  await contactsPage.openContactsApp();
});

When(
  "I switch to the {string} list view",
  async function (this: CustomWorld, viewName: string) {
    // Write code here that turns the phrase above into concrete actions
    const contactsPage = new ContactsPage(this.page);
    await contactsPage.switchListView(viewName);
  },
);

Then(
  "I should see at least {int} contact",
  async function (this: CustomWorld, expectedCount: number) {
    // Write code here that turns the phrase above into concrete actions
    const contactsPage = new ContactsPage(this.page);
    const count = await contactsPage.countContacts();
    expect(count).toBeGreaterThanOrEqual(expectedCount);
  },
);

When(
  "I open the contact named {string}",
  async function (this: CustomWorld, contactName: string) {
    // Write code here that turns the phrase above into concrete actions
    const contactsPage = new ContactsPage(this.page);
    await contactsPage.openContact(contactName);
  },
);

Then(
  "I should see the email {string}",
  async function (this: CustomWorld, expectedEmail: string) {
    // Write code here that turns the phrase above into concrete actions
    const contactsPage = new ContactsPage(this.page);
    const actualEmail = await contactsPage.readEmail();
    expect(actualEmail).toBe(expectedEmail);
  },
);
*/