import { Router } from "express"
import { getMessages } from "../controllers/messages.controller.js"

const messagesRouter = Router()

messagesRouter.get('/msgs', getMessages)
//userRouter.post('/', postMessages)

export default messagesRouter