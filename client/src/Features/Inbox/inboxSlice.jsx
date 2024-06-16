//To collect data of the user's inbox

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    inboxs: [],
    inbox: {}
}

export const inboxSlice = createSlice({
    name: 'inbox',
    initialState,
    reducers: {
        addInbox: (state, action) => {
            state.inboxs.push(action.payload)
        },
        getAllInbox: (state, action) => {
            // const index = state.users.findIndex(a => a.id === action.payload.id)

            // if(index == -1) {
            //     state.users.push(action.payload)
            // } else{
                
            // }
            state.inboxs = action.payload.map((inbox) => {
                return {
                    _id: inbox._id,
                    name_user: inbox.name_user,
                    description_user: inbox.description_user,
                    email_user: inbox.email_user,
                    date_enter: inbox.date_enter,
                    password_user: inbox.password_user
                }
            })
        },
        getSingleInbox: (state, action) => {
            state.inboxs = action.payload
        },
        updateInbox: (state, action) => {
            const index = state.inboxs.findIndex(a => a.id === action.payload.id)
            // const index = state.users.findIndex(b => b.date_enter === action.payload.date_enter)
            state.inboxs[index] = {
                _id: action.payload._id,
                name_user: action.payload.name_user,
                description_user: action.payload.description_user,
                email_user: action.payload.email_user,
                date_enter: action.payload.date_enter,
                password_user: action.payload.password_user
            }
        },
        deleteInbox: (state, action) => {
            const id = action.payload;

            const date_enter = action.payload.date_enter
            state.inboxs = state.inboxs.filter(a => a._id !== id)
        }
    },
})

// Action creators are generated for each case reducer function
export const { addInbox, getAllInbox, getSingleInbox, updateInbox, deleteInbox } = inboxSlice.actions

export default inboxSlice.reducer
