import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "playwright";

/**
 * Custom World that holds the shared Playwright browser / context / page
 * instances across all steps within a single scenario.
 *
 * Per the assessment spec, support/world.ts owns the shared page/browser,
 * and support/hooks.ts launches/closes them around each scenario.
 */
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
