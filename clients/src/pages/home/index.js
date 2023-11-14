import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { getSocket } from '../../reducers/socketSlice'
import { setRoomData} from '../../reducers/roomSlice'
import { useState } from 'react';





const Home = () => {

    const navigate = useNavigate(); 
    const socket = useSelector(getSocket)
    // const usernameData = useSelector(getStateUserName)
    // const roomData = useSelector(getStateRoom)
    const dispatch = useDispatch()
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    

    const joinRoom = () => {
        if (room !== '' && username !== '') {
          socket.emit('join_room', { username, room });
          dispatch(setRoomData({username, room}))
        }
        navigate('/chat', { replace: true });
      };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`Chat Rooms`}</h1>
        <input className={styles.input} placeholder='Username...'  onChange={(e) => setUsername(e.target.value)} />
        {/* fetch data from api */}        
        <select className={styles.input} onChange={(e) => setRoom(e.target.value)}>
          <option>-- Select Room --</option>
          <option value='room1'>Room1</option>
          <option value='room2'>Room2</option>
          <option value='room3'>Room3</option>
          <option value='room4'>Room4</option>
        </select>

        <button className='btn btn-secondary' onClick={()=>joinRoom()}>Join Room</button>
      </div>
    </div>
  );
};

export default Home;