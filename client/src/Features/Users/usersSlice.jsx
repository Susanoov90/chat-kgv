import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    user: {},
    recipientID : null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload)
        },
        getAllUser: (state, action) => {
            // const index = state.users.findIndex(a => a.id === action.payload.id)

            // if(index == -1) {
            //     state.users.push(action.payload)
            // } else{
                
            // }
            state.users = action.payload.map(user => {
                return {
                    _id: user._id,
                    name_user: user.name_user,
                    description_user: user.description_user,
                    email_user: user.email_user,
                    date_enter: user.date_enter,
                    password_user: user.password_user
                }
            })
        },
        getSingleUser: (state, action) => {
            state.users = action.payload
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(a => a.id === action.payload.id)
            // const index = state.users.findIndex(b => b.date_enter === action.payload.date_enter)
            state.users[index] = {
                _id: action.payload._id,
                name_user: action.payload.name_user,
                description_user: action.payload.description_user,
                email_user: action.payload.email_user,
                date_enter: action.payload.date_enter,
                password_user: action.payload.password_user
            }
        },
        deleteUser: (state, action) => {
            const id = action.payload;

            const date_enter = action.payload.date_enter
            state.users = state.users.filter(a => a._id !== id)
        },
        getRecipientID : (state, action) => {
            state.recipientID = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { addUser, getAllUser, getSingleUser, updateUser, deleteUser, getRecipientID } = userSlice.actions

export default userSlice.reducer
