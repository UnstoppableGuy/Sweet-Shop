import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit"
import { getProductById, fetchComments, fetchReviews } from "../requests";
import { getMyReview } from "../requests";

const initialState = {
    rating: 0,
    product: {
        id : "00000000-0000-0000-0000-000000000000",
        name: '',
        description: '',
        price: 0,
    },
    shop: {
        id: "00000000-0000-0000-0000-000000000000",
        userId: "00000000-0000-0000-0000-000000000000",
        name: '',
        ipNumber: '',
        description: ''
    },
    address:{
        id: "00000000-0000-0000-0000-000000000000",
        country: '',
        city : '',
        street: '',
        houseNumber: '',
        postalCode: '',
        shopId: "00000000-0000-0000-0000-000000000000" 
    },
    images: [{
        id: "00000000-0000-0000-0000-000000000000",
        url : '',
    },],
    feedBack:{
        page: 1,
        items: []
    },
    myReview:{
        id: "00000000-0000-0000-0000-000000000000",
        title: '',
        text: '',
        rating: 0,
        publishedAt: '',
        productId : "00000000-0000-0000-0000-000000000000",
        email: ''
    }

}

const detailsProductSlice = createSlice({
    name: 'detailsProduct',
    initialState,
    reducers: {
        setFeedbackPage(state, action){
            state.feedBack.page = action.payload;
        },

        updateMyReviewText(state, action){
            state.myReview.text = action.payload;
        },

        updateMyReviewRating(state, action){
            state.myReview.rating = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.rating = action.payload.rating;
            state.product = action.payload.product;
            state.address = action.payload.address;
            state.shop = action.payload.shop;
            state.images = action.payload.images;
        });

        builder.addCase(getProductById.rejected, (state, action) => {
            state.images = [];
            state.rating = 0;
            state.product ={
                id : "00000000-0000-0000-0000-000000000000",
                name: '',
                description: '',
                price: 0,
            };
            state.shop = {
                id: "00000000-0000-0000-0000-000000000000",
                userId: "00000000-0000-0000-0000-000000000000",
                name: '',
                ipNumber: '',
                description: ''
            };
        });

        builder.addCase(fetchComments.fulfilled, (state, action) => {
            if(action.payload === [] && state.feedBack.page > 1)
            {
                state.feedBack.page = state.feedBack.page - 1;
                console.log('error');
            }
            else{
                state.feedBack.items = action.payload;
            }
        });

        builder.addCase(fetchComments.rejected, (state, action) => {
            state.feedBack.items = [];
        });

        builder.addCase(fetchComments.pending, (state, action) => {
            state.feedBack.items = [];
            state.feedBack.page  = 1;
        });

        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            if(action.payload === [] && state.feedBack.page > 1)
            {
                state.feedBack.page = state.feedBack.page - 1;
                console.log('error');
            }
            else{
                state.feedBack.items = action.payload;
            }
            
        });

        builder.addCase(fetchReviews.rejected, (state, action) => {
            state.feedBack.items = [];
        });

        builder.addCase(fetchReviews.pending, (state, action) => {
            state.feedBack.items = [];
            state.feedBack.page  = 1;
        });

        builder.addCase(getMyReview.fulfilled, (state, action) => {
            if(action.payload.length > 0)
                state.myReview = action.payload[0];
        });
    },

})

export const { setFeedbackPage, updateMyReviewText, updateMyReviewRating } = detailsProductSlice.actions;
export const selectProduct = (state) => ({ product: state.detailsProduct.product, shop : state.detailsProduct.shop});
export const selectRating = (state) => state.detailsProduct.rating;
export const selectImages = (state) => state.detailsProduct.images;
export const selectFeedback = (state) => state.detailsProduct.feedBack;
export const selectProductId = (state) => state.detailsProduct.product.id;
export const selectMyReview = (state) => state.detailsProduct.myReview;
export const selectAddress = (state) => state.detailsProduct.address.country + ' ,' + state.detailsProduct.address.city + ' ,' + state.detailsProduct.address.street + ' ,' + state.detailsProduct.address.houseNumber ;
export default detailsProductSlice.reducer;