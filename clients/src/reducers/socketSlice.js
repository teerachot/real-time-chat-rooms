import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import io from "socket.io-client";
 
const initialState  ={
    socketIo: null,
    loading:'idle' | 'pending' | 'succeeded' | 'failed'
}

export const socketConnectAsync = createAsyncThunk(
    'connect/socket',
    async (urlSocket) => {
      const response = await io.connect(urlSocket);
      console.log(response)
      return response;
    }
  ); 


export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
      setSocketIo: (state,action) =>{
        state.socketIo = action.payload
      } 
    },
    extraReducers: (builder) => {
      builder
        .addCase(socketConnectAsync.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(socketConnectAsync.fulfilled, (state, action) => {
          state.loading = 'idle';
          state.socketIo = action.payload;
    
        });
    },
  }); 

export const getSocket = (state) => state.socket.socketIo

export  const { setSocketIo } = socketSlice.actions
