import _ from "lodash"
const dummy = (_blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
      }
    
      return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog  = (blogs) => {
  const reducer = (prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }

  return blogs.length === 0
    ? null
    : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  return _(blogs)
    .countBy('author')
    .entries()
    .map((blog, id) => ({
      author: blog[0],
      blogs:  blog[1]
    }))
    .maxBy('blogs');
}

const mostLikes = (blogs) => {
  const likesPerAuthor = _(blogs)
  .groupBy('author')
  .map((blog, author) => ({
    author: author,
    likes: _.sumBy(blog, 'likes')
  }))
  .value()
  return _.maxBy(likesPerAuthor,'likes')
}
export {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}