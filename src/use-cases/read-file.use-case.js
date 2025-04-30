import fs from 'fs'

export class ReadFileUseCase {
  static execute({ fileDestination = 'outputs', fileName }) {
    try {
      const fileContent = fs.readFileSync(`${fileDestination}/${fileName}`, 'utf8')

      return JSON.parse(fileContent)
    } catch (error) {
      if (error.code === 'ENOENT') return []
      return error
    }
  }
}