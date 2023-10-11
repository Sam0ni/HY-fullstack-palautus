import { useDispatch } from "react-redux";
import { addNewAnecdote } from "../reducers/anecdoteReducer";
import { changeNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ""
        dispatch(addNewAnecdote(content))
        dispatch(changeNotification(`You added "${content}"`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
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