import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "Well, David, what shall i do? They wait for me in the hallway",
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
export default notificationSlice.reducer