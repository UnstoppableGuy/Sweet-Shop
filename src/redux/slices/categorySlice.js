import { createSlice } from "@reduxjs/toolkit"
import { getCategories } from "../requests"

//example of items
const item = {
    id: '',
    title: '',
    description: ''
}

const initialState = {
    items: [],
    status: ''
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {

        builder.addCase(getCategories.pending, (state, action) => {
            state.items = [];
            state.status = 'pending';
        });

        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'successful';
        });

        builder.addCase(getCategories.rejected, (state, action) => {
            state.items.push({id: '00000000-0000-0000-0000-000000000000', title: 'All', description: 'All products'});
            state.status = 'error';
        });
    },

});

export const selectCategiries = (state) => state.categories.items;


export default categoriesSlice.reducer;