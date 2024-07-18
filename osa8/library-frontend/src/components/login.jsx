import { useMutation } from "@apollo/client"
import { useState, useEffect } from "react"
import { LOGIN } from "../queries"

const Login = ({ show, setToken, setPage }) => {
    if (!show) {
        return null
      }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [ login, result ] = useMutation(LOGIN)


    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem("library-token", token)
            setPage("authors")
        }
    }, [result.data])

    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password }})
    }

    return(
    <form onSubmit={submit}>
        <div>
          username
          <input value={username} onChange={({target}) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input
          value={password}
          onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">
          login
        </button>
    </form>
    )
}

export default Login