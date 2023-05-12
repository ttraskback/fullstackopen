import mongoose from 'mongoose'
import { agent as supertest } from 'supertest';
import app from '../app'
import Blog from '../models/blogs'
import User from '../models/user.js'
import test_helper from '../utils/test_helper'
import { hash } from 'bcrypt';


const api = supertest(app)
let token = ""
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const passwordHash = await hash("tester", test_helper.saltRounds)
    const user = new User({
        username:"tester",
        name:"test 1",
        passwordHash,
    })

    await user.save()

    const user2 = new User({
        username:"tester2",
        name:"test 1",
        passwordHash,
    })

    await user2.save()
    await Blog.insertMany(test_helper.initialBlogsWithUser(user2))
    const response = await api.post('/api/login').send({ username: 'tester2', password: 'tester' });
    api.auth(response.body.token, { type: 'bearer' });
    //token = response.body.token
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(test_helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)
        expect(contents).toContain(
            "Go To Statement Considered Harmful 3"
        )
    })
})

describe('viewing a specific blog', () => {
    test('id is defined in correct attribute', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await test_helper.blogsInDb()

        const blogToView = blogsAtStart[0]
        blogToView.user = {
            "id": blogToView.user.toString(),
            "name": "test 1",
            "username": "tester2",
        }

        const resultblog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultblog.body).toEqual(blogToView)
    })
    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonexistingId = await test_helper.nonExistingId()

        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new blog', () => {
    test('blog is saved correctly', async () => {
        const newBlog = {
            title: 'New Test',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            author: 'james may',
            likes: 8,
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await test_helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            test_helper.initialBlogs.length + 1
        )
        expect(response.body).toMatchObject(newBlog)
    })

    test('likes is defaulted to 0', async () => {
        const newBlog = {
            title: 'Like Test',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            author: 'james may'
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toEqual(0)
    })

    test('empty title fails', async () => {
        const newBlog = {
            author: 'Author 1',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('empty url fails', async () => {
        const newBlog = {
            title: 'Url Test',
            author: 'Author 1',
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('invalid token fails', async () => {
        api.auth("invalidToken", { type: 'bearer' });

        const newBlog = {
            title: 'New Test',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 8,
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)


    })
})
describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await test_helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await test_helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            test_helper.initialBlogs.length - 1
        )

        const contents = blogsAtEnd.map(r => r.title)

        expect(contents).not.toContain(blogToDelete.title)
    })

    test('fail with status code 400 if id is invalid', async () => {
        const nonExistingId = test_helper.nonExistingId()
        await api
            .delete(`/api/blogs/${nonExistingId}`)
            .expect(400)
    })
})

describe('updating of a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await test_helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.title = "Update Test"
        blogToUpdate.user = {
            "id": blogToUpdate.user.toString(),
            "name": "test 1",
            "username": "tester2",
        }

        const updatedBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ title: blogToUpdate.title })
            .expect(200)

        expect(updatedBlog.body).toEqual(blogToUpdate)
    })

    test('fail with status code 400 if id is invalid', async () => {
        const nonExistingId = test_helper.nonExistingId()
        await api
            .put(`/api/blogs/${nonExistingId}`)
            .send({ title: "Not to be update" })
            .expect(400)
    })
})
afterAll(async () => {
    //await mongoose.connection.close()
})