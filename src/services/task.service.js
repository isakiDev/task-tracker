import { SaveFileUseCase } from "../use-cases/save-file.use-case.js"
import { ReadFileUseCase } from "../use-cases/read-file.use-case.js"

const fileName = 'tasks.json'

export class TaskService {
  static create(name) {

    const tasksFound = this.findAll()
    const taskId = tasksFound.length + 1

    const newTask = { id: taskId, name, status: 'todo' }

    tasksFound.push(newTask)

    SaveFileUseCase.execute({
      fileContent: JSON.stringify(tasksFound),
      fileName: 'tasks.json'
    })

    console.log('Task added successfully')
  }

  static findAll() {
    const tasks = ReadFileUseCase.execute({ fileName: 'tasks.json' })
    return tasks
  }

  static delete(taskId) {

    this.findOneById(taskId)

    const tasksFound = this.findAll()
    const tasks = tasksFound.filter(({ id }) => id !== taskId)

    SaveFileUseCase.execute({ fileContent: JSON.stringify(tasks), fileName})

    console.log(`Task with id ${taskId} has been deleted`)
  }

  static update({ id: taskId, name }) {

    this.findOneById(taskId)

    const tasksFound = this.findAll()

    const tasks = tasksFound.map((task) => {
      if (task.id !== taskId) return task

      return {
        ...task,
        name: name ?? task.name,
      }
    })

    SaveFileUseCase.execute({ fileContent: JSON.stringify(tasks), fileName })

    console.log(`Task with id ${taskId} has been updated`)
  }

  static findOneById(taskId) {
    const tasksFound = ReadFileUseCase.execute({ fileName })

    const task = tasksFound.find(({ id }) => id === taskId)

    if (!task) throw Error(`Task with id ${taskID} not found`)

    return task
  }
}