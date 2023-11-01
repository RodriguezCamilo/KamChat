import { Schema, model } from "mongoose"

const userSchema = Schema ({
    message: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

export const messagesModel = model('messages', userSchema)