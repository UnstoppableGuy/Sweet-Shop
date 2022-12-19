import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { json } from "react-router-dom";
import { setCategoryId } from "./slices/filterSlice";
import { async } from "q";


export const registerRequest = createAsyncThunk('profile/loginRequest', async ({login, password}) => {
    const {data} = await axios.post(`https://localhost:5000/api/User/register?email=${login}&password=${password}`);
    return data
});

export const loginRequest = createAsyncThunk('profile/loginRequest', async ({login, password}) => {
    const {data} = await axios.post(`https://localhost:5000/api/User/login?email=${login}&password=${password}`);
    return data
});

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
    const {data} = await axios.get(`https://localhost:5000/api/Category`);
    return data
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params) => {
    const { сategoryId, currentPage } = params
    console.log(сategoryId , currentPage)
    const { data } = await axios.get(`https://localhost:5000/api/Product/Category?categoryid=${сategoryId}&page=${currentPage}`);
    return data
});

export const getCountOfProductsByCategory = createAsyncThunk('filters/getCountOfProductsByCategory', async (categoryId) => {
    const { data}  = await axios.get(`https://localhost:5000/api/Product/CountInCategory?id=${categoryId}`);
    return data
});

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async ({userId}) => {
    const { data }  = await axios.get(`https://localhost:5000/api/Cart/GetCartById?userid=${userId}`);
    return data
});

export const putProductIntoCart = async (count, productId, userId) => {
    const { status } = await axios.post(`https://localhost:5000/api/Cart?productid=${productId}&count=${count}&userid=${userId}`);
    return status
}

export const deleteProductFromCart = async (productId, userId) => {
    const { status } = await axios.delete(`https://localhost:5000/api/Cart?productid=${productId}&userid=${userId}`);
    return status
}

export const clearCartByUserId = async (userId) => {
    const { status } = await axios.delete(`https://localhost:5000/api/Cart/All?userid=${userId}`);
    return status
}

export const getProductById = createAsyncThunk('detailsProduct/getProductById', async (id) => {
    const { data }  = await axios.get(`https://localhost:5000/api/Product/GetById?productid=${id}`);
    return data
});

export const fetchComments = createAsyncThunk('detailsProduct/fetchComments', async ({productId, page}) => {
    const { data }  = await axios.get(`https://localhost:5000/api/Comment/GetComments?id=${productId}&page=${page}`);
    return data
});

export const fetchReviews = createAsyncThunk('detailsProduct/fetchReviews', async ({productId, page}) => {
    const { data }  = await axios.get(`https://localhost:5000/api/ProductReview/GetReviews?productid=${productId}&page=${page}`);
    return data
});

export const getMyReview = createAsyncThunk('detailsProduct/getMyReview', async ({productId, userId}) => {
    const { data }  = await axios.get(`https://localhost:5000/api/ProductReview/GetMyReviews?productid=${productId}&userid=${userId}&page=${1}`);
    return data
});

export const putMyReview = createAsyncThunk('detailsProduct/putMyReview', async ({userId, productId, text, rating}) => {
    const { data }  = await axios.post(`https://localhost:5000/api/ProductReview/Create?productid=${productId}&userid=${userId}&text=${text}&rating=${rating}&title=title`);
    return data
});

export const putComment = createAsyncThunk('detailsProduct/putMyReview', async ({userId, productId, text }) => {
    const { data }  = await axios.post(`https://localhost:5000/api/Comment/create?userid=${userId}&productid=${productId}&message=${text}`);
    return data
});

export const fetchShop = createAsyncThunk('profile-page/fetchShop', async ({userId}) => {
    const { data }  = await axios.get(`https://localhost:5000/api/Profile/my?userid=${userId}`);
    return data
});

export const fetchOrders = createAsyncThunk('profile-page/fetchOrders', async ({userId}) => {
    const { data }  = await axios.get(`https://localhost:5000/api/Profile/user/orders?userid=${userId}`);
    return data
});

export const fetchShopProducts= createAsyncThunk('profile-page/fetchShopProducts', async ({userId}) => {
    const { data }  = await axios.get(`https://localhost:5000/api/Profile/Products?userid=${userId}`);
    return data
});

export const fetchRevies= createAsyncThunk('profile-page/fetchRevies', async ({userId}) => {
    const { data }  = await axios.get(`https://localhost:5000/api/Profile/Reviews?userid=${userId}`);
    return data
});

export const putSeller = async ({userId, name, description, number, country, city, street, housenumber, postalCode }) => {
    const { status }  = await axios.post(`https://localhost:5000/api/Profile?userid=${userId}&name=${name}&description=${description}&number=${number}&country=${country}&city=${city}&street=${street}&housenumber=${housenumber}&postalcode=${postalCode}`);
    return status
};

export const putUser = async ({userId, firstname, lastname, mobile }) => {
    const { status }  = await axios.put(`https://localhost:5000/api/User/update?id=${userId}&firstname=${firstname}&lastname=${lastname}&mobile=${mobile}`);
    return status
};

export const getTags = createAsyncThunk('tags/getTags', async () => {
    const { data }  = await axios.get(`https://localhost:5000/api/Tag`);
    return data
});

export const putProduct = async ({ userId, name, description, price, url, categoryId, tagsid }) => {
    const { status } = await axios.post(`https://localhost:5000/api/Product/create?userid=${userId}&name=${name}&description=${description}&price=${price}&url=${url}&categoryId=${categoryId}&tagsid=${tagsid}`)
    return status
}


export const updateProduct = async ({userId,productId, price, url, tagsid }) => {
    const {status} = await axios.put(`https://localhost:5000/api/Product/update?userid=${userId}&productid=${productId}&price=${price}&url=${url}&tagsid=${tagsid}`)
    return status
}


export const sendEmail = async ({userEmail, customerEmail, message }) => {
    const {status} = await axios.post(`https://localhost:5000/api/Email?from=${userEmail}&to=${customerEmail}&message=${message}`)
    return status
}

export const createOrder = async ({userId, statusid, orderId, price}) => {
    const {status} = await axios.post(`https://localhost:5000/api/Order?userid=${userId}&status=${statusid}&code=${orderId}&amount=${price}`)
    return {status}
}
export const searchByText = createAsyncThunk('products/fetchProducts', async ({text, page}) => {
    const { data }  = await axios.get(`https://localhost:5000/api/Product/SearchBy?text=${text}&page=${page}`);
    return data
});

export const getCountOfProductsBySearch = createAsyncThunk('filters/getCountOfProductsByCategory', async ({text, page}) => {
    const { data }  = await axios.get(`https://localhost:5000/api/Product/SearchCount?text=${text}&page=${page}`);
    return data
});

export const getOrderItems = createAsyncThunk('orderItems/getOrderItems', async ({orderId}) => {
    const { data }  = await axios.get(`https://localhost:5000/api/Profile/OrderDetails?orderid=${orderId}`);
    return data
});

export const createTag = async ( {text} ) => {
    const {status} = await axios.post(`https://localhost:5000/api/Tag?text=${text}`)
    return status
}

export const createCategory = async({text,description}) =>{
    const  {status} = await axios.put(`https://localhost:5000/api/Category/NewCategory?name=${text}&description=${description}`)
    return status
}