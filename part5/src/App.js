import { useState, useEffect , useRef } from 'react'
import Blog from './components/Blog'
import AddForm from './components/AddForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notifications from './components/Notifications'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificatiolevel, setNotificatiolevel] = useState('error')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setNotificatiolevel('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken('')
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const createBlog = async (blogObject) => {
    const returnedblog = await blogService.create(blogObject)
    blogFormRef.current.toggleVisibility()
    returnedblog.user = user
    setBlogs(blogs.concat(returnedblog))

    setNotificationMessage(`New blog entry ${returnedblog.title} by ${user.name} was added.`)
    setNotificatiolevel('success')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const updateBlog = async (blog) => {
    const updatedBlog = await blogService.update(blog)
    setBlogs(blogs.map((c) => {
      if (c.id === updatedBlog.id) {
        // Increment the clicked counter
        return updatedBlog
      } else {
        // The rest haven't changed
        return c
      }
    }))
  }

  const handleDelete = async (blog) => {
    if (await blogService.deleteBlog(blog.id)) {
      setBlogs(blogs.filter(blogObject => blogObject.id !== blog.id ))
      setNotificationMessage(`Deleted blog entry ${blog.title} by ${user.name}.`)
      setNotificatiolevel('success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } else {
      setNotificationMessage(`Failed to Deleted blog entry. (${blogService.getlastError()})`)
      setNotificatiolevel('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then((newBlogs) => {
      setBlogs( newBlogs )
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notifications message={notificationMessage} classname={notificatiolevel}/>

      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }

      {user &&
        <div>
          <p>
            {user.name} logged in
          </p>
          <button onClick={handleLogout}> logout </button>
          <Togglable buttonLabel="New blog" ref={blogFormRef} >
            <AddForm createBlog={createBlog}/>
          </Togglable>
        </div>
      }
      <h2>blogs</h2>
      {blogs.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdate={updateBlog} handleDelete={handleDelete} user={user}/>
      )}
    </div>
  )
}

export default App