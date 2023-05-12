import { useState } from 'react'

const AddForm = ({ createBlog }) => {
  const [newtitle, setNewTitle] = useState('')
  const [newurl, setNewURL] = useState('')
  const [newAuthor, setNewAuthor] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newtitle,
      url: newurl,
      author: newAuthor
    })

    setNewTitle('')
    setNewURL('')
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewURL(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  return(
    <form className="blogAddForm" onSubmit={addBlog}>
      <label htmlFor="Title">Title:</label>
      <input name="Title"
        id='NewTitle'
        value={newtitle}
        placeholder='Blog title'
        onChange={handleTitleChange}
      />

      <label htmlFor="author">Author:</label>
      <input
        name = "author"
        id='NewAuthor'
        value= {newAuthor}
        placeholder = 'Blog author'
        onChange={handleAuthorChange}
      />

      <label htmlFor="url">URL:</label>
      <input
        name="url"
        id='NewUrl'
        value={newurl}
        placeholder = 'Blog URL'
        onChange={handleUrlChange}
      />
      <button type="submit">create</button>
    </form>
  )
}


export default AddForm