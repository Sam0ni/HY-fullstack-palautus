import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ""
        dispatch(createNewAnecdote(content))
        dispatch(setNotification(`You added "${content}"`, 5))
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='newAnecdote' /></div>
                <button type="submite">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm