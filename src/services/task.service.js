import { SaveFileUseCase } from "../use-cases/save-file.use-case.js"
import { ReadFileUseCase } from "../use-cases/read-file.use-case.js"
import { STATUS_TYPE } from '../consts.js'

const fileName = 'tasks.json'

export class TaskService {
  create({ name, status }) {

    const tasksFound = this.findAll({})
    const taskId = tasksFound.length + 1

    const newTask = { id: taskId, name, status }

    tasksFound.push(newTask)

    SaveFileUseCase.execute({
      fileContent: JSON.stringify(tasksFound),
      fileName: 'tasks.json'
    })

    console.log('Task added successfully')
  }

  findAll({ status }) {
    const tasks = ReadFileUseCase.execute({ fileName: 'tasks.json' })

    if (!status) return tasks

    this.validateStatusType(status)

    const tasksFound = tasks.filter(({ status: statusTask }) => statusTask === status)

    return tasksFound
  }

  delete(taskId) {

    this.findOneById(taskId)

    const tasksFound = this.findAll({})
    const tasks = tasksFound.filter(({ id }) => id !== taskId)

    SaveFileUseCase.execute({ fileContent: JSON.stringify(tasks), fileName })

    console.log(`Task with id ${taskId} has been deleted`)
  }

  update({ id: taskId, name, status }) {

    this.findOneById(taskId)

    const tasksFound = this.findAll({})

    if (status) this.validateStatusType(status)

    const tasks = tasksFound.map((task) => {
      if (task.id !== taskId) return task

      return {
        ...task,
        name: name ?? task.name,
        status: status ?? task.status
      }
    })

    SaveFileUseCase.execute({ fileContent: JSON.stringify(tasks), fileName })

    console.log(`Task with id ${taskId} has been updated`)
  }

  findOneById(taskId) {
    const tasksFound = ReadFileUseCase.execute({ fileName })

    const task = tasksFound.find(({ id }) => id === taskId)

    if (!task) throw Error(`Task with id ${taskID} not found`)

    return task
  }

  validateStatusType(status) {

    if (!status) throw Error('You must pass the status value')

    if (!STATUS_TYPE[status]) throw new Error(`Status must be one of this values ${Object.values(STATUS_TYPE)}`)
  }
}