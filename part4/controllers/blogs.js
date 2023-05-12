
import express from 'express'
const blogsRouter = express.Router()
import jsonwebtokenpkg from 'jsonwebtoken';
const { verify } = jsonwebtokenpkg;
import Blog from "../models/blogs.js"
import User from '../models/user.js'

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        name: 1,
        username:  1,
        id: 1
    })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', {
        name: 1,
        username:  1,
        id: 1
    })
    if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const user = request.user
    
    blog.user = user._id

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    
    const blog = await Blog.findById(request.params.id)
    if(!blog){
        return response.status(404).end()
    }
    if (request.user == null
        || blog.user.toString() !== request.user._id.toString()
        ){
        return response.status(400).json({ error: "Invalid token" }).end()

    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        user: body.user,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', {
        name: 1,
        username:  1,
        id: 1
    })
    response.status(200).json(updatedBlog)
})

export { blogsRouter }