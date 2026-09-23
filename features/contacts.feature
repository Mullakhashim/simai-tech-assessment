# =============================================================
# Smoke test: proves Cucumber + Playwright + the browser pipeline
# are wired up correctly (assessment step 5: "Verify the install").
#
# The live-session Salesforce scenarios (login -> App Launcher ->
# Contacts -> switch list view -> count contacts -> open contact ->
# read Email) will be added here during the assessment.
# =============================================================

Feature: Contact Management

  Scenario: Verify the framework runs against a real browser
    Given I open the Playwright homepage
    Then the page title should contain "Playwright"
