'use strict';

const readline = require('readline');
const employees = require('./lib/employees');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

function question(q) {
  return new Promise(resolve => rl.question(q, answer => resolve(answer)));
}

function printHeader() {
  console.log('Employee Management CLI');
  console.log('------------------------');
}

function printHelp() {
  console.log('Commands:');
  console.log('  add      - Add a new employee');
  console.log('  list     - List all employees');
  console.log('  remove   - Remove an employee by ID');
  console.log('  help     - Show this help');
  console.log('  exit     - Quit the app');
}

function printEmployees(list) {
  if (!list.length) {
    console.log('No employees found.');
    return;
  }
  console.log(`\nTotal: ${list.length}`);
  console.log('ID\tName');
  console.log('--\t----');
  for (const e of list) {
    console.log(`${e.id}\t${e.name}`);
  }
  console.log();
}

async function handleAdd() {
  const id = await question('Enter employee ID: ');
  const name = await question('Enter employee name: ');
  try {
    const emp = employees.addEmployee(id, name);
    console.log(`Added: [${emp.id}] ${emp.name}`);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

async function handleRemove() {
  const id = await question('Enter ID to remove: ');
  const removed = employees.removeEmployee(id);
  if (removed) {
    console.log(`Removed: [${removed.id}] ${removed.name}`);
  } else {
    console.log('No employee found with that ID.');
  }
}

async function mainLoop() {
  printHeader();
  printHelp();

  while (true) {
    const input = (await question('\n(add/list/remove/help/exit) > ')).trim().toLowerCase();
    switch (input) {
      case 'add':
        await handleAdd();
        break;
      case 'list':
        printEmployees(employees.getEmployees());
        break;
      case 'remove':
        await handleRemove();
        break;
      case 'help':
        printHelp();
        break;
      case 'exit':
      case 'quit':
        rl.close();
        return;
      default:
        console.log('Unknown command. Type "help" for options.');
        break;
    }
  }
}

rl.on('SIGINT', () => {
  // Handle Ctrl+C gracefully
  rl.close();
});

rl.on('close', () => {
  console.log('\nGoodbye!');
  process.exit(0);
});

mainLoop().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
