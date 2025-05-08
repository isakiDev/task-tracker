import { jest } from '@jest/globals';

import { ReadFileUseCase } from '../../use-cases/read-file.use-case.js'

import fs from 'fs'

const mockJsonTasks = [
  { "id": 1, "description": "Learn TS", "status": "TODO", "createdAt": "2025-05-08T03:51:08.408Z" },
  { "id": 2, "description": "Learn VIM", "status": "TODO", "createdAt": "2025-05-08T03:51:12.129Z" },
  { "id": 3, "description": "Learn CSS", "status": "TODO", "createdAt": "2025-05-08T03:51:14.608Z" }
]

describe('ReadFileUseCase', () => {
  test('should read file content', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify(mockJsonTasks))

    const result = ReadFileUseCase.execute(
      {
        fileName: 'task.json',
        fileDestination: 'src/outputs'
      }
    )


    expect(fs.readFileSync).toHaveBeenCalledWith('src/outputs/task.json', 'utf8')
    expect(result).toEqual(mockJsonTasks)
  });
});