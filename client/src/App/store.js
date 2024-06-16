import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../Features/Users/usersSlice'
import chatsReducer from '../Features/Chats/chatsSlice'
import inboxReducer from '../Features/Inbox/inboxSlice'
import maxUserReducer from '../Features/Users/maxUserSlice'
import messagesReducer from '../Features/Messages/messagesSlice'
import socketReducer from '../Features/Socket/socketSlice'

export const store = configureStore({
  reducer: {
    user : usersReducer,
    chat : chatsReducer,
    inbox : inboxReducer,
    maxUser : maxUserReducer,
    message : messagesReducer,
    socket : socketReducer
  },
})