import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        changeNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return null
        }
    }
})

export const { changeNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(changeNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}


export default notificationSlice.reducer