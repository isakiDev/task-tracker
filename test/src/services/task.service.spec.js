import { jest } from '@jest/globals';

import { TaskService } from '../../../src/services/task.service.js'

import { SaveFileUseCase } from "../../../src/use-cases/save-file.use-case.js"
import { ReadFileUseCase } from "../../../src/use-cases/read-file.use-case.js"

import { STATUS_TYPE } from '../../../src/consts.js'

import { tasks } from '../../mock/tasks.mock.js'

const taskService = new TaskService()

const { description, status } = tasks[0]

afterEach(() => {
  jest.restoreAllMocks()
  jest.clearAllMocks()
})

describe('TaskService', () => {
  describe('create', () => {
    test('should create a new task', () => {
      jest.spyOn(taskService, 'findAll').mockReturnValue([])
      jest.spyOn(SaveFileUseCase, 'execute').mockReturnValue()

      const result = taskService.create({ description, status })

      expect(result).toEqual(
        {
          msg: 'Task added successfully',
          data: {
            id: expect.any(Number),
            description: expect.any(String),
            status: STATUS_TYPE.TODO,
            createdAt: expect.any(Date)
          }
        }
      )
    })

    test('should return an error', () => {
      jest.spyOn(taskService, 'findAll').mockReturnValue([])
      jest.spyOn(SaveFileUseCase, 'execute').mockImplementation(() => { throw Error('Cannot save file') })

      expect(() => {
        taskService.create({ description, status })
      }).toThrow('Cannot save file')
    })
  })

  describe('findAll', () => {
    test('should return tasks list', () => {
      jest.spyOn(ReadFileUseCase, 'execute').mockReturnValue(tasks)

      const result = taskService.findAll({})

      expect(result).toEqual(tasks)
    })

    test('should return filtered tasks by status', () => {
      jest.spyOn(ReadFileUseCase, 'execute').mockReturnValue(tasks)
      jest.spyOn(taskService, 'validateStatusType').mockReturnValue()

      const { data } = taskService.findAll({ status: STATUS_TYPE.IN_PROGRESS })

      for (const task of data) {
        // expect(task).toEqual(expect.objectContaining({ status: STATUS_TYPE.IN_PROGRESS }))
        expect(task).toEqual({
          id: expect.any(Number),
          description: expect.any(String),
          status: STATUS_TYPE.IN_PROGRESS,
          createdAt: expect.any(String),
          ...(task?.updatedAt && { updatedAt: expect.any(String) })
        })
      }
    })

    test('should return an error', () => {
      jest.spyOn(ReadFileUseCase, 'execute').mockImplementation(() => { throw new Error() })

      expect(() => {
        taskService.findAll({ status: STATUS_TYPE.IN_PROGRESS })
      }).toThrow('Tasks were not found')

    })
  })

  describe('delete', () => {
    const taskId = 3

    test('should delete a task', () => {
      jest.spyOn(taskService, 'findOneById').mockReturnValue()
      jest.spyOn(taskService, 'findAll').mockReturnValue(tasks)
      jest.spyOn(SaveFileUseCase, 'execute').mockReturnValue()

      const { data, msg } = taskService.delete(taskId)

      const taskFound = tasks.filter(task => task.id !== taskId)

      expect(msg).toEqual(`Task with id ${taskId} has been deleted`)
      expect(data).toEqual(taskFound)
    })

    test('should return an error', () => {
      jest.spyOn(taskService, 'findOneById').mockReturnValue()
      jest.spyOn(taskService, 'findAll').mockReturnValue(tasks)

      jest.spyOn(SaveFileUseCase, 'execute').mockImplementation(() => { throw new Error() })

      expect(() => {
        taskService.delete(taskId)
      }).toThrow(`Task with id ${taskId} was not deleted`)
    })
  })

  describe('update', () => {
    const taskInput = {
      id: 4,
      description: 'Learn Rust',
      status: STATUS_TYPE.DONE
    }

    test('should update task', () => {
      jest.spyOn(taskService, 'findOneById').mockReturnValue(tasks[0])
      jest.spyOn(taskService, 'findAll').mockReturnValue(tasks)
      jest.spyOn(taskService, 'validateStatusType').mockReturnValue()
      jest.spyOn(SaveFileUseCase, 'execute').mockReturnValue()

      const { msg, data } = taskService.update(taskInput)

      expect(msg).toBe(`Task with id ${taskInput.id} has been updated`)
      expect(data).toEqual(expect.objectContaining({
        ...taskInput,
        createdAt: expect.any(String),
        updatedAt: expect.any(Date),
      }))
    })

    test('should return an error', () => {
      jest.spyOn(taskService, 'findOneById').mockReturnValue()
      jest.spyOn(taskService, 'findAll').mockReturnValue(tasks)
      jest.spyOn(taskService, 'validateStatusType').mockReturnValue()
      jest.spyOn(SaveFileUseCase, 'execute').mockImplementation(() => { throw new Error() })

      expect(() => {
        taskService.update(taskInput)
      }).toThrow(`Task with id ${taskInput.id} was not updated`)
    })
  })

  describe('findOneById', () => {
    const taskId = 4

    test('should find a task by id', () => {
      jest.spyOn(ReadFileUseCase, 'execute').mockReturnValue(tasks)

      const { data } = taskService.findOneById(taskId)

      const expectedTask = tasks.find(task => task.id === taskId)

      expect(data).toEqual(expectedTask)
    })

    test('should return an error', () => {
      jest.spyOn(ReadFileUseCase, 'execute').mockReturnValue(() => { throw new Error() })

      expect(() => {
        taskService.findOneById(taskId)
      }).toThrow(`Task with id ${taskId} was not found`)
    })
  })

  describe('validateStatusType', () => {
    test('should return an error if not pass the status', () => {
      expect(() => {
        taskService.validateStatusType()
      }).toThrow('You must pass the status value')
    })

    test('should return an error if status type is not allowed ', () => {
      expect(() => {
        taskService.validateStatusType('UNKNOWN STATUS')
      }).toThrow(`Status must be one of this values ${Object.values(STATUS_TYPE)}`)
    })
  })
})