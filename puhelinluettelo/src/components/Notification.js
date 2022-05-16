const Notification = ({message, error}) => {
    if(message === null && error === null) {
        return null
    } else if (message === null && error !== null){
        return(
            <div className="error">
                {error}
            </div>
        )
    }

    return(
        <div className="success">
            {message}
        </div>
    )
}

export default Notification