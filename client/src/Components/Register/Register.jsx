import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import { addUser } from '../../Features/Users/usersSlice';
import './Register.scss'

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [users, setUsers] = useState({
        name_user: "",
        username_user: "",
        email_user: "",
        date_enter: Date.now,
        password_user: ""
    })
 
    const [ firstPassword, setFirstPassword ] = useState('') //To confirm the password

    const handleSumbit = (e) => {
        e.preventDefault();
        console.log(users)
        if(firstPassword !== users.password_user) {
            alert("Passwords do not match")
        } else{
            axios.post("http://127.0.0.1:5000/chatKgv/users", users)
            .then(response => {
              console.log(response)
              dispatch(addUser(response.data))
              navigate("/login")
            })
           .catch(err => {console.log(err);});  
        }
    }

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

            <div className="card px-1 py-4">
                <div className="card-body">
                    {/* <h6 className="card-title mb-3">This appointment is for</h6>
                    <div className="d-flex flex-row"> <label className="radio mr-1"> <input type="radio" name="add" value="anz" checked/> <span> <i className="fa fa-user"></i> Anz CMK </span> </label> <label className="radio"> <input type="radio" name="add" value="add"/> <span> <i className="fa fa-plus-circle"></i> Add </span> </label> </div> */}
                    <h4 className="information mt-4">Register</h4>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Name" value={users.name_user} onChange={(e) => (setUsers({ ...users, name_user: e.target.value }))} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <div className="input-group">
                                    <input className="form-control" type="text" placeholder="Email ID" value={users.email_user} onChange={(e) => (setUsers({ ...users, email_user: e.target.value }))} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <div className="input-group">
                                    <input className="form-control" type="text" placeholder="Create an Unique Username" value={users.username_user} onChange={(e) => (setUsers({ ...users, username_user: e.target.value }))} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <div className="input-group">
                                    <input className="form-control" type="password" placeholder="Create Password" value={firstPassword} onChange={(e) => (setFirstPassword( e.target.value )) } />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <div className="input-group">
                                    <input className="form-control" type="password" placeholder="Confirm Password" value={users.password_user} onChange={(e) => (setUsers({ ...users, password_user: e.target.value }))} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" d-flex flex-column text-center px-5 mt-3 mb-3">
                        <small className="agree-text">By Adding Personal Informations, you agree to the</small>
                        <a href="#" className="terms">Terms & Conditions</a>
                    </div>
                    <button className="btn btn-primary btn-block confirm-button" onClick={handleSumbit}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default Register