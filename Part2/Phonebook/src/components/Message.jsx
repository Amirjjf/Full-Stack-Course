const Message = ({ message, type }) => {
    if (!message) {
      return null;
    }
  
    const messageStyle = {
      color: type === 'success' ? 'green' : 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    };
  
    return (
      <div className="message" style={messageStyle}>
        {message}
      </div>
    );
  }
  
  export default Message;
  