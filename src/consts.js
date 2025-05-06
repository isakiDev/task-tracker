export const STATUS_TYPE = {
  IN_PROGRESS: 'IN_PROGRESS',
  TODO: 'TODO',
  DONE: 'DONE'
}

export const LOGIC_TEXT_COMMANDS = {
  CREATE: { command: 'add [description]', description: 'Create a new task' },
  LIST_ALL: { command: 'list', description: 'List all tasks' },
  LIST_BY_STATUS: { command: 'list [status]', description: 'List tasks filtered by status' },
  DELETE: { command: 'delete [id]', description: 'Delete task by ID' },
  UPDATE: { command: 'update [id] [description]', description: 'Update task description by ID' },
  MARK_IN_PROGRESS: { command: 'mark-in-progress [id]', description: 'Mark task as in progress by ID' },
  MARK_DONE: { command: 'mark-done [id]', description: 'Mark task as done by ID' }
}