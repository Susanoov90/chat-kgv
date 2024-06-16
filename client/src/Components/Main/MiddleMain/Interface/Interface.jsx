import { useEffect, useLayoutEffect } from "react"
import imgProfile from "../../../../img/img-profile/user_1.png"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getAllMessage, getSingleMessage } from "../../../../Features/Messages/messagesSlice"
import { getSingleChat } from "../../../../Features/Chats/chatsSlice"
import { useRef } from "react"
import axios from "axios"
import moment from "moment"
import './Interface.scss'

const Interface = () => {
    const dispatch = useDispatch()
    const userWow = JSON.parse(sessionStorage.getItem("users")); //id user in session
    const chat = useSelector(state => state.chat.chat)
    const messages = useSelector(state => state.message.messages)
    const recipientID = useSelector(state => state.user.recipientID)
    const scroll = useRef()
    // console.log("recipientID",recipientID)
    // console.log("message in interface",messages)
    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/chatKgv/messages/${userWow._id}/${chat._id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                console.log("response.data", response.data)
                console.log("chatId", chat._id)
                dispatch(getSingleMessage(response.data))

            } catch (err) {
                console.log(err)
            }
        }

        fetchMessage()
    }, [chat._id])

    useEffect(() => {
        scroll?.current?.scrollIntoView({behavior: 'smooth'})
    },[messages])

    return (
        <div className="Interface p-2">
            {messages ? messages.map((message) => (
                message.senderId === userWow._id ?

                    <div className="Interface__MessageSent" ref={scroll}>
                        <div className="Interface__MessageSent--BlockMessage m-2">
                            <div className="Interface__MessageSent--BlockMessage--message">
                                {message.text}
                            </div>

                            <div className="Interface__MessageSent--BlockMessage--timeSent">
                                Sent {moment(message.createdAt).calendar()}
                            </div>
                        </div>
                        <div className="Interface__MessageSent--imgProfileCase">
                            <div className="Interface__MessageSent--imgProfileCase--imgProfile">
                                <img src={imgProfile} alt="" />
                            </div>
                        </div>
                    </div>

                    :

                    <div className="Interface__MessageReceived" ref={scroll}>
                        <div className="Interface__MessageReceived--imgProfileCase">
                            <div className="Interface__MessageReceived--imgProfileCase--imgProfile">
                                <img src={imgProfile} alt="" />
                            </div>
                        </div>
                        <div className="Interface__MessageReceived--BlockMessage m-2">
                            <div className="Interface__MessageReceived--BlockMessage--message">
                                {message.text}
                            </div>

                            <div className="Interface__MessageReceived--BlockMessage--timeReceived">
                                Received {moment(message.createdAt).calendar()}
                            </div>
                        </div>
                    </div>
            ))

                :

                <div>
                    Loading messages ...
                    Be the first to send a message if there is no message here ! 😁👍
                </div>}
        </div>
    )
}

export default Interface;