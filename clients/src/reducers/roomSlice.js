import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    room: localStorage.getItem('room') || '',
    username: localStorage.getItem('username') || '',
    users: localStorage.getItem('users') || [],
    messages: localStorage.getItem('messages') || []
  };


export const roomSlice  = createSlice({
    name:'room',
    initialState:initialState,
    reducers:{
        setUsersRoom: (state,action) =>{
            state.users = action.payload.users
            localStorage.setItem("users",JSON.stringify(action.payload.users))
        },
        setRoomData:(state,action)=>{
            state.room = action.payload.room
            state.username = action.payload.username
            localStorage.setItem("room", action.payload.room)
            localStorage.setItem("username", action.payload.username)

        },
        clearRoom:(state)=>{
            localStorage.clear();
            state = { ...initialState }
           
        },
        receiveMessage:(state,action)=>{
            state.messages = action.payload.messages
            localStorage.setItem("messages",JSON.stringify(state.messages))
        },



    }
})

export const getStateRoom = (state) => state.room.room;

export const getStateUsers = (state) => {
    //  if( typeof state.room.users === "string" && state.room.users !== "" ){
    //     console.log(typeof state.room.users)
    //     return JSON.parse(state.room.users)
    //  }else{
    //     return []
    //  }
    return state.room.users
}

export const getStateUserName = (state) => state.room.username

export const getStateMessage = (state) =>{ 
//    if (typeof state.room.messages === "string" && state.room.messages !== ""){
//     return JSON.parse(state.room.messages)
//    }else{
//      return []
//    }
return state.room.messages
}

export const {setUsersRoom,setRoomData,clearRoom,receiveMessage} = roomSlice.actions



