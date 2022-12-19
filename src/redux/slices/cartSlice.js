import { createSlice } from "@reduxjs/toolkit"
import { fetchCartItems } from "../requests"
//example of cart items collection
const item = {
    id : '',
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

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action){
            const findItem = state.items.find((item) =>item.id  === action.payload.id);

            if(findItem) {
                findItem.count++;
            }
            else{
                state.items.push({...action.payload});
            }

            state.totalAmount = calcTotalPrice(state.items);
        },

        removeItem(state, action){
            state.items = state.items.filter((item) => item.id !== action.payload.id);
            state.totalAmount = calcTotalPrice(state.items);
        },

        minusItem(state, action){
            const findItem = state.items.find((item) => item.id === action.payload.id);

            if (findItem && findItem.count > 0) {
                findItem.count--;
            }

            if (findItem.count === 0)
                state.items = state.items.filter((item) => item.id !== findItem.id);    

            state.totalAmount = calcTotalPrice(state.items);
        },

        clearCart(state, action){
            state.items = [];
            state.totalAmount = 0;
        },

        userLogout(state, action){
            state.items = [];
            state.totalAmount = 0;
        }
    },

    extraReducers: (builder) => {

        builder.addCase(fetchCartItems.pending, (state, action) => {
            state.items = [];
            state.totalAmount = calcTotalPrice(state.items);
        });

        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            const tempArray = action.payload;
            // tempArray.map((cartItem) => {
                tempArray.map((cartItem) => {

            //     const findItem = state.items.find((item) =>item.id  === cartItem.productid);

            //     if(findItem) {
            //         findItem.count++;
            //     }
            //     else{
                    state.items.push({
                        id : cartItem.productid,
                        name: cartItem.name,
                        description: cartItem.description,
                        price: cartItem.price,
                        image: cartItem.image.url,
                        count: cartItem.qty
                    });
                // }
            })

            state.totalAmount = calcTotalPrice(state.items);
        });

        builder.addCase(fetchCartItems.rejected, (state, action) => {
            state.items = [];
            state.totalAmount = calcTotalPrice(state.items);
        });
    },

})

export const { addItem, removeItem, minusItem, clearCart, userLogout } = cartSlice.actions;
export const calcCountOfProducts = (state) => state.cart.items.reduce((sum, item) => sum + item.count, 0)
export const calcTotalPrice = (items) => items.reduce((sum, item) => item.price * item.count + sum, 0);

export const selectCartItemById = (id) => (state) => state.cart.items.find((item) => item.id === id);
export const selectStatus = (state) => state.cart.items.length !== 0;
export const selectCartDetails = (state) => state.cart.items;
export const selectTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;