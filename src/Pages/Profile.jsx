import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MainInfo } from '../Components/MainInfo'
import { Orders } from '../Components/Orders'
import ProductBlock from '../Components/ProductBlock';
import { ProductBlockShop } from '../Components/ProductBlockShop';
import Product from '../models/Product';  
import { selectProfile } from '../redux/slices/authSlice';
import { selectCurrentTab, setCurrentTab } from '../redux/slices/profileSlice';
import { logout } from '../redux/slices/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../redux/slices/cartSlice';
import { selectShopInfo, selectShopProducts } from '../redux/slices/profileSlice';
import { fetchShop } from '../redux/requests';
import { fetchShopProducts } from '../redux/requests';
import { Reviews } from '../Components/Reviews';
import { useMatch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { clearProfilePage } from '../redux/slices/profileSlice';
import { useState } from 'react';
import { ModalWindow } from '../Components/ModalWindow';
import { BecomeSellerForm } from '../Components/BecomeSellerForm';
import { PublicDataBlock } from '../Components/PublicDataBlock';
import { ResponseWindow } from '../Components/ResponseWindow';

export const Profile = () => {

    const currentTab = useSelector(selectCurrentTab);
    const shop = useSelector(selectShopInfo);
    const user = useSelector(selectProfile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shopProducts = useSelector(selectShopProducts);
    const [isActiveWindow, setIsActive] = useState(false);
    const [isPbActiveWindowm, setPbActive] = useState(false);

    useEffect(() => {
        if(user.id === "00000000-0000-0000-0000-000000000000")
            navigate('/');
    })

    useEffect(() => {
        dispatch(fetchShop({userId: user.id}));
        dispatch(fetchShopProducts({userId: user.id}))

    }, []);

    const handleUpdateProduct = () => {
        navigate('product/update')
    }

    const handleAddCategory = () => {
        navigate('category/add')
    }

    const handleAddTag = () => {
        navigate('tag/add')
    }

    const handleLogout = () => {
        dispatch(logout())
        dispatch(userLogout());
        dispatch(clearProfilePage());
    };

    const handleBecomeSeller = () => {
        setIsActive(true);
    }

    const displayProducts = () => {
        return <div className="content__items">
                {
                    shopProducts.map((productItemShop) => {
                        return (
                            <ProductBlockShop
                                productItemShop = {productItemShop} key = {productItemShop.product.id}
                            />);
                    })
                }   
                </div>
    }

    const handleAddProductClick = () => {
        navigate('product/add')
    };

    const displayRight = () =>{
        switch(currentTab){
            case 'main info':
                return <MainInfo setActive = {setPbActive} shop={shop}/> 
            case 'my orders':
                return <Orders userId={user.id}/>
            case 'active products':
                return displayProducts()
            case 'feedbacks':
                return <Reviews/>
            // case 'tags':
            //     return 
            // case 'categories':
            //     return
        }   
    }

    return (
        <div className="profile-wrapper">
            <div className="left">

                <div className="profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 474.5" className='profile-avatar'>
                        <title/>
                        <g data-name="Layer 2" id="Layer_2">
                            <g data-name="Layer 1" id="Layer_1-2">
                                <path className="cls-1" d="M500,250A250.28,250.28,0,0,1,368.85,470H131.15A250,250,0,1,1,500,250Z"/>
                                <path className="cls-2" d="M315.24,40.17C304.61,44.49,294.61,53,289.5,56.05c-10.14,6.07-18.61-14.25-15.88-25.75a21.39,21.39,0,0,1,25.74-15.88C310.86,17.15,326.18,35.72,315.24,40.17Z"/>
                                <path className="cls-2" d="M289.69,77.37l-.51-.43a30,30,0,0,0-47.62-30.6A18.5,18.5,0,0,1,230.07,50H230a30,30,0,0,0-30,30v0a2.39,2.39,0,0,1-1.46,2.25,30,30,0,1,0,34.52,46.91A29.93,29.93,0,0,0,255,126a29.85,29.85,0,0,0,12.55,3.91,30,30,0,1,0,29-49.17A15.45,15.45,0,0,1,289.69,77.37Z"/>
                                <circle className="cls-3" cx="315" cy="175" r="15"/>
                                <circle className="cls-3" cx="185" cy="175" r="15"/>
                                <path className="cls-3" d="M357.61,281.51l-17.25-3.45-36.18-7.23q-12-2.4-24.18-3.7V220H220v47.13q-12.15,1.32-24.18,3.7l-33.3,6.66-20.13,4A52.75,52.75,0,0,0,100,333.23V470H400V333.23A52.75,52.75,0,0,0,357.61,281.51Z"/>
                                <path className="cls-3" d="M303.82,270.83q-12-2.4-24.18-3.7V230h-60v37.13q-12.15,1.32-24.18,3.7l-33.3,6.66a54.57,54.57,0,0,0,53.55,44h70.86A54.55,54.55,0,0,0,340,278.06Z"/>
                                <path className="cls-3" d="M310,130v60a60,60,0,0,1-60,60h0a60,60,0,0,1-60-60V130"/>
                                <circle className="cls-1" cx="275" cy="165" r="5"/>
                                <circle className="cls-1" cx="225" cy="165" r="5"/>
                                <path className="cls-3" d="M270,200h0a20,20,0,0,1-40,0"/>
                                <path className="cls-3" d="M170,350v31.42A47.9,47.9,0,0,0,170,440v30"/>
                                <rect className="cls-3" height="20" width="140" x="180" y="120"/>
                                <rect className="cls-1" height="39.44" transform="translate(63.39 230.63) rotate(-50)" width="12.16" x="272.93" y="27.61"/>
                                <rect className="cls-1" height="30" width="70" x="330" y="360"/>
                                <rect className="cls-1" height="70" width="30" x="370" y="340"/>
                                <rect className="cls-2" height="50" width="20" x="380" y="350"/>
                                <path className="cls-3" d="M330,350v31.42A47.9,47.9,0,0,1,330,440v30"/>
                            </g>
                        </g>
                    </svg>

                    <span className='profile-fullName'>{user.firstName}</span>
                    <span className='profile-fullName'>{user.lastName}</span>
                    <button className='profile-btn' onClick={handleLogout}>
                        <span className='profile-btn__change'>Logout</span>
                    </button>
                    {shop.ipNumber === '' && <button className='profile-btn' onClick={handleBecomeSeller}>
                        <span className='profile-btn__change'>Become a seller</span>
                    </button>}
                </div>

                <div className="white-space">
                </div>

                <div className="menu-container">

                    <div className="info">
                        <div className="info-title">
                            Personal information
                        </div>

                        <ul>
                            <li className="menu-item" onClick={() => dispatch(setCurrentTab('main info'))}>
                                Main info
                            </li>
                        </ul>
                    </div>

                    <div className="info">
                        <div className="info-title">
                            Orders
                        </div>

                        <ul>
                            <li className="menu-item" onClick={() => dispatch(setCurrentTab('my orders'))}>
                                My orders
                            </li>
                        </ul>
                    </div>
                    <Outlet/>
                    {shop.ipNumber !== '' &&
                        <div className="info">
                        <div className="info-title">
                            Shop
                        </div>

                        <ul>
                            <li className="menu-item">
                                <button className='profile-btn' onClick={handleAddProductClick}>
                                    <span className='profile-btn__change'>Add new item</span>
                                </button>
                            </li>
                            <li className="menu-item" onClick={() => dispatch(setCurrentTab('active products'))}>
                                Active products       
                            </li>
                            <li className="menu-item" onClick={() => dispatch(setCurrentTab('feedbacks'))}>
                                Feedbacks      
                            </li>
                        </ul>
                    </div>
                    }

                    {
                        user.isAdmin !== 0 && 
                        <div className="info">
                            <div className="info-title">
                                Administrator
                            </div>

                            <ul>
                                <li>
                                <button className="profile-btn" onClick={handleAddTag}>
                                    <span className='profile-btn__change'>Add tags</span>
                                </button>
                                </li>
                                <li>
                                <button className="profile-btn" onClick={handleAddCategory}>
                                    <span className='profile-btn__change'>Add categories</span>
                                </button>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
                {
                    isActiveWindow === true &&
                    <ModalWindow setActive={setIsActive}>
                        <BecomeSellerForm/>
                    </ModalWindow>
                }

                {
                    isPbActiveWindowm === true &&
                    <ModalWindow setActive={setPbActive}>
                        <PublicDataBlock/>
                    </ModalWindow>
                }

                {/* {
                    isActiveRespWindow === true &&
                    <ModalWindow setActive={setIsActiveResp}>
                        <ResponseWindow userId = {user.id}/>
                    </ModalWindow>
                } */}
            </div>

            <div className="right">
                {displayRight()}
            </div>
        </div>
    )
}
