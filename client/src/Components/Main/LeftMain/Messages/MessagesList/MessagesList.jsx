import imgProfile from "../../../../../img/img-profile/user_1.png"
import { getAllChat } from "../../../../../Features/Chats/chatsSlice"
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getAllUser } from "../../../../../Features/Users/usersSlice";
import { getAllInbox, getSingleInbox, addInbox } from "../../../../../Features/Inbox/inboxSlice";
import { getAllMaxUser } from "../../../../../Features/Users/maxUserSlice";
import MessagesTemplate from "../MessagesTemplate/MessagesTemplate";
import './MessagesList.scss'

const MessagesList = () => {
    const [id_OtherState, setId_OtherState] = useState("")

    const dispatch = useDispatch();
    const userWow = JSON.parse(sessionStorage.getItem("users")); //id user in session

    const chats = useSelector(state => state.chat.chats)
    const users = useSelector(state => state.user.users)
    const maxUser = useSelector(state => state.maxUser.maxUsers)
    const inbox = useSelector(state => state.inbox.inboxs)
    // console.log("redux chat", chats)
    // console.log("redux user", users)
    // console.log("redux maxUser", maxUser)
    // console.log("redux inbox", inbox)

    // const members = chats.map(chat => chat.members)
    // console.log("redux members", members)

    // const recipientID = members.find((id) => id !== maxUser._id)
    // const recipientID = members.map((id) => id.find((i) => i !== userWow._id))
    // console.log("recipientID", recipientID)

    // const removeDuplicata = (arr) =>{
    //     const map = {};
    //     const newArray = [];
    //     arr.forEach(el => {
    //        if(!map[JSON.stringify(el)]){
    //           map[JSON.stringify(el)] = true;
    //           newArray.push(el);
    //     }
    //  });
    //  return newArray;
    // }
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/chatKgv/chats/" + userWow._id, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                dispatch(getAllChat(response.data))

            } catch (err) {
                console.log(err)
            }
        }

        // const fetchOtherUsers = async () => {
        //     try {
        //         for (const element of recipientID) {
        //             console.log("element of recipientID",element)
        //             const response = await axios.get("http://127.0.0.1:5000/chatKgv/users/" + element, {
        //                 headers: {
        //                     "Content-Type": "application/json"
        //                 }
        //             }).then(function (response) {
        //                 console.log("responsa axios in message list", response)
        //                 dispatch(addInbox(response.data))
        //             })
        //         }
        //     } catch (err) {
        //         console.error("error of fetchOtherUsers", err)
        //     }
        // }

        const fetchMaxUser= async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/chatKgv/users/", {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                dispatch(getAllMaxUser(response.data))
            } catch (err) {
                console.log(err)
            }
        }

        // fetchOtherUsers()
        fetchData()
        fetchMaxUser()
    }, [])

    // const new_inbox = removeDuplicata(inbox)
    // console.log("new_inbox from message list", new_inbox)

    return (
        <div className="all">
            {chats && inbox && chats?.length > 0 ? chats?.map((chat, key) => (
                <div key={key}>
                    <MessagesTemplate chat={chat} maxUser={maxUser} inbox={inbox} />
                </div>
            )) : <div>Aucun message pour l'heure</div>}
        </div>
    )
}

export default MessagesList;