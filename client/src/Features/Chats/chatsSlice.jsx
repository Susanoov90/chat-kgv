import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    chats: [],
    chat: {},
    clickedChat : false
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addChat: (state, action) => {
            if(current(state.chats).find(chat => chat._id === action.payload._id) === undefined) {
                state.chats.push(action.payload)
            } 
        },
        getAllChat: (state, action) => {
            state.chats = action.payload.map(s_chat => {
                return {
                    _id : s_chat._id,
                    members: s_chat.members,
                    details_members: s_chat.details_members
                }
            })
        },
        getSingleChat: (state, action) => {
            
        },
        updateChat: (state, action) => {

        },
        deleteChat: (state, action) => {

        },

        //For display the user chat interface
        handleClickedChat: (state, action) => {
            state.clickedChat = true
        },
        addSingleChat: (state, action) => {
            state.chat = action.payload
        },
        eraseChat: (state, action) => {
            state.chat = {}
            state.clickedChat = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { addChat, getAllChat, getSingleChat, updateChat, deleteChat, handleClickedChat, addSingleChat, eraseChat } = chatSlice.actions

export default chatSlice.reducer
