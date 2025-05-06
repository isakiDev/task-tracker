export const STATUS_TYPE = {
  IN_PROGRESS: 'IN_PROGRESS',
  TODO: 'TODO',
  DONE: 'DONE'
}

export const LOGIC_TEXT_COMMANDS = {
  LIST_BY_STATUS: { command: 'list [status]', description: 'List tasks by status' },
  DELETE: { command: 'delete [id]', description: 'Delete task with id' },
  UPDATE: { command: 'update [id] [name]', description: 'Update task with id' },
  MARK_IN_PROGRESS: { command: 'mark-in-progress [id]', description: 'Mark in-progres status task with id' },
  MARK_DONE: { command: 'mark-done [id]', description: 'Mark done status task with id' }
}