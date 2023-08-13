import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from "./services/login"

const Login = ({handleLogin, handleUsernameChange, handlePasswordChange, username, password}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type="text"
          onChange={handleUsernameChange}
          value={username}
          name="Username"
          />
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

const CreateBlog = ({handleCreation, handleTitleChange, handleAuthorChange, handleUrlChange, title, author, url}) => {
  return(
    <div>
      <form onSubmit={handleCreation}>
        <div>
          title:
          <input 
          type='text'
          value={title}
          name='Title'
          onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
          type='text'
          value={author}
          name="Author"
          onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
          type='text'
          value={url}
          name='URL'
          onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const Blogs = ({blogs, username, handleLogout}) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>Logged in as {username}<button onClick={handleLogout}>Logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const Notifications = ({notification}) => {
  return(
    <div>{notification}</div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const localUser = window.localStorage.getItem("loggedUser")
    if (localUser) {
    setUser(JSON.parse(localUser))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const token = await login.login({
        username: username,
        password: password
      })
      window.localStorage.setItem("loggedUser", JSON.stringify(token))
      setUsername("")
      setPassword("")
      setUser(token)
      setNotification(`You Have Logged In!`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification(exception.response.data.error)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedUser")
    setNotification(`You Have Logged Out!`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleCreation = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title,
        author,
        url
      }
      const response = await blogService.createBlog(user.token, blog)
      setBlogs(blogs.concat(response))
      setNotification(`${response.title} Was Added!`)
      setAuthor("")
      setTitle("")
      setUrl("")
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification(exception.response.data.error)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const loginForm = () => {
    return(
      <Login handleLogin={handleLogin}
      handleUsernameChange={handleUsernameChange} 
      handlePasswordChange={handlePasswordChange}
      username={username}
      password={password}
      />
    )
  }

  const blogsRender = () => {
    return(
      <div>
        <Blogs blogs={blogs} username={user.username} handleLogout={handleLogout}/>
        <CreateBlog handleCreation={handleCreation}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        title={title}
        author={author}
        url={url}
        />
      </div>
    )
  }

  return(
    <div>
      <Notifications notification={notification}/>
      {(!user && loginForm())}
      {(user && blogsRender())}
    </div>
  )
}

export default App