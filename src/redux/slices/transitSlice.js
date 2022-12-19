import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    textResponse : '',
    emailResponse : '',
    product: {
        id : '',
        name: '',
        description: '',
        price: '',
        image: [],
        tags: []
    },
    orderId : '',

}

const transitSlice = createSlice({
    name: 'buffer',
    initialState,
    reducers: {
        setTextResponse(state, action){
            state.textResponse = action.payload;
        },
        setEmailResponse(state, action){
            state.emailResponse = action.payload;
        },
        setProduct(state, action){
            state.product = action.payload;
        },
        setOrder(state, action){
            state.orderId = action.payload;
        }
    },

    extraReducers: (builder) => {

    },

})

export const { setTextResponse, setEmailResponse, setProduct, setOrder } = transitSlice.actions;
export const selectEmailResponse = (state) => state.transit.emailResponse;
export const selectProduct = (state) => state.transit.product;
export const selectTextResponse = (state) => state.transit.textResponse;
export const selectOrder = (state) => state.transit.orderId;
export default transitSlice.reducer;