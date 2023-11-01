import { messagesModel } from "../models/messages.models.js"

export const getMessages = async (req, res) => {
    const { limit } = req.query

    try {
        const msgs = await messagesModel.find().limit(limit)
        res.status(200).send({ respuesta: 'OK', mensaje: msgs })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar mensajes', mensaje: error })
    }
}

export const postMessages = async (req, res) => {
    const {  email, message } = req.body

    try {
        const msg = await messagesModel.create({email, message})
        res.status(200).send({ respuesta: 'OK', mensaje: msg })
        
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en enviar mensaje', mensaje: error })
    }
}