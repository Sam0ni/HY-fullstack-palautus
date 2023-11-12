import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UsersView = () => {
    const users = useSelector((state) => state.allUsers)
    if (!users) {
        return null
    }
    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                        {user.blogs.length}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UsersView
