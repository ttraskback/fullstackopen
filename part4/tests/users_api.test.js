import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Users from '../models/user.js'
import test_helper from '../utils/test_helper'

const api = supertest(app)

beforeEach(async () => {
    await Users.deleteMany({})
    await Users.insertMany(test_helper.initialUsers)
})

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('Invalid username fail', async () => {
    const newUser = {
        username:"te",
        name:"test 1",
        password: "Test"
    }
    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('Invalid password fail', async () => {
    const newUser = {
        username:"test 4",
        name:"test 4",
        password: "Te"
    }
    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})
afterAll(async () => {
    //await mongoose.connection.close()
})