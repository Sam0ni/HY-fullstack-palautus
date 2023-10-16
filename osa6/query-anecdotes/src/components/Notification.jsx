import { useContext } from "react"
import NotificationContext from "../utils/NotificationContext"

const Notification = () => {
  const [notif, dispatch] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (notif) {
    return (
      <div style={style}>
        {notif}
      </div>
    )
  }
  return notif
}

export default Notification
