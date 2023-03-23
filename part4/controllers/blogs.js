
import express from 'express'
const blogsRouter = express.Router()
import jsonwebtokenpkg from 'jsonwebtoken';
const { verify } = jsonwebtokenpkg;
import Blog from "../models/blogs.js"
import User from '../models/user.js'

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('author', {
        name: 1,
        username:  1,
        id: 1
    })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('author', {
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
    
    blog.author = user._id

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    
    const blog = await Blog.findById(request.params.id)
    if (request.user == null 
        || blog.author.toString() !== request.user._id.toString()
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
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('author', {
        name: 1,
        username:  1,
        id: 1
    })
    response.status(200).json(updatedBlog)
})

export { blogsRouter }