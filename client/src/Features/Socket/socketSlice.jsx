import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

const initialState = {
    sockets: [],
    socket: {}
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        addSocket: (state, action) => {
            // if(current(state.sockets).find(socket => socket.userId === action.payload.userId) === undefined) {
                state.sockets = action.payload
            // }
        },
        getAllSocket: (state, action) => {
        },
        getSingleSocket: (state, action) => {
            // state sockets = action.payload
        },
        updateSocket: (state, action) => {
        },
        deleteSocket: (state, action) => {
        }
    },
})

// Action creators are generated for each case reducer function
export const { addSocket, getAllSocket, getSingleSocket, updateSocket, deleteSocket } = socketSlice.actions

export default socketSlice.reducer
