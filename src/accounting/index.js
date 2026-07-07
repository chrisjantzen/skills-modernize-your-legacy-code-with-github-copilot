const readline = require('readline');

let rl;
let balance = 1000.0;

function formatMoney(amount) {
  return amount.toFixed(2);
}

function readBalance() {
  return balance;
}

function writeBalance(newBalance) {
  balance = newBalance;
}

function creditBalance(amount) {
  const currentBalance = readBalance();
  const newBalance = currentBalance + amount;
  writeBalance(newBalance);
  return newBalance;
}

function debitBalance(amount) {
  const currentBalance = readBalance();
  if (currentBalance >= amount) {
    const newBalance = currentBalance - amount;
    writeBalance(newBalance);
    return { success: true, newBalance };
  }
  return { success: false, currentBalance };
}

function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function askAmount(type) {
  const input = await prompt(`Enter ${type} amount: `);
  const amount = parseFloat(input);

  if (Number.isNaN(amount) || amount < 0) {
    console.log('Invalid amount. Please enter a non-negative numeric value.');
    return null;
  }

  return amount;
}

function processMenuChoice(choice) {
  switch (choice.trim()) {
    case '1':
      return { continueFlag: true, action: 'TOTAL' };
    case '2':
      return { continueFlag: true, action: 'CREDIT' };
    case '3':
      return { continueFlag: true, action: 'DEBIT' };
    case '4':
      return { continueFlag: false, action: 'EXIT' };
    default:
      return { continueFlag: true, action: 'INVALID' };
  }
}

async function handleTotal() {
  const currentBalance = readBalance();
  console.log(`Current balance: ${formatMoney(currentBalance)}`);
}

async function handleCredit() {
  const amount = await askAmount('credit');
  if (amount === null) {
    return;
  }

  const newBalance = creditBalance(amount);
  console.log(`Amount credited. New balance: ${formatMoney(newBalance)}`);
}

async function handleDebit() {
  const amount = await askAmount('debit');
  if (amount === null) {
    return;
  }

  const result = debitBalance(amount);
  if (result.success) {
    console.log(`Amount debited. New balance: ${formatMoney(result.newBalance)}`);
  } else {
    console.log('Insufficient funds for this debit.');
  }
}

async function main() {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let continueFlag = true;

  while (continueFlag) {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');

    const choice = await prompt('Enter your choice (1-4): ');
    const { continueFlag: nextFlag, action } = processMenuChoice(choice);

    switch (action) {
      case 'TOTAL':
        await handleTotal();
        break;
      case 'CREDIT':
        await handleCredit();
        break;
      case 'DEBIT':
        await handleDebit();
        break;
      case 'INVALID':
        console.log('Invalid choice, please select 1-4.');
        break;
      case 'EXIT':
        break;
      default:
        break;
    }

    continueFlag = nextFlag;
  }

  console.log('Exiting the program. Goodbye!');
  rl.close();
}

module.exports = {
  formatMoney,
  readBalance,
  writeBalance,
  creditBalance,
  debitBalance,
  processMenuChoice,
};

if (require.main === module) {
  main();
}
