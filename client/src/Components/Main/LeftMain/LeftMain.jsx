import Options from "./Options/Options";
import Searching from "./Searching/Searching";
import MessagesTemplate from "./Messages/MessagesTemplate/MessagesTemplate";
import MessagesList from "./Messages/MessagesList/MessagesList";
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { useState, useRef } from 'react';
import './LeftMain.scss'
const LeftMain = () => {

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <div className="leftMain">
            <Searching />
            <Options />
            <MessagesList />

            {/* <Button variant="light" ref={target} onMouseOver={() => setShow(!show)}>Invite a member</Button>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Click to send a special invitation to someone in order to add him/her to your repertory
                    </Tooltip>
                )}
            </Overlay> */}
        </div>
    )
}

export default LeftMain;