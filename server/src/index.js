import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import { Server } from 'socket.io'

import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import initializePassport from './config/passport.js'

import userRouter from './routes/users.routes.js'
import sessionRouter from './routes/sessions.routes.js'
import messagesRouter from './routes/mesagges.routes.js'
import { messagesModel } from './models/messages.models.js'

const whiteList = ['http://localhost:5173']
const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.indexOf(origin) != -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error("Acceso denegado"))
        }
    },
    credentials: true
}

const app = express()
const PORT = process.env.PORT

// Server

const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => console.log('DB is connected'))
    .catch(() => console.log('Error in connection'))

//Middleware

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        mongoOptions: {useNewUrlParser: true ,useUnifiedTopology: true},
        ttl: 500
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false

}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//WebSocket

const io = new Server(serverExpress, {
    connectionStateRecovery:{},
    cors: {
      origin: '*'
    }
  })


io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")
    socket.on('disconnect', () =>{
        console.log("Un usuario se ha desconectado")
    })

    socket.on('new msg', async (data)=>{
        console.log(data)
        const { message, email } = data
        await messagesModel.create({message, email})
        socket.broadcast.emit('broad msg')
    })

})

//API

app.use('/api/users', userRouter)
app.use('/api/sessions', sessionRouter)
app.use('/api/messages', messagesRouter)