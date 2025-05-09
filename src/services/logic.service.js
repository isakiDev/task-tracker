import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';

import { STATUS_TYPE, LOGIC_TEXT_COMMANDS } from '../consts.js'

const { CREATE, DELETE, LIST_BY_STATUS, MARK_DONE, MARK_IN_PROGRESS, UPDATE, LIST_ALL } = LOGIC_TEXT_COMMANDS

export class LogicService {
  constructor(taskService) {
    this.taskService = taskService
  }

  init() {
    yargs()
      .scriptName("task-cli")
      .usage('$0 <cmd> [args]')
      .command(CREATE.command, CREATE.description, (yargs) => {
        yargs.positional('description', {
          type: 'string',
          describe: 'the task description'
        })
      }, (argv) => {
        const { msg } = this.taskService.create({ description: argv.description, status: STATUS_TYPE.TODO })
        console.log(msg)
      })
      .command(LIST_ALL.command, LIST_ALL.description,
        (argv) => console.log(this.taskService.findAll({ status: argv.status })))
      .command(LIST_BY_STATUS.command, LIST_BY_STATUS.description, (yargs) => {
        yargs.positional('status', {
          type: 'string',
          describe: 'the status task'
        })
      }, (argv) => console.log(this.taskService.findAll({ status: argv.status })))
      .command(DELETE.command, DELETE.description, (yargs) => {
        yargs.positional('id', {
          type: 'int',
          describe: 'the task id'
        })
      }, (argv) => this.taskService.delete(argv.id))
      .command(UPDATE.command, UPDATE.description, (yargs) => {
        yargs
          .positional('id', {
            type: 'int',
            describe: 'the task id',
          })
          .positional('description', {
            type: 'string',
            describe: 'the task description'
          })

      }, ({ id, description }) => this.taskService.update({ id, description }))
      .command(MARK_IN_PROGRESS.command, MARK_IN_PROGRESS.description, (yargs) => {
        yargs
          .positional('id', {
            type: 'int',
            describe: 'the task id',
          })
      }, ({ id }) => this.taskService.update({ id, status: STATUS_TYPE.IN_PROGRESS }))
      .command(MARK_DONE.command, MARK_DONE.description, (yargs) => {
        yargs
          .positional('id', {
            type: 'int',
            describe: 'the task id',
          })
      }, ({ id }) => this.taskService.update({ id, status: STATUS_TYPE.DONE }))
      .help()
      .parse(hideBin(process.argv))
  }
}