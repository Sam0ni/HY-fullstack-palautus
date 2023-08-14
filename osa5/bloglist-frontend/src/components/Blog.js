import { useState } from "react"

const Blog = ({blog, updateBlog, username, handleDeletion}) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: "darkblue",
    color: "white"
  }

  const toggleBlogInfo = () => {
    setShowAll(!showAll)
  }

  const showSimple = () => {
    return(
      <div>
        <div onClick={toggleBlogInfo}>{blog.title} {blog.author}
        <button>Info</button>
        </div>
      </div>
    )
  }

  const showInfo = () => {
    return(
      <div>
        <div onClick={toggleBlogInfo}>{blog.title} {blog.author}
        <button>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>{blog.likes}
        <button onClick={handleLike}>Like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    )
  }

  const showDelete = () => {
    return(
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    )
  }

  const handleDelete = () => {
    handleDeletion(blog.id, blog.title)
  }

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    updateBlog(blogToUpdate, blog.id)
  }

  return(
    <div style={blogStyle}>
      {(showAll && showInfo())}
      {(!showAll && showSimple())}
      {(showAll && blog.user.username === username && showDelete())}
    </div>
  )
}

export default Blog