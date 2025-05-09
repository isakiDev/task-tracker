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
        (argv) => {
          const { data } = this.taskService.findAll({ status: argv.status })
          console.table(data)
        })
      .command(LIST_BY_STATUS.command, LIST_BY_STATUS.description, (yargs) => {
        yargs.positional('status', {
          type: 'string',
          describe: 'the status task'
        })
      }, (argv) => {
        const { data } = this.taskService.findAll({ status: argv.status })
        console.table(data)
      })
      .command(DELETE.command, DELETE.description, (yargs) => {
        yargs.positional('id', {
          type: 'int',
          describe: 'the task id'
        })
      }, (argv) => {
        const { msg } = this.taskService.delete(argv.id)
        console.log(msg)
      })
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

      }, ({ id, description }) => {
        const { msg } = this.taskService.update({ id, description })
        console.log(msg)
      })
      .command(MARK_IN_PROGRESS.command, MARK_IN_PROGRESS.description, (yargs) => {
        yargs
          .positional('id', {
            type: 'int',
            describe: 'the task id',
          })
      }, ({ id }) => {
        const { msg } = this.taskService.update({ id, status: STATUS_TYPE.IN_PROGRESS })
        console.log(msg)
      })
      .command(MARK_DONE.command, MARK_DONE.description, (yargs) => {
        yargs
          .positional('id', {
            type: 'int',
            describe: 'the task id',
          })
      }, ({ id }) => {
        const { msg } = this.taskService.update({ id, status: STATUS_TYPE.DONE })
        console.log(msg)
      })
      .help()
      .parse(hideBin(process.argv))
  }
}