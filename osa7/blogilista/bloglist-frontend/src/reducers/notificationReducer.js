import { createSlice } from "@reduxjs/toolkit"

const notifSlice = createSlice({
    name: "notif",
    initialState: null,
    reducers: {
        setNotif(state, action) {
            const content = action.payload
            return content
        },
        removeNotif(state, action) {
            return null
        },
    },
})

export const { setNotif, removeNotif } = notifSlice.actions

export const setNotification = (content) => {
    return async (dispatch) => {
        dispatch(setNotif(content))
        setTimeout(() => dispatch(removeNotif()), 5000)
    }
}

export default notifSlice.reducer
