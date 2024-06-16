import imgProfile from "../../../../../img/img-profile/user_1.png"
// import { getAllChat } from "../../../../../Features/Chats/chatsSlice"
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useState } from "react";
// import { getAllUser } from "../../../../../Features/Users/usersSlice";
import './MessagesTemplate.scss'
import { handleClickedChat } from "../../../../../Features/Chats/chatsSlice";
import { addSingleChat } from "../../../../../Features/Chats/chatsSlice";
import { addInbox ,getAllInbox, getSingleInbox } from "../../../../../Features/Inbox/inboxSlice";
import { getRecipientID } from "../../../../../Features/Users/usersSlice";

const MessagesTemplate = ({chat = {}, maxUser = [], inbox={}}) => {
    const dispatch = useDispatch()
    const userWow = JSON.parse(sessionStorage.getItem("users")); //id user in session

    const members = chat.members
    const details_members = chat.details_members
    const socketInRedux = useSelector(state => state.socket.sockets)

    const recipientID = members.find((id) => id !== userWow?._id)

    const display_members = details_members.find((id) => id._id === recipientID)
    // console.log("display_members",display_members)
    // console.log("les chats",chat)

    const messages = useSelector(state => state.message.messages)

    const last_message = messages[messages.length - 1]
    console.log("last_message",last_message)
    const handleClickToShowMessage = (e) =>{ 
        e.preventDefault()
        dispatch(handleClickedChat(true))
        dispatch(getRecipientID(recipientID))
        dispatch(addSingleChat(chat))
    }

    return (
        <div className="contain" onClick={(e) => handleClickToShowMessage(e)}>
            <div className="contain__Messages">
                <div className="contain__Messages__BubbleImgProfile">
                    <div className="contain__Messages__BubbleImgProfile--imgProfile">
                        <img src={imgProfile} alt="" />
                    </div>

                    {socketInRedux.some((element) => element.userId === display_members?._id) ?
                    
                    <div className="contain__Messages__BubbleImgProfile--ActiveConnection">
                    </div>
                    
                    : 
                    
                    <div className="contain__Messages__BubbleImgProfile--NotConnection">
                    </div>
                    }
                </div>
                <div className="contain__Messages__NameAndMessage">
                    <div className="contain__Messages__NameAndMessage--Name">
                        {display_members.username_user}
                    </div>
                    <div className="contain__Messages__NameAndMessage--Message">
                        {chat?._id === last_message?.chatId && last_message.text}
                    </div>
                </div>
                <div className="contain__Messages__BubbleNotification">
                    {/* <div className="contain__Messages__BubbleNotification--Notification">
                        10
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default MessagesTemplate;