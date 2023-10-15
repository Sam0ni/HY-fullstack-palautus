import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const allAnecdotes = useSelector(({ filter, anecdotes }) => {
        if ( filter === "" ) {
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const sortedAnecdotes = allAnecdotes.toSorted((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = (id) => {
        const voted = allAnecdotes.find(a => a.id === id)
        dispatch(voteAnecdote(voted))
        dispatch(setNotification(`You voted "${voted.content}"`, 5))
    }

    return(
        <div>
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList