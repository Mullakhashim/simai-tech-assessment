import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
//import { ContactsPage } from "../../pages/ContactsPage";

// ---------------------------------------------------------------------
// Trivial smoke-test steps (assessment step 5: "Verify the install").
// The Salesforce Contacts steps are added here during the live session.
// ---------------------------------------------------------------------

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
