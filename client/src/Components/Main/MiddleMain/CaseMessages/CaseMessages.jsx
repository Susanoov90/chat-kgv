import './CaseMessages.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { faFileImport } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import InputEmoji from "react-input-emoji"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { addMessage, getUniqueMessage } from '../../../../Features/Messages/messagesSlice'
import axios from 'axios'


const CaseMessages = () => {
    const dispatch = useDispatch()
    const messages = useSelector(state => state.message.messages)
    const recipientID = useSelector(state => state.user.recipientID)
    const chat = useSelector(state => state.chat.chat)
    const userWow = JSON.parse(sessionStorage.getItem("users")); //id user in session

    const [Text_message, setText_Message] = useState({
        chatId: chat._id,
        senderId: userWow._id,
        text: ""
    })

    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log(Text_message)
        if(Text_message !== ""){
            axios.post(`http://127.0.0.1:5000/chatKgv/messages/${userWow._id}`, Text_message)
            .then(response => {
                dispatch(addMessage(response.data))
                dispatch(getUniqueMessage(response.data))
                setText_Message({ ...Text_message, text: "" })
            })
            .catch(err => { console.log(err) });
        }
    }
    return (
        <div className="CaseMessages">
            <div className="CaseMessages__TextZone">
                {/* <input type="text" placeholder='Type your message here...'/> */}
                <textarea name="" id="" rows="1" placeholder='Type your message here ...' value={Text_message.text} onChange={(e) => (setText_Message({ ...Text_message, text: e.target.value }))}></textarea>
            </div>

            <div className="CaseMessages__ButtonsZone">
                <div className="CaseMessages__ButtonsZone__EmojiZone">
                    <FontAwesomeIcon icon={faFaceSmile} size='xl' style={{ color: "#ffffff", }} />
                </div>
                <div className="CaseMessages__ButtonsZone__FileZone">
                    <FontAwesomeIcon icon={faFileImport} size='xl' style={{ color: "#ffffff", }} />
                </div>
                <div className="CaseMessages__ButtonsZone__SendBubble" onClick={(e) => handleSendMessage(e)}>
                    <div>
                        <FontAwesomeIcon icon={faPaperPlane} size='xl' style={{ color: "#ffffff", }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaseMessages;