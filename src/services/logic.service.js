import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';

import { TaskService } from './task.service.js';

const TASK_SERVICE_METHODS = {
  CREATE: (value) => TaskService.create(value),
  FINDALL: () => TaskService.findAll(),
  DELETE: (taskId) => TaskService.delete(taskId),
  UPDATE: (value) => TaskService.update(value)
}

export class LogicService {
  static init() {
    yargs()
      .scriptName("task-cli")
      .usage('$0 <cmd> [args]')
      .command('add [name]', 'Create a new task', (yargs) => {
        yargs.positional('name', {
          type: 'string',
          describe: 'the task name'
        })
      }, (argv) => { TASK_SERVICE_METHODS.CREATE(argv.name) })
      .command('list', 'List all tasks', () => { }, (argv) => {
        console.log(TASK_SERVICE_METHODS.FINDALL())
      })
      .command('delete [id]', 'Delete task with id', (yargs) => {
        yargs.positional('id', {
          type: 'int',
          describe: 'the task id'
        })
      }, (argv) => TASK_SERVICE_METHODS.DELETE(argv.id))
      .command('update [id] [name]', 'Delete task with id', (yargs) => {
        yargs
          .positional('id', {
            type: 'int',
            describe: 'the task id',
          })
          .positional('name', {
            type: 'string',
            describe: 'the task name'
          })

      }, ({ id, name }) => TASK_SERVICE_METHODS.UPDATE({ id, name }))
      .help()
      .parse(hideBin(process.argv))
  }
}