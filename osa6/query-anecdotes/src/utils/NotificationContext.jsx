import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return action.payload
        case "REMOVE":
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
    const [notif, notifDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notif, notifDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext