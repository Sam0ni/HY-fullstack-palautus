import { useSelector } from "react-redux"

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
                        {user.name} {user.blogs.length}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UsersView
