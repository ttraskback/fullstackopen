import Blog from "../models/blogs";

import { hash } from 'bcrypt';

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful 1',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
        author: 'Author 1'
    },
    {
        title: 'Go To Statement Considered Harmful 2',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 8,
        author: 'Author 2'
    },
    {
        title: 'Go To Statement Considered Harmful 3',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6,
        author: 'Author 3'
    },
    {
        title: 'Go To Statement Considered Harmful 4',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 8,
        author: 'Author 4'
    }
    ,
    {
        title: 'Go To Statement Considered Harmful 5',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        author: 'Author 4'
    }
    ,
    {
        title: 'Go To Statement Considered Harmful 6',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
        author: 'Author 5'
    }
    ,
    {
        title: 'Go To Statement Considered Harmful 7',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
        author: 'Author 1'
    },
]

const saltRounds = 10
const initialUsers = [
    {
        username:"test1",
        name:"test 1",
        passwordHash: await hash("Test1", saltRounds)
    },
    {
        username:"test2",
        name:"test 2",
        passwordHash: await hash("Test2", saltRounds)
    },
    {
        username:"test3",
        name:"test 3",
        passwordHash: await hash("Test3", saltRounds)
    }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'This will be removed',
    url: 'soon',
    author: 'james',
    likes: 1,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate('author', {
    name: 1,
    username:  1,
    id: 1
})
  return blogs.map(blog => blog.toJSON())
}

const initialBlogsWithUser = (user) => {
    const mappedBlogs =  initialBlogs.map((blog) =>{
        blog.user = user._id;
        return blog;
    });
    return mappedBlogs;
}

export default {
  initialBlogs, initialBlogsWithUser, nonExistingId, blogsInDb, initialUsers, saltRounds
}