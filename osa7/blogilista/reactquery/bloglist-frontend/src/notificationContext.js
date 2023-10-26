import { createContext, useContext, useReducer } from "react";

const notifReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "REMOVE":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, null);

  return (
    <NotificationContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotifVal = () => {
  const notifAndDispatch = useContext(NotificationContext);
  return notifAndDispatch[0];
};

export const useNotif = () => {
  const [notif, dispatch] = useContext(NotificationContext);
  return (payload) => {
    dispatch({ type: "SET", payload });
    setTimeout(() => {
      dispatch({ type: "REMOVE" });
    }, 5000);
  };
};

export default NotificationContext;
