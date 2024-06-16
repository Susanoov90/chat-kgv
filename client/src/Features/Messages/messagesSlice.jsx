import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: [],
    message: {}
}

export const userSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        getAllMessage: (state, action) => {
            state.messages = action.payload.map(user => {
                return {
                    _id: user._id,
                    chatId: user.chatId,
                    senderId: user.senderId,
                    text: user.text,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            })
        },
        getSingleMessage: (state, action) => {
            state.messages = action.payload
        },
        updateMessage: (state, action) => {
            // const index = state.users.findIndex(a => a.id === action.payload.id)
            // // const index = state.users.findIndex(b => b.date_enter === action.payload.date_enter)
            // state.users[index] = {
            //     _id: action.payload._id,
            //     name_user: action.payload.name_user,
            //     description_user: action.payload.description_user,
            //     email_user: action.payload.email_user,
            //     date_enter: action.payload.date_enter,
            //     password_user: action.payload.password_user
            // }
        },
        deleteMessage: (state, action) => {
            // const id = action.payload;

            // const date_enter = action.payload.date_enter
            // state.users = state.users.filter(a => a._id !== id)
        },
        getUniqueMessage: (state, action) => {
            state.message = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { addMessage, getAllMessage, getSingleMessage, updateMessage, deleteMessage, getUniqueMessage } = userSlice.actions

export default userSlice.reducer
