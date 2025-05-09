import { SaveFileUseCase } from "../use-cases/save-file.use-case.js"
import { ReadFileUseCase } from "../use-cases/read-file.use-case.js"

import { STATUS_TYPE } from '../consts.js'

const fileName = 'tasks.json'

export class TaskService {
  create({ description, status }) {
    try {
      const tasksFound = this.findAll({})
      const taskId = tasksFound.length + 1

      const createdAt = new Date()

      const newTask = { id: taskId, description, status, createdAt }

      tasksFound.push(newTask)

      SaveFileUseCase.execute({
        fileContent: JSON.stringify(tasksFound),
        fileName: 'tasks.json'
      })

      return {
        msg: 'Task added successfully',
        data: newTask
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  findAll({ status }) {
    try {
      const tasks = ReadFileUseCase.execute({ fileName: 'tasks.json' })

      if (!status) return tasks

      this.validateStatusType(status)

      const tasksFound = tasks.filter(({ status: statusTask }) => statusTask === status)

      return {
        data: tasksFound
      }
    } catch (error) {
      throw new Error('Tasks were not found')
    }
  }

  delete(taskId) {
    try {
      this.findOneById(taskId)

      const tasksFound = this.findAll({})
      const tasks = tasksFound.filter(({ id }) => id !== taskId)

      SaveFileUseCase.execute({ fileContent: JSON.stringify(tasks), fileName })

      return {
        msg: `Task with id ${taskId} has been deleted`,
        data: tasks
      }
    } catch (error) {
      throw new Error(`Task with id ${taskId} was not deleted`)
    }
  }

  update({ id: taskId, description, status }) {
    try {
      this.findOneById(taskId)

      const tasksFound = this.findAll({})

      if (status) this.validateStatusType(status)

      const taskToUpdateIndex = tasksFound.findIndex(task => task.id === taskId)

      const updatedAt = new Date()

      const tasks = [
        ...tasksFound.slice(0, taskToUpdateIndex),
        { ...tasksFound[taskToUpdateIndex], description, updatedAt, status },
        ...tasksFound.slice(taskToUpdateIndex + 1)
      ]

      SaveFileUseCase.execute({ fileContent: JSON.stringify(tasks), fileName })

      return {
        msg: `Task with id ${taskId} has been updated`,
        data: tasks[taskToUpdateIndex]
      }
    } catch (error) {
      throw new Error(`Task with id ${taskId} was not updated`)
    }
  }

  findOneById(taskId) {
    try {
      const tasksFound = ReadFileUseCase.execute({ fileName })

      const task = tasksFound.find(({ id }) => id === taskId)

      if (!task) throw Error(`Task with id ${taskId} was not found`)

      return {
        data: task
      }
    } catch (error) {
      throw new Error(`Task with id ${taskId} was not found`)
    }
  }

  validateStatusType(status) {

    if (!status) throw Error('You must pass the status value')

    if (!STATUS_TYPE[status]) throw new Error(`Status must be one of this values ${Object.values(STATUS_TYPE)}`)
  }
}