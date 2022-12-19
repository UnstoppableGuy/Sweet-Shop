import { createSlice } from "@reduxjs/toolkit"
import { fetchProducts } from "../requests";

const initialState = {
    items: [],
    status: ''
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {

        builder.addCase(fetchProducts.pending, (state, action) => {
            state.items = [];
            state.status = 'pending';
        });

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            const tempArray = action.payload;
            console.log(tempArray);
            tempArray.map((fullProduct) => state.items.push(
                {
                id : fullProduct.product.id,
                name: fullProduct.product.name,
                description: fullProduct.product.description,
                price: fullProduct.product.price,
                image: fullProduct.images[0].url,
                tags: fullProduct.tags
            }));
            state.status = 'successful';

            if(state.items.length === 0)
                state.status = 'error';
        });

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.items = [];
            state.status = 'error';
        });
    },

})

export const { } = productSlice.actions;
export const getFetchedProducts = (state) => ({items: state.product.items, status: state.product.status })
export default productSlice.reducer;