import express, { json } from 'express'
import {MONGODB_URI, CREDENTIALS, PORT } from './utils/config.js'
import "express-async-errors";
const app = express()
import { connect ,set} from 'mongoose'
import {blogsRouter} from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import middleware from './utils/middleware.js'
import loginRouter from './controllers/login.js'
import cors from 'cors';

let connectionOptions = {}
if (CREDENTIALS) {
    connectionOptions = {
        sslKey: CREDENTIALS,
        sslCert: CREDENTIALS,
    }
}
set('strictQuery', true);

connect(MONGODB_URI, connectionOptions)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
export default app
export {app}