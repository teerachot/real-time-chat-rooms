
import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getSocket } from '../../reducers/socketSlice'
import { receiveMessage,getStateMessage }  from '../../reducers/roomSlice'



const Messages = () => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  // const usernameData = useSelector(getStateUserName)
    // const roomData = useSelector(getStateRoom)
 
  const messagesColumnRef = useRef(null); 
  const socket = useSelector(getSocket)
  const messageState = useSelector(getStateMessage)
  const dispatch = useDispatch()

 
 

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    if (socket){
      socket.on('receive_message', (data) => {
        setMessagesReceived((state) => {
          let result =  [
              ...state,
              {
                message: data.message,
                username: data.username,
                createdTime: data.createdTime,
              },
            ]
            dispatch(receiveMessage({messages:result}))
          // localStorage.setItem("message",JSON.stringify(result))
          return result 
        }
        )});
    // Remove event listener on component unmount
      return () => socket.off('receive_message');
    } else {
       if(typeof messageState === "string"){
        let messageTemp = JSON.parse(messageState)
        setMessagesReceived(messageTemp)
       }else {
        setMessagesReceived(messageState)
       }
    }
    
  }, [socket,dispatch]);


  useEffect(() => {
    // all messages sent in the chat room (fetched from the db in backend)
    if (socket){
      socket.on('all_messages', (allMessages) => {
        if(allMessages){
            // localStorage.setItem("message",JSON.stringify(allMessages))
            setMessagesReceived((state) => {
              dispatch(receiveMessage({messages:[...allMessages, ...state]}))
              return  [...allMessages, ...state]
            });
           
        }
    });
    return () => socket.off('all_messages');
    }else{
      if(typeof messageState === "string"){
        let messageTemp = JSON.parse(messageState)
        setMessagesReceived(messageTemp)
       }else {
        setMessagesReceived(messageState)
       }
    }
   
  }, [socket,dispatch,messagesRecieved]);


  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

//   useEffect(()=>{
//     let allMessage = JSON.parse(localStorage.getItem('message'))
//     if (allMessage) {
//        setMessagesReceived(allMessage);
//    }
//  },[])





  // dd/mm/yyyy, hh:mm:ss
  const formatDateFromTimestamp = (timestamp) => {
    console.log(typeof timestamp)
    if(typeof timestamp == 'string'){
        timestamp = Date.parse(timestamp)
        console.log(timestamp)
    }
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.createdTime)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;