import styles from './styles.module.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { getSocket } from '../../reducers/socketSlice'
import {getStateUserName,getStateRoom} from '../../reducers/roomSlice'

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const socket = useSelector(getSocket)
  const  username = useSelector(getStateUserName)
  const room = useSelector(getStateRoom)

  const sendMessage = () => {
    if (message !== '') {
      const createdTime = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      // let dataUsername = username ==="" || username === null ?  localStorage.getItem("username") : username
      // let dataRoom = room === ""  || room === null ? localStorage.getItem("room") : room
      socket.emit('send_message', { username, room, message, createdTime });

      setMessage('');
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;