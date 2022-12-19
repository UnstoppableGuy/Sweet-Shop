import React from 'react'
import { useState } from 'react'
import { updateProfile } from '../redux/slices/authSlice'
import { putUser } from '../redux/requests'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile } from '../redux/slices/authSlice'
import { selectEmailResponse } from '../redux/slices/transitSlice'
import { sendEmail } from '../redux/requests'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const ResponseWindow = () => {

    const [resp, setResp] = useState('')
    const dispatch = useDispatch()
    const email = useSelector(selectEmailResponse)
    const user = useSelector(selectProfile);
    const navigate = useNavigate()
    useEffect(() => {
        setResp('Click outside the modal window to exit or enter a new text to send to this user: ' + email)
        
        if(email === '')
        {
            navigate('/');
        }
    }, [email])

    const validateData = (e) => {
        alert('Response with the following contents: ' + resp + '. Will sent to ' + email)
        dispatch(sendEmail({userEmail: user.email, customerEmail: email, message: resp}))
        // dispatch(sendEmail({userEmail: user.email, customerEmail: 'yatsyna.firebalde@mail.ru', message: resp}))    
    }

    return (

    <form className='fm-wrapper'>
        <div className="formmd">
            <div className="formmd-left">
                <textarea value={resp} onChange={(e) => setResp(e.target.value)} className="form-control"></textarea>
            </div>
        </div>
        
        <button type='submit' className="btn-container btn btn-success" onClick={(e) => validateData(e)}>
            <div className="main-btn">
                Send response
            </div>
        </button>
    </form>
  )
}
