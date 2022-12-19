import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { registerRequest } from '../redux/requests';
import { useNavigate } from 'react-router-dom';
import { selectAuthStatus } from '../redux/slices/authSlice';
import { useEffect } from 'react';


export const Register = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, confirmsetPassword] = useState('');
    const status = useSelector(selectAuthStatus);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateData = (e) =>{
        e.preventDefault();

        if(login && confirmPass()){
            dispatch(registerRequest({login, password}))
        }
        else{
            alert("passwords aren't the same")
        }
    }

    const confirmPass = () => {
        if(password.length > 0 && confirmpassword.length > 0)
        {
            return password === confirmpassword;
        }

        return false;
    }

    useEffect( () => {
        if(status)
        navigate('/');
      }, [status])

    return (
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body py-md-4">
                            <form _lpchecked="1">

                                <div className="form-group">
                                    <input type="email" className="form-control" id="email" placeholder="Email" value={login} onChange={e => setLogin(e.target.value)} />
                                </div>


                                <div className="form-group">
                                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <input type="password" className="form-control" id="confirm-password" placeholder="confirm-password" value={confirmpassword} onChange={e => confirmsetPassword(e.target.value)} />
                                </div>

                                <div className="btn-group">
                                    <NavLink to="/sign-in">
                                        <button className="btn">
                                            <div className="additional-btn">
                                                Sign in
                                            </div> 
                                        </button>
                                    </NavLink>

                                    <button className="btn btn-success" onClick={(e) => validateData(e)} >
                                        <div className="main-btn">
                                            Create Account
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            )
}
