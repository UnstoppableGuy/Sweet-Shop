import React, { useEffect, useState } from 'react'
import Categories from '../Components/Categories'
import ProductBlock from '../Components/ProductBlock';
import Product from '../models/Product';
import Skeleton from '../Components/Skeleton';
import { Pagination } from '../Components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveCategory, selectCurrentPage, selectSearchValue } from '../redux/slices/filterSlice';
import { getFetchedProducts } from '../redux/slices/productSlice';
import { selectAuthStatus, selectProfile } from '../redux/slices/authSlice';
import { getCountOfProductsByCategory,
         fetchCartItems,
         fetchProducts,
         getCategories, 
         searchByText,
        getCountOfProductsBySearch               } from '../redux/requests';

export const Home = () => { 
    // const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { items, status } = useSelector(getFetchedProducts);
    const currentCategory = useSelector(selectActiveCategory)
    const pageInfo = useSelector(selectCurrentPage)
    const searchValue = useSelector(selectSearchValue);
    const authStatus = useSelector(selectAuthStatus);
    const profile = useSelector(selectProfile);
    var flag = 1;
    
    useEffect(() => {
        dispatch(getCategories());
    }, [])

    useEffect(() => {
        if(searchValue === ''){
            console.log(items)
            dispatch(fetchProducts( { сategoryId : currentCategory, currentPage: pageInfo.currentPage }));
            dispatch(getCountOfProductsByCategory(currentCategory));
        }
        else {
            dispatch(searchByText({text: searchValue, page: pageInfo.currentPage}));
            dispatch(getCountOfProductsBySearch({text: searchValue, page: pageInfo.currentPage}))
        }
          
    }, [currentCategory, pageInfo, searchValue])

    useEffect(() => {

        if(authStatus && flag === 1)
        {
            dispatch(fetchCartItems({ userId: profile.id}));    
        }

        if(!authStatus)
            flag = 1;
        else
            flag = 0;

        
    }, [authStatus])




    return (
        <div className="container">
            <div className="content__top">
                <Categories />    
            </div>
            <div className="content__items">
            {
                status !== 'successful' ? 
                [...new Array(12)].map((_, index) => <Skeleton key={index}/>)
                :
                items.map((product) => <ProductBlock product = {product} key = {product.id}/>)
            }
            </div>

            <Pagination />
        </div>
    )
}
