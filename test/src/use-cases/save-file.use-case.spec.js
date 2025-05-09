import { jest } from '@jest/globals';

import fs from 'fs'

import { SaveFileUseCase } from '../../../src/use-cases/save-file.use-case.js'
import { fileDestination, fileName } from '../../mock/file-information.mock.js'

const fileContent = 'Binary file'

afterEach(() => {
  jest.clearAllMocks()
})

describe('SaveFileUseCase', () => {
  describe('execute', () => {
    test('should save file', () => {
      jest.spyOn(fs, 'mkdirSync').mockReturnValue()
      jest.spyOn(fs, 'writeFileSync').mockReturnValue()

      const result = SaveFileUseCase.execute({ fileContent, fileDestination, fileName })

      expect(fs.mkdirSync).toHaveBeenCalledWith(fileDestination, { recursive: true })
      expect(fs.writeFileSync).toHaveBeenCalledWith(`${fileDestination}/${fileName}`, fileContent)
      expect(result).toBe(undefined)
    })
  
    test('should return an error', () => {
      jest.spyOn(fs, 'mkdirSync').mockReturnValue()
      jest.spyOn(fs, 'writeFileSync').mockImplementation(() => { throw new Error() })

      expect(() => {
        SaveFileUseCase.execute({ fileContent, fileDestination, fileName })
      }).toThrow('The file was not saved')

      expect(fs.mkdirSync).toHaveBeenCalledWith(fileDestination, { recursive: true })
      expect(fs.writeFileSync).toHaveBeenCalledWith(`${fileDestination}/${fileName}`, fileContent)
    })
  })
})