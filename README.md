# 📝 Task Tracker CLI

A simple **Command Line Interface (CLI)** application to manage your to-do list and efficiently track tasks using a local JSON file for storage.

---

## ✨ Features

- ➕ Add, ✏️ update, and 🗑️ delete tasks  
- ✅ Mark tasks as **todo**, **in-progress**, or **done**  
- 📋 List all tasks or filter them by status  
- 💾 Stores tasks locally in a JSON file  

---

## 💻 Supported Commands

| Command                 | Description                      |
| ----------------------- | -------------------------------- |
| `add [description]`            | ➕ Create a new task              |
| `list`                  | 📋 List all tasks                 |
| `list [status]`         | 🔍 List tasks filtered by status (TODO - IN_PROGRESS - DONE) |
| `delete [id]`           | 🗑️ Delete task by ID              |
| `update [id] [description]`    | ✏️ Update task description by ID         |
| `mark-in-progress [id]` | 🚧 Mark task as in progress by ID |
| `mark-done [id]`        | ✅ Mark task as done by ID        |

---

## 📦 Libraries

- 🧰 **[Yargs](https://www.npmjs.com/package/yargs)** – for command line parsing
- 🐞 **[Jest](https://www.npmjs.com/package/jest)** - for testing
---

## 💡 Tips

- Use `npm run dev -- --help` to see all available commands
- Run test `npm run test`

---

## 🚀 Getting Started

### 🧠 Idea

Inspired by: [Task Tracker Project on roadmap.sh](https://roadmap.sh/projects/task-tracker)

### 🛠️ Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/isakiDev/task-tracker
   cd task-tracker
2. Run CLI
    ```npm run dev <command>```