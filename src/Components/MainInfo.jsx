import React from 'react'
import { useSelector } from 'react-redux'
import { selectProfile } from '../redux/slices/authSlice'
import { selectAddress, selectShopInfo } from '../redux/slices/profileSlice'

export const MainInfo = ({shop, setActive}) => {

    const user = useSelector(selectProfile);
    const address = useSelector(selectAddress);

    return (
    <div className='personal-info-container'>
                    <div className='title'>
                        Personal Info
                    </div>

                    <ul className='list-container'>
                        <li className="list-item">
                            <div className='item-container'>
                                <p className='item-header'>Full name</p>
                                <div className='item-data-container'>
                                    <span className={`data`}>
                                        {user.firstName + ' ' + user.lastName}
                                    </span>
                                </div>
                            </div>

                            {/* <div className='item-container'>
                                <p className='item-header'>Date of registration</p>
                                <div className='item-data-container'>
                                    <span className='data'>24 декабря 2022</span>
                                </div>
                            </div> */}

                            <div className='item-container'>
                                <p className='item-header'>Mobile phone</p>
                                <div className='item-data-container'>
                                    <span className={`data`}>     
                                       { user.mobile}    
                                    </span>
                                </div>
                            </div>

                            <div className='item-container'>
                                <p className='item-header'>IP number</p>
                                <div className='item-data-container'>
                                    <span className={'data'}>{shop.ipNumber}</span>
                                </div>
                            </div>

                            <div className='item-container'>
                                <p className='item-header'>Shop address</p>
                                <div className='item-data-container'>
                                    <span className='data'>{address}</span>  
                                </div>
                            </div>
                        </li>

                        <li className="list-item">
                            <div className='item-container'>
                                <p className='item-header'>Email</p>
                                <div className='item-data-container'>
                                    <span className='data'>{user.email}</span>
                                </div>
                            </div>

                            <div className='item-container'>
                                <p className='item-header'>Name of the shop</p>
                                <div className='item-data-container'>
                                    <span className='data'>{shop.name}</span>
                                </div>
                            </div>

                            <div className='item-container'>
                                <p className='item-header'>Description</p>
                                <div className='item-data-container'>
                                    <span className='data'>
                                        {shop.description}
                                        {/* The Welsh Sweet Shop stocks over 200 different sweets ranging from rhubarb & 
                                        custard to sherbet fountains. 
                                        One of the best things about these outings was buying an ice lolly 
                                        beforehand in the sweet shop opposite the cinema. */}
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div className="pb">
                        <div className='public-info'>
                            <div className='pb-inf-row'>                            
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="cag7">
                                    <path fill="currentColor" d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm5-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                                    <path fill="currentColor" d="M1 9a7 7 0 0 1 7-7h8a7 7 0 0 1 7 7v3a7.001 7.001 0 0 1-6.203 6.955A1 1 0 0 1 16.5 19h-5.086l-3.707 3.707A1 1 0 0 1 6 22v-3.083A6.002 6.002 0 0 1 1 13V9Zm9.3 8.286a.997.997 0 0 1 .697-.286H16a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v4a4 4 0 0 0 4 4 1 1 0 0 1 1 1v1.586l2.292-2.292.008-.008Z"></path>
                                </svg>

                                <div className="title">
                                    Public data
                                </div>
                            </div>
                            <div className='description'>
                                The information you provide in this section is public. 
                                It is indicated next to the reviews and is visible to other Internet users. 
                                By posting your personal data in this section, you disclose them to an indefinite circle of persons.
                            </div>
                        </div>

                        <button className='btn' onClick={() => setActive(true)}>
                            <span className='btn__change'>Change public data</span>
                        </button>
                    </div>
                    
                </div>

  )
}
