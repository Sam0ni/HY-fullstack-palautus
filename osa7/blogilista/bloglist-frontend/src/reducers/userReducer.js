import { createSlice } from "@reduxjs/toolkit"
import login from "../services/login"

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
    },
})

export const { setUser } = userSlice.actions

export const loginUser = (username, password) => {
    return async (dispatch) => {
        const token = await login.login({
            username,
            password,
        })
        window.localStorage.setItem("loggedUser", JSON.stringify(token))
        dispatch(setUser(token))
    }
}

export const initUser = () => {
    return async (dispatch) => {
        const localUser = window.localStorage.getItem("loggedUser")
        if (localUser) {
            dispatch(setUser(JSON.parse(localUser)))
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        dispatch(setUser(null))
        window.localStorage.removeItem("loggedUser")
    }
}

export default userSlice.reducer
