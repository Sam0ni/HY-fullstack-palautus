import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addNewAnecdote(state, action) {
      state.push(action.payload)
    },

    addVoteToAnecdote(state, action) {
      return state.map(a => a.id !== action.payload.id ? a : {...action.payload})
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addNewAnecdote, addVoteToAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(addNewAnecdote(anecdote))
  }
}

export const voteAnecdote = (voted) => {
  return async dispatch => {
    const newVoted = {...voted, votes: voted.votes + 1}
    const anecdote = await anecdoteService.updateVote(newVoted)
    dispatch(addVoteToAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer