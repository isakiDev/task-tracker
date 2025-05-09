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
      jest.spyOn(taskService, 'findAll').mockImplementation(() => [])
      jest.spyOn(SaveFileUseCase, 'execute').mockImplementation(() => undefined)

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

    test('should return unknown error', () => {
      jest.spyOn(taskService, 'findAll').mockImplementation(() => [])
      jest.spyOn(SaveFileUseCase, 'execute').mockImplementation(() => { throw Error('Cannot save file') })

      expect(() => {
        taskService.create({ description, status })
      }).toThrow('Cannot save file')
    })
  })

  describe('findAll', () => {
    test('should return tasks list', () => {
      jest.spyOn(ReadFileUseCase, 'execute').mockImplementation(() => tasks)

      const result = taskService.findAll({})

      expect(result).toEqual(tasks)
    })

    test('should return filtered tasks by status', () => {
      jest.spyOn(ReadFileUseCase, 'execute').mockImplementation(() => tasks)
      jest.spyOn(taskService, 'validateStatusType').mockImplementation(() => undefined)

      const result = taskService.findAll({ status: STATUS_TYPE.IN_PROGRESS })

      for (const task of result) {
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
  })
})