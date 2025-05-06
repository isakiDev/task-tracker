import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';

import { TaskService } from './task.service.js';
import { STATUS_TYPE } from '../consts.js'

const taskServiceIntance = new TaskService()

const TASK_SERVICE_METHODS = {
  CREATE: (value) => taskServiceIntance.create(value),
  FINDALL: (value) => taskServiceIntance.findAll(value),
  DELETE: (taskId) => taskServiceIntance.delete(taskId),
  UPDATE: (value) => taskServiceIntance.update(value)
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
      }, (argv) => { TASK_SERVICE_METHODS.CREATE({ name: argv.name, status: STATUS_TYPE.TODO }) })
      .command('list [status]', 'List tasks by status ', (yargs) => {
        yargs.positional('status', {
          type: 'string',
          describe: 'the status task'
        })
      }, (argv) => console.log(TASK_SERVICE_METHODS.FINDALL({ status: argv.status })))
      .command('delete [id]', 'Delete task with id', (yargs) => {
        yargs.positional('id', {
          type: 'int',
          describe: 'the task id'
        })
      }, (argv) => TASK_SERVICE_METHODS.DELETE(argv.id))
      .command('update [id] [name]', 'Update task with id', (yargs) => {
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
      .command('mark-in-progress [id]', 'Mark in-progres status task with id', (yargs) => {
        yargs
          .positional('id', {
            type: 'int',
            describe: 'the task id',
          })
      }, ({ id }) => TASK_SERVICE_METHODS.UPDATE({ id, status: STATUS_TYPE.IN_PROGRESS }))
      .command('mark-done [id]', 'Mark done status task with id', (yargs) => {
        yargs
          .positional('id', {
            type: 'int',
            describe: 'the task id',
          })
      }, ({ id }) => TASK_SERVICE_METHODS.UPDATE({ id, status: STATUS_TYPE.DONE }))
      .help()
      .parse(hideBin(process.argv))
  }
}