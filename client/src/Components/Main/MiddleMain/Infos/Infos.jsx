import { useState, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';


import './Infos.scss'

const Infos = () => {
    const userWow = JSON.parse(sessionStorage.getItem("users")); //id user in session

    const [show_1, setShow_1] = useState(false);
    const target_1 = useRef(null);

    const [show_2, setShow_2] = useState(false);
    const target_2 = useRef(null);

    const SingleChat = useSelector(state => state.chat.chat)
    // console.log("SingleChat in Infos",SingleChat)
    const SingleChat_detailsMembers = SingleChat.details_members
    const SingleChat_members = SingleChat.members
    console.log("SingleChat_Members in Infos",SingleChat_members)
    const socketInRedux = useSelector(state => state.socket.sockets)

    const real_singleChat_detailsMembers = SingleChat_detailsMembers.find((el) => el._id  !== userWow._id)
    const real_singleChat_members = SingleChat_members.find((el) =>  el  !== userWow._id)
    console.log("real_singleChat_members in Infos",real_singleChat_members)

    return (
        <div className="Infos">
            <div className="Infos_ActiveConnectionAndName">
                <div className="Infos_ActiveConnectionAndName--ActiveConnection">

                {socketInRedux.some((element) => element.userId === real_singleChat_members) === true ? 
                    <div className="Infos_ActiveConnectionAndName--ActiveConnection--symbolActiveConnection">
                    </div>

                    :

                    <div className="Infos_ActiveConnectionAndName--ActiveConnection--symbolNotConnection">
                    </div>
                }
                {console.log("search socket in Redux",socketInRedux.find((element) => element.userId === real_singleChat_members))}
                </div>

                <div className="Infos_ActiveConnectionAndName--Name" >
                    <h4>{real_singleChat_detailsMembers.username_user}</h4>
                </div>
            </div>

            <div className="Infos__Options">
                <div ref={target_1} onMouseOver={() => setShow_1(!show_1)}>
                    <FontAwesomeIcon icon={faPhone} size='lg' style={{ color: "#ffffff", }} />
                </div>
                <Overlay target={target_1.current} show={show_1} placement="top">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                            Click to Call on Audio
                        </Tooltip>
                    )}
                </Overlay>


                <div ref={target_2} onMouseOver={() => setShow_2(!show_2)}>
                    <FontAwesomeIcon icon={faVideo} size='lg' style={{ color: "#ffffff", }} />
                </div>
                <Overlay target={target_2.current} show={show_2} placement="top">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                            Click to Call on Video
                        </Tooltip>
                    )}
                </Overlay>
            </div>
        </div>
    )
}

export default Infos