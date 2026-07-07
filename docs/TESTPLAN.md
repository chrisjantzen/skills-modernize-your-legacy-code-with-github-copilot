# COBOL App Test Plan

This test plan covers the current business logic implemented in the COBOL account management application. It is designed to validate the existing behavior before migrating the application to Node.js.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|---|---|---|---|---|---|---|---|
| TC-01 | View current account balance | Application is running and initial balance is set to 1000.00 | 1. Start the application
2. Select option 1 to view balance | The application reads the current balance and displays `Current balance: 1000.00` |  |  |  |
| TC-02 | Credit account with a valid amount | Application is running and current balance is 1000.00 | 1. Start the application
2. Select option 2 to credit account
3. Enter `100.00` | The application reads the current balance, adds 100.00, writes the updated balance, and displays `Amount credited. New balance: 1100.00` |  |  |  |
| TC-03 | Debit account with sufficient funds | Application is running and current balance is 1000.00 | 1. Start the application
2. Select option 3 to debit account
3. Enter `250.00` | The application reads the current balance, subtracts 250.00, writes the updated balance, and displays `Amount debited. New balance: 750.00` |  |  |  |
| TC-04 | Debit account with insufficient funds | Application is running and current balance is 1000.00 | 1. Start the application
2. Select option 3 to debit account
3. Enter `1500.00` | The application reads the current balance and displays `Insufficient funds for this debit.` without changing the balance |  |  |  |
| TC-05 | Invalid menu choice handling | Application is running | 1. Start the application
2. Enter `9` or another value outside 1-4 | The application displays `Invalid choice, please select 1-4.` and returns to the menu |  |  |  |
| TC-06 | Exit application | Application is running | 1. Start the application
2. Select option 4 | The application stops executing and displays `Exiting the program. Goodbye!` |  |  |  |
| TC-07 | Balance persistence during a single session | Application is running and current balance is 1000.00 | 1. Select option 2 to credit 50.00
2. Select option 1 to view balance | The application should retain the updated balance and display `Current balance: 1050.00` within the same session |  |  |  |

## Notes

- The current COBOL implementation uses in-memory storage for balance within the running program. It does not persist balance changes across separate executions of the application.
- For Node.js migration, the same business logic should be preserved: initial balance, credit, debit, insufficient funds validation, invalid menu handling, and session balance updates.
