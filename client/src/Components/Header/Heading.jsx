import imgHeader from '../../img/img-components/Chat-KGV_Bg.png'
import imgProfile from "../../img/img-profile/user_1.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignature } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getSingleUser } from '../../Features/Users/usersSlice';
import { eraseChat } from '../../Features/Chats/chatsSlice'

import './Heading.scss'


const Heading = () => {
    const location = useLocation();
    // console.log("Url", location.pathname) //location.pathname => Get URL Of the actual 
    const userWow = JSON.parse(sessionStorage.getItem("users")); //id user in session
    const cioucou = sessionStorage.getItem("users")
    // console.log("cioucou", typeof cioucou)
    const [isLoginGood, set_IsLoginGood] = useState(false); //State for conditional rendering if user is connected
    // console.log("LoginGood before useEffect", isLoginGood)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (cioucou !== "") {
            // console.log("userWow", userWow)
            // console.log("typeof userWow", typeof userWow)

            const fetchData = async () => {
                try {
                    if (userWow) {
                        const response = await axios.get("http://127.0.0.1:5000/chatKgv/users/" + userWow?._id, {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        // console.log("response axios", response)
                        dispatch(getSingleUser(response.data))
                        set_IsLoginGood(true)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
            fetchData()
        }
    }, [location.pathname])

    // console.log("LoginGood after useEffect", isLoginGood)

    //For Modal_logout
    const [show_logout, setShow_logout] = useState(false);

    const handleClose_logout = () => setShow_logout(false);
    const handleShow_logout = () => setShow_logout(true);

    //For Modal_parameters
    const [show_parameters, setShow_parameters] = useState(false);

    const handleClose_parameters = () => setShow_parameters(false);
    const handleShow_parameters = () => setShow_parameters(true);

    //For Modal_parameters -> Modal_ModifyUsername
    const [show_ModifyUsername, setShow_ModifyUsername] = useState(false);

    const handleClose_ModifyUsername = () => setShow_ModifyUsername(false);
    const handleShow_ModifyUsername = () => setShow_ModifyUsername(true);



    //Handle Logout
    const handleLogout = () => {
        sessionStorage.removeItem("users")
        set_IsLoginGood(false)
        handleClose_logout()
        dispatch(eraseChat())
        
        navigate("/login")
        // dispatch(getUser([]))
        // handleClose()
    }

    return (
        <>
            <header className="">
                <div className='header__left'>
                    <img src={imgHeader} alt="" srcset="" />
                </div>
                <div className='header__middle'>
                    {isLoginGood === true &&
                        <span>Logged as {userWow.name_user}</span>
                    }
                </div>

                {/*Conditioning rendering for login user only */}
                {isLoginGood === false && <div className='header__right'>
                    <Button variant="warning" onClick={() => navigate('/login')}>Login</Button>
                    <Button variant="light" onClick={() => navigate('/register')}>Register</Button>
                </div>}

                {isLoginGood === true && <div className='header__right'>
                    <Button variant="info" onClick={handleShow_parameters}>Parameters</Button>
                    <Button variant="danger" onClick={handleShow_logout}>Logout</Button>
                </div>}
                {/*End Conditioning rendering */}

            </header>


            {/*Modal for logout */}
            <Modal show={show_logout} onHide={handleClose_logout}>
                <Modal.Header className='custom-modal custom-btn' closeButton>
                    <Modal.Title>Already wishing to logout ?</Modal.Title>
                </Modal.Header>
                <Modal.Body className='custom-modal'>Are you sure you want to log out ?</Modal.Body>
                <Modal.Footer className='custom-modal'>
                    <Button variant="secondary" onClick={handleClose_logout}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Yes, I log out
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*End Modal for logout */}

            {/*Modal for parameters*/}
            <Modal show={show_parameters} onHide={handleClose_parameters} backdrop="static" keyboard={false}>
                <Modal.Header className='custom-modal custom-btn' closeButton>
                    <Modal.Title>Parameters</Modal.Title>
                </Modal.Header>
                <Modal.Body className='custom-modal custom-modal-body'>
                    <div className='custom-modal-body__ProfileLine'>
                        <div className='custom-modal-body__ProfileLine__imgProfileCase'>
                            <div className='custom-modal-body__ProfileLine__imgProfileCase--imgProfile'>
                                <img src={imgProfile} alt="" />
                            </div>
                        </div>
                        <div className='custom-modal-body__ProfileLine--Name'>
                            {userWow?.username_user}
                        </div>
                    </div>

                    <div className='hr'>
                        <hr />
                    </div>

                    <div className='custom-modal-body__ModifyUsernameLine' onClick={handleShow_ModifyUsername}>
                        <div className='custom-modal-body__ModifyUsernameLine--icon'>
                            <FontAwesomeIcon className='FontAwesomeGetWhiteOnHover' icon={faSignature} size='xl' style={{ color: "#ffffff", }} />
                        </div>
                        <div className='custom-modal-body__ModifyUsernameLine--information'>
                            Modify Username
                        </div>
                    </div>

                    <div className='custom-modal-body__SuppressAccountLine' onClick={handleShow_logout}>
                        <div className='custom-modal-body__SuppressAccountLine--icon'>
                            <FontAwesomeIcon icon={faTrash} size='xl' style={{ color: "rgb(255, 169, 169)", }} />
                        </div>
                        <div className='custom-modal-body__SuppressAccountLine--information'>
                            Delete Account
                        </div>
                    </div>


                </Modal.Body>
            </Modal>
            {/*End Modal for parameters*/}

            {/*Modal for Modify Username*/}
            <Modal size='xl' show={show_ModifyUsername} onHide={handleClose_ModifyUsername} backdrop="static" keyboard={false}>
                <Modal.Header className='custom-modal custom-btn' closeButton>
                    <Modal.Title>Modify Username</Modal.Title>
                </Modal.Header>
                <Modal.Body className='custom-modal custom-modal-body'>

                </Modal.Body>
            </Modal>
            {/*End Modal for Modify Username*/}




        </>
    );
}

export default Heading;