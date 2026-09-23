# Salesforce Automation Framework

Playwright + Cucumber (BDD) test automation for the Salesforce **Contacts**
assessment.

## Prerequisites

- [Node.js](https://nodejs.org/) LTS (includes `npm`) — verify with `node -v`
- [Git](https://git-scm.com/) — verify with `git --version`
- [VS Code](https://code.visualstudio.com/) with the
  **Playwright Test for VSCode** extension (recommended)

## Install dependencies

```bash
npm install
npx playwright install chromium
```

## Run the tests

```bash
npm test          # run all features via the Cucumber CLI
npm run test:feature   # run only features/contacts.feature
```

The smoke scenario in `features/contacts.feature` launches a real Chromium
browser through Cucumber hooks and asserts on the Playwright homepage — this
proves the pipeline (Gherkin → step definitions → World → hooks → browser)
is wired up correctly.

## Live-session flow

During the assessment, log in to the Salesforce org and automate:

1. Navigate to the org
2. Log in (username / password)
3. Open the **App Launcher** → **Contacts**
4. Switch the **list view**
5. **Count** the contacts shown
6. Open a **specific contact**
7. Read the **Email** field

The `pages/ContactsPage.ts` Page Object Model already exposes methods for each
of these steps. Salesforce selectors vary per org, so confirm the exact
selectors live and update the `// TODO(live)` markers.

### Environment variables

| Variable             | Purpose                                   |
| -------------------- | ----------------------------------------- |
| `SALESFORCE_BASE_URL`| Base URL of the Salesforce org            |

## Project structure

```
├── features/
│   ├── contacts.feature          # Gherkin scenarios
│   ├── step-definitions/
│   │   └── contacts.steps.ts     # Gherkin steps -> Playwright code
│   └── support/
│       ├── world.ts              # shared page/browser World instance
│       └── hooks.ts              # Before/After browser lifecycle hooks
├── pages/
│   └── ContactsPage.ts           # Page Object Model for Contacts
├── cucumber.json                 # Cucumber CLI configuration
├── tsconfig.json
└── package.json
```

## Useful commands

```bash
npm run typecheck   # TypeScript type-check (tsc --noEmit)
npm run lint        # ESLint
```
