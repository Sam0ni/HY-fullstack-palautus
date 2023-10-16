import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react"
import NotificationContext from '../utils/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const [notif, dispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({ mutationFn: (anecdote) => axios.post("http://localhost:3001/anecdotes", anecdote).then(res => res.data),
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
      dispatch({type: "SET", payload: `Created ${anecdote.content}`})
      setTimeout(() => dispatch({type: "REMOVE"}), 5000)
    },
    onError: (res) => {
      dispatch({type: "SET", payload: res.response.data.error})
      setTimeout(() => dispatch({type: "REMOVE"}), 5000)
    }
})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
