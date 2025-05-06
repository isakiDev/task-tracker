import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';

import { TaskService } from './task.service.js';

import { STATUS_TYPE, LOGIC_TEXT_COMMANDS } from '../consts.js'

const taskServiceIntance = new TaskService()

const TASK_SERVICE_METHODS = {
  CREATE: (value) => taskServiceIntance.create(value),
  FINDALL: (value) => taskServiceIntance.findAll(value),
  DELETE: (taskId) => taskServiceIntance.delete(taskId),
  UPDATE: (value) => taskServiceIntance.update(value)
}

const { DELETE, LIST_BY_STATUS, MARK_DONE, MARK_IN_PROGRESS, UPDATE } = LOGIC_TEXT_COMMANDS

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
      .command(LIST_BY_STATUS.command, LIST_BY_STATUS.description, (yargs) => {
        yargs.positional('status', {
          type: 'string',
          describe: 'the status task'
        })
      }, (argv) => console.log(TASK_SERVICE_METHODS.FINDALL({ status: argv.status })))
      .command(DELETE.command, DELETE.description, (yargs) => {
        yargs.positional('id', {
          type: 'int',
          describe: 'the task id'
        })
      }, (argv) => TASK_SERVICE_METHODS.DELETE(argv.id))
      .command(UPDATE.command, UPDATE.description, (yargs) => {
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
      .command(MARK_IN_PROGRESS.command, MARK_IN_PROGRESS.description, (yargs) => {
        yargs
          .positional('id', {
            type: 'int',
            describe: 'the task id',
          })
      }, ({ id }) => TASK_SERVICE_METHODS.UPDATE({ id, status: STATUS_TYPE.IN_PROGRESS }))
      .command(MARK_DONE.command, MARK_DONE.description, (yargs) => {
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