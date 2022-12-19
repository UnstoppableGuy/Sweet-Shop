import React from 'react'
import { useState } from 'react'
import { updateShop } from '../redux/slices/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { putSeller } from '../redux/requests'
import {selectProfile} from '../redux/slices/authSlice'

export const BecomeSellerForm = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectProfile)
    const [shopName, setShopName] = useState('');
    const [ipNumber, setIpNumber] = useState('');
    const [shopDescription, setShopDescription] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    
    //TODO: check ipNumber values intp state
    const validateData = async () => {
        const seller = {
            name: shopName,
            description: shopDescription,
            number: ipNumber,
            city: city,
            country: country,
            housenumber: houseNumber,
            postalCode: '11223',
            street: street
        }
        if(await putSeller({userId: user.id, ...seller}))
            dispatch(updateShop(seller))
        else{
            alert('Something went wrong. Try to become seller the product later');
        }
    }


    return (

    <form className='fm-wrapper'>
        <div className="formmd">
            <div className="formmd-left">
            <input required value={shopName} type="text" className="form-control" placeholder="Name of the shop" onChange={(e) => setShopName(e.target.value)}/>
                <input required value={ipNumber} type="text"  className="form-control" placeholder="IP Number" onChange={(e) => setIpNumber(e.target.value)}/>
                <input required maxLength={255} value={shopDescription} type="text" className="form-control" placeholder="Description" onChange={(e) => setShopDescription(e.target.value)}/>
            </div>

            <div className="formmd-right">
                <input required value={country} type="text" className="form-control" placeholder="Country" onChange={(e) => setCountry(e.target.value)}/>  
                <input required value={street} type="text" className="form-control" placeholder="Street" onChange={(e) => setStreet(e.target.value)}/>            

                <input required value={city} type="text" className="form-control" placeholder="City" onChange={(e) => setCity(e.target.value)}/>
                <input required value={houseNumber} type="text" className="form-control" placeholder="House number" onChange={(e) => setHouseNumber(e.target.value)}/>               
            </div>  
        </div>
        
        <button type='submit' className="btn-container btn btn-success" onClick={validateData}>
            <div className="main-btn">
                Become Seller
            </div>
        </button>
    </form>
  )
}
