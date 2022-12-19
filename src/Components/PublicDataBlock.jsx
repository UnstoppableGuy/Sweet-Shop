import React from 'react'
import { useState } from 'react'
import { updateProfile } from '../redux/slices/authSlice'
import { putUser } from '../redux/requests'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile } from '../redux/slices/authSlice'

export const PublicDataBlock = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectProfile)
    const [fn, setFn] = useState('')
    const [ln, setLn] = useState('')
    const [mobilePhone, setMobilePhone] = useState('')

    const validateData = async (e) => {
        // e.preventDefault();

        if(await putUser({userId: user.id, firstname: fn, lastname: ln, mobile: mobilePhone })){
            dispatch(updateProfile({firstName: fn, lastName: ln, mobileNumber: mobilePhone}));
        }
        else{
            alert('Something went wrong. Try to update public data later');  
        }
    }


    return (

    <form className='fm-wrapper'>
        <div className="formmd">
            <div className="formmd-left">
                <input required value={fn} type="text" className="form-control" placeholder="First name" onChange={(e) => setFn(e.target.value)}/>
                <input required value={ln} type="text" className="form-control" placeholder="Last name" onChange={(e) => setLn(e.target.value)}/>
            </div>

            <div className="formmd-right">
            <input required value={mobilePhone} type="tel" pattern="[0-9]{3}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{3}" className="form-control" placeholder="mobile phone" onChange={(e) => setMobilePhone(e.target.value)}/>
            </div>  
        </div>
        
        <button type='submit' className="btn-container btn btn-success" onClick={(e) => validateData(e)}>
            <div className="main-btn">
                Update public data
            </div>
        </button>
    </form>
  )
}
