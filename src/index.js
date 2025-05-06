import { LogicService } from "../src/services/logic.service.js"

import { TaskService } from './services/task.service.js'

function main () {
  const logicService = new LogicService(new TaskService())
  logicService.init()
}

main()  