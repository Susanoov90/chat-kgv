import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { UseSelector } from 'react-redux';
import axios from 'axios'
import { addUser } from '../../Features/Users/usersSlice';
import './Login.scss'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userWow = JSON.parse(sessionStorage.getItem("users"));
    // console.log("user in localStorage",userWow);

    const [userLogin, setUserLogin] = useState({
        username_user: "",
        password_user: ""
    })

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/chatKgv/users/login', userLogin)
            .then(response => {
                console.log("response axios login",response)
                console.log("json stringify response", JSON.stringify(response.data))
                sessionStorage.setItem("users", JSON.stringify(response.data))
                // dispatch(addUser(response.data))
                navigate(`/${response.data._id}`)
            })
            .catch(err => { console.log(err) });
    }

    // const handleSumbit = (e) => {
    //     e.preventDefault();
    //     console.log(users)
    //     if(firstPassword !== users.password_user) {
    //         alert("Passwords do not match")
    //     } else{
    //         axios.post("http://127.0.0.1:5000/chatKgv/users", users)
    //         .then(response => {
    //           console.log(response)
    //           dispatch(addUser(response.data))
    //           navigate("/login")
    //         })
    //        .catch(err => {console.log(err);});  
    //     }
    // }
    return (
        <div className="container mt-5 mb-5 d-flex justify-content-center">
            <div className='wrapper'>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
                <div><span class="dot"></span></div>
            </div>

            <div className="card bg-custom px-1 py-4">
                <div className="card-body">
                    {/* <h6 className="card-title mb-3">This appointment is for</h6>
                    <div className="d-flex flex-row"> <label className="radio mr-1"> <input type="radio" name="add" value="anz" checked/> <span> <i className="fa fa-user"></i> Anz CMK </span> </label> <label className="radio"> <input type="radio" name="add" value="add"/> <span> <i className="fa fa-plus-circle"></i> Add </span> </label> </div> */}
                    <h4 className="information mt-4">Login</h4>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Enter Username" value={userLogin.username_user} onChange={(e) => (setUserLogin({ ...userLogin, username_user: e.target.value }))} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <div className="input-group">
                                    <input className="form-control" type="password" placeholder="Enter Password" value={userLogin.password_user} onChange={(e) => (setUserLogin({ ...userLogin, password_user: e.target.value }))} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" d-flex flex-column text-center px-5 mt-3 mb-3">
                        <small className="agree-text">Forgot Your Password ?</small>
                        <a href="#" className="terms">Click Here !</a>
                    </div>
                    <button className="btn btn-primary btn-block confirm-button" onClick={handleLogin}>Confirm</button>

                    {/* {userWow !== undefined ? 

                        <div>
                            {userWow}
                            {console.log("userWow",userWow)}
                        </div>

                        :

                        <div>
                            Great
                        </div>
                    } */}
                </div>
            </div>
        </div>
    )
}

export default Login