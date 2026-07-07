const {
  formatMoney,
  readBalance,
  writeBalance,
  creditBalance,
  debitBalance,
  processMenuChoice,
} = require('./index');

beforeEach(() => {
  writeBalance(1000.0);
});

describe('Accounting application business logic', () => {
  test('TC-01: View current account balance', () => {
    expect(formatMoney(readBalance())).toBe('1000.00');
  });

  test('TC-02: Credit account with a valid amount', () => {
    const newBalance = creditBalance(100.0);
    expect(newBalance).toBe(1100.0);
    expect(formatMoney(readBalance())).toBe('1100.00');
  });

  test('TC-03: Debit account with sufficient funds', () => {
    const result = debitBalance(250.0);
    expect(result.success).toBe(true);
    expect(result.newBalance).toBe(750.0);
    expect(formatMoney(readBalance())).toBe('750.00');
  });

  test('TC-04: Debit account with insufficient funds', () => {
    const result = debitBalance(1500.0);
    expect(result.success).toBe(false);
    expect(result.currentBalance).toBe(1000.0);
    expect(formatMoney(readBalance())).toBe('1000.00');
  });

  test('TC-05: Invalid menu choice handling', () => {
    const result = processMenuChoice('9');
    expect(result.action).toBe('INVALID');
    expect(result.continueFlag).toBe(true);
  });

  test('TC-06: Exit application menu choice', () => {
    const result = processMenuChoice('4');
    expect(result.action).toBe('EXIT');
    expect(result.continueFlag).toBe(false);
  });

  test('TC-07: Balance persistence during a single session', () => {
    creditBalance(50.0);
    expect(formatMoney(readBalance())).toBe('1050.00');
  });
});
