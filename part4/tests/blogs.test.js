import { totalLikes, favoriteBlog, mostBlogs, mostLikes } from '../utils/list_helper'

const listWithSeweralBlogequal = [
    {
        _id: '5a422aa71b54a676234d17f1',
        title: 'Go To Statement Considered Harmful',
        author: 'Author 3',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Author 3',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 8,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f6',
        title: 'Go To Statement Considered Harmful',
        author: 'Author 2',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful',
        author: 'Author 2',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 8,
        __v: 0
    }
    ,
    {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Go To Statement Considered Harmful',
        author: 'Author 3',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
    }
    ,
    {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Go To Statement Considered Harmful',
        author: 'Author 2',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
        __v: 0
    }
    ,
    {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Go To Statement Considered Harmful',
        author: 'Author 1',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
        __v: 0
    }
]

const listWithSeweralBlog = [
    {
        _id: '5a422aa71b54a676234d17f1',
        title: 'Go To Statement Considered Harmful',
        author: 'Author 3',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Author 3',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 8,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f6',
        title: 'Go To Statement Considered Harmful',
        author: 'Author 3',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f7',
        title: 'Go To Statement Considered Harmful',
        author: 'Author 2',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7,
        __v: 0
    }
    ,
    {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Go To Statement Considered Harmful',
        author: 'Author 2',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
    }
]

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has empty blog, equals 0', () => {
        const result = totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has several blog, equals the likes of that', () => {
        const result = totalLikes(listWithSeweralBlog)
        expect(result).toBe(24)
    })
})

describe('most liked', () => {
    test('when list has several blog, with no duplets', () => {
        const result = favoriteBlog(listWithSeweralBlog)
        expect(result).toEqual(listWithSeweralBlog[1])
    })

    test('when list has several blog, with duplets', () => {
        const result = favoriteBlog(listWithSeweralBlogequal)
        expect(result).toEqual(listWithSeweralBlogequal[3])
    })
})
describe('most bolgged', () => {
    test('when list has several blog, without duplets', () => {
        const result = mostBlogs(listWithSeweralBlog)
        expect(result).toEqual({"author": "Author 3", "blogs": 3})
    })
    test('when list has several blog, with duplets', () => {
        const result = mostBlogs(listWithSeweralBlogequal)
        expect(result).toEqual({"author": "Author 3", "blogs": 3})
    })
})

describe('most likes', () => {
    test('when list has several blog, without duplets', () => {
        const result = mostLikes(listWithSeweralBlog)
        expect(result).toEqual({"author": "Author 3", "likes": 15})
    })
    test('when list has several blog, with duplets', () => {
        const result = mostLikes(listWithSeweralBlogequal)
        expect(result).toEqual({"author": "Author 2", "likes": 14})
    })
})
