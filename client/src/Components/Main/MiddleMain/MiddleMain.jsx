import CaseMessages from "./CaseMessages/CaseMessages";
import Infos from "./Infos/Infos";
import Interface from "./Interface/Interface";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { io } from "socket.io-client"
import './MiddleMain.scss'
import { useEffect } from "react";
import { useState } from "react";
import { addSocket } from "../../../Features/Socket/socketSlice";
import { addMessage, getAllMessage, getSingleMessage } from "../../../Features/Messages/messagesSlice";

const MiddleMain = () => {
    const dispatch = useDispatch()
    const userWow = JSON.parse(sessionStorage.getItem("users")); //id user in session
    const [socket, setSocket] = useState(null)
    const socketInRedux = useSelector(state => state.socket.sockets)
    const [onlineUsers, setOnlineUsers] = useState([])
    const clickedChat = useSelector(state => state.chat.clickedChat)
    const recipientID = useSelector(state => state.user.recipientID)
    const message = useSelector(state => state.message.message)
    const chat = useSelector(state => state.chat.chat)
    // console.log("clickedChat", clickedChat)

    // console.log("onlineUsers", onlineUsers)
    useEffect(() => {
        const newSocket = io("http://localhost:3500");
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [userWow._id])

    useEffect(() => {
        if (socket === null) return
        socket.emit("addNewUser", userWow?._id)
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
            dispatch(addSocket(res))
        })

        return () => {
            socket.off("getOnlineUsers",)
        }
    }, [socket])

    //send Message
    useEffect(() => {
        if (socket === null) return

        socket.emit("sendMessage", {...message, recipientID})
        // dispatch(addMessage({...message, recipientID}))
        console.log("Message", message)
        console.log("sendMessage",{...message, recipientID})
    }, [message])

    //receive Message
    useEffect(() => {
        if (socket === null) return

        socket.on("getMessage", res =>{
            if(chat?._id !== res.chatId) return

            dispatch(addMessage(res))
        })

        return () => {
            socket.off("getMessage")
        }
    }, [socket, chat])


    // console.log("socketInRedux", socketInRedux)
    return (
        <div className="MiddleMain">
            {clickedChat ?
                <>
                    <Infos />
                    <Interface />
                    <CaseMessages />
                </>

                :

                <div className="MiddleMain__WhenNotChat">
                    Aucune conversation sélectionné
                </div>}
        </div>

        //Put the two components together inside one div.
        //Then the container div will take position relative
        //And the two components will take top : 0
        //And bottom : 0
    )
}

export default MiddleMain;