import { createSlice } from "@reduxjs/toolkit"
import { getTags } from "../requests";

//example of items
const item = {
    id: '',
    text: ''
}

const initialState = {
    items: [],
    status: ''
}

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {

        builder.addCase(getTags.pending, (state, action) => {
            state.items = [];
            state.status = 'pending';
        });

        builder.addCase(getTags.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'successful';
        });

        builder.addCase(getTags.rejected, (state, action) => {
            state.items = [];
            state.status = 'error';
        });
    },

});

export const selectTags = (state) => state.tag.items;


export default tagsSlice.reducer;