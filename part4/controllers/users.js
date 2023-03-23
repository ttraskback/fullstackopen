import { hash } from 'bcrypt'
import express from 'express'
const usersRouter = express.Router()
import User from '../models/user.js'

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        title: 1,
        url:  1,
        likes: 1
    })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (password.length < 3) {
        return response.status(400).json({
            error: 'Password to short'
        })
    }


    const saltRounds = 10
    const passwordHash = await hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

export default usersRouter