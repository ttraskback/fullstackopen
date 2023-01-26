import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express, { json } from 'express'
const app = express()
import { Schema, model, connect } from 'mongoose'

const blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = model('Blog', blogSchema)

const url = process.env.MONGODB_URI
const credentials = process.env.MONGODB_CREDENTIALS
let connectionOptions = {}
if (credentials) {
    connectionOptions = {
        sslKey: credentials,
        sslCert: credentials,
    }
}
console.log('connecting to', url)

connect(url, connectionOptions)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(json())

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

console.log(process.env.PORT)
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})