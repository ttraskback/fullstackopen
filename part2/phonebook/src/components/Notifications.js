const Notifications = ({ message, classname = 'error' }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={classname}>
        {message}
      </div>
    )
  }

export default Notifications