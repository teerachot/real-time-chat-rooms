import styles from './styles.module.css';
import MessagesReceived from './message';
import SendMessage from './send-message';
import RoomAndUsersColumn from './room-and-users'



const Chat = () => {   
  return (
    <div className={styles.chatContainer}>
       <RoomAndUsersColumn   />
       <div>
        <MessagesReceived  />
        <SendMessage   />
        </div>
  
    </div>
  );
};

export default Chat;