import { jest } from '@jest/globals';

import fs from 'fs'

import { ReadFileUseCase } from '../../../src/use-cases/read-file.use-case.js'

import { tasks } from '../../mock/tasks.mock.js'
import { fileDestination, fileName } from '../../mock/file-information.mock.js'


afterEach(() => {
  jest.clearAllMocks()
})

describe('ReadFileUseCase', () => {
  test('should read file content', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify(tasks))

    const result = ReadFileUseCase.execute({ fileName, fileDestination })

    expect(fs.readFileSync).toHaveBeenCalledWith('src/outputs/task.json', 'utf8')
    expect(result).toEqual(tasks)
  });

  test('should return empty array if file does not exist (ENOENT)', () => {
    const error = new Error('File not found')
    error.code = 'ENOENT'

    jest.spyOn(fs, 'readFileSync').mockImplementation(() => { throw error })

    const result = ReadFileUseCase.execute({ fileName, fileDestination })

    expect(fs.readFileSync).toHaveBeenCalledWith('src/outputs/task.json', 'utf8')
    expect(result).toEqual([])
  });

  test('should return the error object for unknow errors', () => {
    const error = new Error('Unknown error')

    jest.spyOn(fs, 'readFileSync').mockImplementation(() => { throw error })

    const result = ReadFileUseCase.execute({ fileName, fileDestination })

    expect(fs.readFileSync).toHaveBeenCalledWith(`${fileDestination}/${fileName}`, 'utf8')
    expect(result).toEqual(error)
  });
});