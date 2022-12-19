import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginRequest, checkUserRequest } from '../redux/requests';
import { selectAuthStatus } from '../redux/slices/authSlice';
import { useEffect } from 'react';

export const SignIn = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const navigate = useNavigate();


  const validateData =async  (e) => {
    e.preventDefault();
    
    if(checkData())
    {
      dispatch(loginRequest({login, password}));
    }
  }

  const checkData = () => {
    return login !== "" && password !== "";
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

              <div className="btn-group">
                <button className="btn" type="submit" onClick={(e) => validateData(e)}>
                  <div className="main-btn">
                      Sign in
                    </div>
                </button>
                <NavLink to="/register">
                  <button className="btn">
                    <div className="additional-btn">
                      Create Account
                    </div> 
                  </button>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
