import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSocket } from '../../reducers/socketSlice'
import { useSelector, useDispatch } from 'react-redux';
import { getStateUserName, getStateRoom,clearRoom,setUsersRoom, getStateUsers } from '../../reducers/roomSlice'

const RoomAndUsers = () => {
  const [roomUsers, setRoomUsers] = useState([]);
  const users = useSelector(getStateUsers)
  const dispatch = useDispatch()
  const socket = useSelector(getSocket)
  const username = useSelector(getStateUserName)
  const room = useSelector(getStateRoom)
  

  const navigate = useNavigate();

  // // get user from localStorage
  useEffect(() => {
   
    if (typeof users === "string") {
      let usersTemp = JSON.parse(users);

      setRoomUsers(usersTemp); 
    }
  },[]);

  useEffect(() => {
    if(socket){
      socket.on("chatroom_users", (data) => {
     
        // localStorage.setItem("users", JSON.stringify(data));
        setRoomUsers(data);
        dispatch(setUsersRoom({users:data}))
      });
  
      return () => socket.off("chatroom_users");
    }
   
  }, [socket,dispatch]);

  const leaveRoom = () => {
    const createdTime = Date.now();
    // room = room || localStorage.getItem("room")
    socket.emit("leave_room", { username, room, createdTime });
    dispatch(clearRoom())
    // Redirect to home page
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{`Room: ${room||localStorage.getItem("room")}`}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
        <ul className={styles.usersList}>
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? "bold" : "normal"}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className="btn btn-outline" onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

export default RoomAndUsers;
