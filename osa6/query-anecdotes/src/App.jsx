import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from "axios"
import NotificationContext from './utils/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const [notif, dispatch] = useContext(NotificationContext)

  const voteAnecdoteMutation = useMutation({mutationFn: anecdote => axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1}).then(res => res.data), 
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
      dispatch({type: "SET", payload: `Voted ${anecdote.content}`})
      setTimeout(() => dispatch({type: "REMOVE"}), 5000)
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    voteAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => axios.get("http://localhost:3001/anecdotes").then(res => res.data),
    retry: 1
  })

  const anecdotes = result.data

  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
