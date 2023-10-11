import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = (id) => {
        const voted = anecdotes.find(a => a.id === id)
        dispatch(voteAnecdote(voted))
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