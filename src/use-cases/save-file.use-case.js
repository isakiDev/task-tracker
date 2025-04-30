import fs from 'fs'

export class SaveFileUseCase {
  static execute({
    fileContent,
    fileDestination = 'outputs',
    fileName
  }) {
    fs.mkdirSync(fileDestination, { recursive: true })
    fs.writeFileSync(`${fileDestination}/${fileName}`, fileContent)
  }
}