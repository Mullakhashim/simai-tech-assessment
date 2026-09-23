import { Before, After } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { mkdirSync, rmSync } from "fs";
import { join } from "path";
import { CustomWorld } from "./world";
import { setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(180_000); // every step gets up to 3 minutes

import * as dotenv from "dotenv";
dotenv.config();

const ARTIFACT_DIR = join(process.cwd(), "test-results");
const VIDEO_DIR = join(ARTIFACT_DIR, "videos");

// Launch a fresh browser + context + page for every scenario. Tracing,
// video and screenshots are captured so we can keep artifacts on failure
// (assessment bonus: "tracing/video/screenshot capture on failure").
Before(async function (this: CustomWorld, scenario) {
  const scenarioVideoDir = join(VIDEO_DIR, scenario.testCaseStartedId);
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: scenarioVideoDir, size: { width: 1440, height: 900 } },
  });
  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
});

// Always tear down the browser. On failure we persist the screenshot and
// trace; on success we discard them (only keep artifacts for failures).
After(async function (this: CustomWorld, scenario) {
  const failed = scenario.result?.status === "FAILED";

  if (failed) {
    mkdirSync(ARTIFACT_DIR, { recursive: true });
    const stamp = Date.now();
    await this.page?.screenshot({
      path: join(ARTIFACT_DIR, `failure-${stamp}.png`),
      fullPage: true,
    });
    await this.context?.tracing.stop({
      path: join(ARTIFACT_DIR, `trace-${stamp}.zip`),
    });
  } else {
    await this.context?.tracing.stop(); // discard trace
  }

  // Closing the context finalizes the recorded video (if any).
  await this.context?.close();

  // Discard this scenario's video unless the scenario failed.
  if (!failed) {
    rmSync(join(VIDEO_DIR, scenario.testCaseStartedId), {
      recursive: true,
      force: true,
    });
  }
  await this.browser?.close();
});
