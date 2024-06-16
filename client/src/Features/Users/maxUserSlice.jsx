//To collect data of all users of Chat-KGV version 1

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    maxUsers: [],
    maxUser: {}
}

export const maxUserSlice = createSlice({
    name: 'maxUser',
    initialState,
    reducers: {
        addMaxUser: (state, action) => {
            state.maxUsers.push(action.payload)
        },
        getAllMaxUser: (state, action) => {
            // const index = state.users.findIndex(a => a.id === action.payload.id)

            // if(index == -1) {
            //     state.users.push(action.payload)
            // } else{
                
            // }
            state.maxUsers = action.payload.map(maxUser => {
                return {
                    _id: maxUser._id,
                    name_user: maxUser.name_user,
                    username_user: maxUser.username_user,
                    email_user: maxUser.email_user,
                    date_enter: maxUser.date_enter,
                    password_user: maxUser.password_user
                }
            })
        },
        getSingleMaxUser: (state, action) => {
            state.maxUsers = action.payload
        },
        updateMaxUser: (state, action) => {
            const index = state.maxUsers.findIndex(a => a.id === action.payload.id)
            // const index = state.users.findIndex(b => b.date_enter === action.payload.date_enter)
            state.maxUsers[index] = {
                _id: action.payload._id,
                name_user: action.payload.name_user,
                description_user: action.payload.description_user,
                email_user: action.payload.email_user,
                date_enter: action.payload.date_enter,
                password_user: action.payload.password_user
            }
        },
        deleteMaxUser: (state, action) => {
            const id = action.payload;

            const date_enter = action.payload.date_enter
            state.maxUsers = state.maxUsers.filter(a => a._id !== id)
        }
    },
})

// Action creators are generated for each case reducer function
export const { addMaxUser, getAllMaxUser, getSingleMaxUser, updateMaxUser, deleteMaxUser } = maxUserSlice.actions

export default maxUserSlice.reducer
