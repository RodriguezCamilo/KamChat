import { Schema, model } from "mongoose"

const userSchema = Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'user'
    }
})

export const userModel = model('users', userSchema)