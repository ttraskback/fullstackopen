import { useState } from 'react'
const Blog = ({ blog, handleUpdate, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const VisbilityButton = () => {
    return <button className="visbilitybutton" onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
  }

  const handlelikeAdd = () => {
    blog.likes += 1
    handleUpdate(blog)
  }

  let infoClassName = 'info'
  if (visible) {
    infoClassName += ' show'
  }else{
    infoClassName += ' hide'
  }
  return (
    <div className="blogContent" data-blogtitle={blog.title}>
      <div data-testid="title" className="title">{blog.title} {blog.author}<VisbilityButton/></div>
      <div data-testid="info" className={infoClassName}>
        <span data-testid="url" className="url"><a href={blog.url}>{blog.url}</a></span>
        <span data-testid="likes" className="likes">Likes {blog.likes} <button onClick={handlelikeAdd}>Like</button></span>
        <span data-testid="user" className="user">{blog.user && blog.user.name}</span>
        {user && user.id === blog.user.id && <span data-testid="deletebutton" className="deletebutton"><button onClick={() => {if(window.confirm(`Remove blog "${blog.title}?"`)){handleDelete(blog)}}}>Delete</button></span>}
      </div>
    </div>
  )
}

export default Blog