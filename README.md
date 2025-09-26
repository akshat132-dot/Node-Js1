# Employee Management CLI (Node.js + Arrays)

Simple interactive CLI that manages an in-memory list of employees using Node's built-in `readline` module. No files or databases — data lives only for the session.

## Features

- Add employee (ID + Name) with validation and duplicate ID check
- List all employees in memory
- Remove employee by ID
- Interactive prompt with simple commands

## Requirements

- Node.js 14+ (any modern Node works)

## Run

In PowerShell from this folder:

```powershell
npm start
```

Then use commands:

- `add` → prompts for ID and Name
- `list` → shows all employees
- `remove` → prompts for ID to remove
- `help` → prints help
- `exit` → quits

## Quick sanity test (optional)

```powershell
npm run test:quick
```

You should see output similar to:

```
Count 2
AfterRemove 2
```

## Notes

- All data is stored in RAM and resets when the process exits.
- IDs are compared as exact strings; leading/trailing spaces are trimmed.
#
