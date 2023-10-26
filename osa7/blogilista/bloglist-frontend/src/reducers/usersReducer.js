import { createSlice } from "@reduxjs/toolkit"
import users from "../services/users"

const usersSlice = createSlice({
    name: "users",
    initialState: null,
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
    },
})

export const { setUsers } = usersSlice.actions

export const initUsers = () => {
    return async (dispatch) => {
        const allUsers = await users.getUsers()
        console.log(allUsers)
        dispatch(setUsers(allUsers))
    }
}

export default usersSlice.reducer
