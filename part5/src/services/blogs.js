import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null
const setToken = newToken => {  token = `Bearer ${newToken}`}
let lastError = null
const getlastError = () => {return lastError}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedBlog => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const postBlog = updatedBlog
  postBlog.user = updatedBlog.user.id
  const response = await axios.put(baseUrl+postBlog.id,postBlog, config)
  return response.data
}

const addLike = async oldBlogId => {
  const response = await axios.put(baseUrl+oldBlogId+'/addLike')
  return response.data
}

const deleteBlog = async blogId => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  try {
    await axios.delete(baseUrl+blogId, config)
    return true
  } catch (err) {
    console.error('Axios error: ', err)
    lastError = err.response.data.error
    return false
  }
}

// eslint-disable-next-line
export default { getAll, setToken, getlastError, create, addLike, update, deleteBlog }