import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import Blog from "./components/Blog"
import Togglable from "./components/Togglable"
import CreateBlog from "./components/BlogForm"
import { setNotification } from "./reducers/notificationReducer"
import {
    getAllBlogs,
    createNewBlog,
    voteBlog,
    removeBlog,
} from "./reducers/blogReducer"
import { initUser, loginUser, logoutUser } from "./reducers/userReducer"
import { initUsers } from "./reducers/usersReducer"
import { Routes, Route, Link } from "react-router-dom"
import UsersView from "./components/UsersView"

const Login = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id="username"
                        type="text"
                        onChange={handleUsernameChange}
                        value={username}
                        name="Username"
                    />
                </div>
                <div>
                    password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id="loginButton" type="submit">
                    login
                </button>
            </form>
        </div>
    )
}

const Blogs = ({
    blogs,
    username,
    handleLogout,
    handleUpdate,
    handleDeletion,
}) => {
    return (
        <div>
            <h2>blogs</h2>
            <p>
                Logged in as {username}
                <button onClick={handleLogout}>Logout</button>
            </p>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlog={handleUpdate}
                    username={username}
                    handleDeletion={handleDeletion}
                />
            ))}
        </div>
    )
}

const Notifications = () => {
    const notification = useSelector((state) => state.notification)
    return <div className="notif">{notification}</div>
}

const Home = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const blogFormRef = useRef()
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            dispatch(loginUser(username, password))
        } catch (exception) {
            dispatch(setNotification(exception.response.data.error))
        }
    }

    const handleLogout = () => {
        dispatch(logoutUser())
        dispatch(setNotification("You Have Logged Out!"))
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handleCreation = (newBlog) => {
        try {
            dispatch(
                createNewBlog(user.token, newBlog, user.name, user.username)
            )
            dispatch(setNotification(`${newBlog.title} Was Added!`))
            blogFormRef.current.toggleVisibility()
            return true
        } catch (exception) {
            dispatch(setNotification(exception.response.data.error))
            return false
        }
    }

    const handleUpdate = (blog, id) => {
        console.log(blog)
        dispatch(voteBlog(user.token, id, blog))
    }

    const handleDeletion = (id, title) => {
        if (window.confirm(`Do you wish to delete ${title} ?`)) {
            dispatch(removeBlog(user.token, id))
        }
    }

    const loginForm = () => {
        return (
            <Login
                handleLogin={handleLogin}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
                username={username}
                password={password}
            />
        )
    }

    const sortBlogs = (blogs) => {
        const sorted = [...blogs]
        sorted.sort((a, b) => {
            if (a.likes > b.likes) {
                return -1
            } else if (a.likes < b.likes) {
                return 1
            } else {
                return 0
            }
        })
        return sorted
    }

    const blogsRender = () => {
        const sortedBlogs = sortBlogs(blogs)
        return (
            <div>
                <Blogs
                    blogs={sortedBlogs}
                    username={user.username}
                    handleLogout={handleLogout}
                    handleUpdate={handleUpdate}
                    handleDeletion={handleDeletion}
                />
                <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                    <CreateBlog handleCreation={handleCreation} />
                </Togglable>
            </div>
        )
    }

    return (
        <div>
            <Notifications />
            {!user && loginForm()}
            {user && blogsRender()}
        </div>
    )
}

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllBlogs())
    }, [])

    useEffect(() => {
        dispatch(initUser())
    }, [])

    useEffect(() => {
        dispatch(initUsers())
    }, [])

    return (
        <div>
            <div>
                <Link to="/">home</Link>
                <Link to="/users">users</Link>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<UsersView />} />
            </Routes>
        </div>
    )
}

export default App
