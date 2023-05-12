import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddForm from './AddForm'
describe('<AddForm />', () => {
  const blog =     {
    title: 'Go To Statement Considered Harmful 1',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    author: 'Test',
  }
  const user = userEvent
  test('addBlog is trigger once with correct data', async () => {
    const createBlogMoc = jest.fn()
    render( < AddForm createBlog = {
      createBlogMoc
    }
    />)

    const title = screen.getByPlaceholderText('Blog title')
    await user.type(title,blog.title)

    const author = screen.getByPlaceholderText('Blog author')
    await user.type(author, blog.author)

    const url = screen.getByPlaceholderText('Blog URL')
    await user.type(url, blog.url)

    const button = screen.getByText('create')
    fireEvent.click(button)

    expect(createBlogMoc.mock.calls).toHaveLength(1)
    expect(createBlogMoc.mock.calls[0][0].title).toBe(blog.title)
    expect(createBlogMoc.mock.calls[0][0].url).toBe(blog.url)
    expect(createBlogMoc.mock.calls[0][0].author).toBe(blog.author)

  })
})