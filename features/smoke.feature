# =============================================================
# Smoke test: proves Cucumber + Playwright + the browser pipeline
# are wired up correctly (assessment step 5: "Verify the install").
#
# The live-session Salesforce scenarios (login -> App Launcher ->
# Contacts -> switch list view -> count contacts -> open contact ->
# read Email) will be added here during the assessment.
# =============================================================

#Feature: Contact Management

  #  Scenario: Verify the framework runs against a real browser
   #     Given I open the Playwright homepage
    #    Then the page title should contain "Playwright"

#   Scenario: Navigate to Salesforce Contacts and read a contact's email
#       Given I navigate to the Salesforce org
#       When I log in with my credentials
#       And I open the App Launcher
#       And I open the Contacts app
#      And I switch to the "All Contacts" list view
#      Then I should see at least 1 contact
#       When I open the contact named "ACTUAL_CONTACT_NAME"
#       Then I should see the email "test@example.com"