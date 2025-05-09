import fs from 'fs'

export class SaveFileUseCase {
  static execute({
    fileContent,
    fileDestination = 'outputs',
    fileName
  }) {
    try {
      fs.mkdirSync(fileDestination, { recursive: true })
      fs.writeFileSync(`${fileDestination}/${fileName}`, fileContent)
    } catch (error) {
      throw new Error('Cannot save file')
    }
  }
}