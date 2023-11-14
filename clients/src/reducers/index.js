// import * as room from './roomSlice'
import {socketSlice} from './socketSlice'
import {roomSlice} from './roomSlice'
import { combineReducers } from "redux"
export default combineReducers({ socket:socketSlice.reducer, room:roomSlice.reducer })
