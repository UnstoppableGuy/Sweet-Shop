import { createSlice } from "@reduxjs/toolkit"
import { getOrderItems } from "../requests"

//example of cart items collection
const item = {
    id : '00000000-0000-0000-0000-000000000000',
    name: '',
    description: '',
    price: 0,
    image: '',
    count: 0
}

const initialState = {
    items: [],
    totalAmount: 0,
}

const orderSlice = createSlice({
    name: 'orderItems',
    initialState,
    reducers: {
        userLogout(state, action){
            state.items = [];
            state.totalAmount = 0;
        }
    },

    extraReducers: (builder) => {

        builder.addCase(getOrderItems.pending, (state, action) => {
            state.items = [];
            state.totalAmount = calcTotalPrice(state.items);
        });

        builder.addCase(getOrderItems.fulfilled, (state, action) => {
            const tempArray = action.payload;

            tempArray.map((cartItem) => {
                state.items.push({
                    id : cartItem.productid,
                    name: cartItem.name,
                    description: cartItem.description,
                    price: cartItem.price,
                    image: cartItem.image.url,
                    count: cartItem.qty
                });   
            })

            state.totalAmount = calcTotalPrice(state.items);
        });

        builder.addCase(getOrderItems.rejected, (state, action) => {
            state.items = [];
            state.totalAmount = calcTotalPrice(state.items);
        });
    },

})

export const { userLogout } = orderSlice.actions;
export const calcCountOfProducts = (state) => state.order.items.reduce((sum, item) => sum + item.count, 0)
export const calcTotalPrice = (items) => items.reduce((sum, item) => item.price * item.count + sum, 0);
export const selectStatus = (state) => state.order.items.length !== 0;
export const selectOrderDetails = (state) => state.order.items;
export const selectTotalAmount = (state) => state.order.totalAmount;

export default orderSlice.reducer;