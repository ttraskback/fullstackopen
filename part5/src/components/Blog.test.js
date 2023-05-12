import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
describe('<Blog />', () => {
  const blog =     {
    title: 'Go To Statement Considered Harmful 1',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
    author: 'Test',
    user:{
      username:'test1',
      name:'test 1',
      id: 12345
    }
  }

  test('At the start renders Title but not url and likes', async () => {
    render(<Blog blog={blog} />)
    const title = screen.getByTestId('title')
    expect(title).toBeDefined()

    const div = screen.getByTestId('info')
    expect(div).toHaveClass('hide')
  })
  test('Renders url and likes when button is clicked', async () => {
    render(<Blog blog={blog} />)
    const button = screen.getByText('Show')
    fireEvent.click(button)

    const div = screen.getByTestId('info')
    expect(div).not.toHaveClass('hide')
  })

  test('handlelikeAdd is trigger twise if like is pressed twise', async () => {
    const handleUpdateMoc = jest.fn()
    render(<Blog blog={blog} handleUpdate={handleUpdateMoc}/>)
    const button = screen.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(handleUpdateMoc.mock.calls).toHaveLength(2)
  })
})