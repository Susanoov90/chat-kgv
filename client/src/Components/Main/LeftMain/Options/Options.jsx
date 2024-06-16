import { useState, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { addChat } from '../../../../Features/Chats/chatsSlice';
import './Options.scss'
import axios from 'axios';

const Options = () => {
    const dispatch = useDispatch();
    const [show_1, setShow_1] = useState(false);
    const target_1 = useRef(null);

    const [show_2, setShow_2] = useState(false);
    const target_2 = useRef(null);

    const [show_3, setShow_3] = useState(false);
    const target_3 = useRef(null);

    const [show_4, setShow_4] = useState(false);
    const target_4 = useRef(null);

    const [show_modal, setShow_modal] = useState(false);
    const handleShow_modal = () => setShow_modal(false);


    const other_chat = useSelector(state => state.chat.chat)
    console.log("other chat in options",other_chat)

    const maxUser = useSelector(state => state.maxUser.maxUsers)
    const chats = useSelector(state => state.chat.chats)
    // console.log("chats in options",chats)
    const userWow = JSON.parse(sessionStorage.getItem("users")); //id user in session
    // console.log("maxUser in options", maxUser);
    const filteredMaxUser = maxUser.filter((user) => user._id !== userWow._id)
    // console.log("filteredMaxUser in options", filteredMaxUser);

    const toCreateChats = (e, firstId, lastId) => {
        e.preventDefault();
        
        axios.post("http://127.0.0.1:5000/chatKgv/chats/"+userWow._id, {firstId:firstId, lastId:lastId})
        .then(response => {
            dispatch(addChat(response.data))            
            handleShow_modal()
          })
         .catch(err => {console.log(err);});  
    }

    return (
        <div className="options">
            <div ref={target_1} className="options__recent" onMouseOver={() => setShow_1(!show_1)}>
                <FontAwesomeIcon icon={faClockRotateLeft} size='lg' style={{ color: "#000000", }} />
            </div>
            <Overlay target={target_1.current} show={show_1} placement="top">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Click to see Recent Messages
                    </Tooltip>
                )}
            </Overlay>


            <div ref={target_2} className="options__allContacts" onMouseOver={() => setShow_2(!show_2)} onClick={() => setShow_modal(true)}>
                <FontAwesomeIcon icon={faAddressBook} size='lg' style={{ color: "#000000", }} />
            </div>
            <Overlay target={target_2.current} show={show_2} placement="top">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Click to see All Contacts
                    </Tooltip>
                )}
            </Overlay>


            <div ref={target_3} className="options__filterMessagesNotRead" onMouseOver={() => setShow_3(!show_3)}>
                <FontAwesomeIcon icon={faFilterCircleXmark} size='lg' style={{ color: "#000000", }} />
            </div>
            <Overlay target={target_3.current} show={show_3} placement="top">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Click to filter non-read messages
                    </Tooltip>
                )}
            </Overlay>

            {/* <div ref={target_4} className="options__filterMessagesNotRead" onMouseOver={() => setShow_4(!show_4)} onClick={() => setShow_modal(true)}>
                <FontAwesomeIcon icon={faPenToSquare} size='lg' style={{ color: "#000000", }} />
            </div>
            <Overlay target={target_4.current} show={show_4} placement="top">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Click to new chat
                    </Tooltip>
                )}
            </Overlay> */}


            <Modal show={show_modal} onHide={() => setShow_modal(false)} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header className='custom-modal' closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        User of ChatKGV
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='custom-modal custom-modal-body'>
                    {filteredMaxUser && filteredMaxUser.map((user, key) => (
                        <div className='custom-modal-body__user' key={key}>
                            <div>
                                {user.username_user} ~ <span className='custom-modal-body__user--nameOfTheUser'>{user.name_user}</span>
                            </div>
                            <div>
                                <Button variant="success" onClick={(e) => toCreateChats(e, userWow._id, user._id)}>New Chat</Button>
                            </div>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Options