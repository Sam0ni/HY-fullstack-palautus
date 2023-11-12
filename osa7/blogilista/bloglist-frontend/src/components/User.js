import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {
    const id = useParams().id
    const users = useSelector((state) => state.allUsers)
    if (!users) {
        return null
    }
    const user = users.find((user) => user.id === id)
    const allblogs = useSelector((state) => state.blogs)
    const blogs = allblogs.filter((blog) => blog.user.id === id)
    console.log(blogs)
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User
