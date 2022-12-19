import { createSlice } from "@reduxjs/toolkit"
import { getCountOfProductsByCategory } from "../requests";

const initialState = {
    categoryId: '00000000-0000-0000-0000-000000000000',
    searchValue: '',
    pageInfo: {
        currentPage: 1,
        totalRecords: 12,
        pageLimit: 12
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action){
            state.categoryId = action.payload;
        },

        setSearchValue(state, action){
            state.searchValue = action.payload;
        },

        setCurrentPage(state, action){
            state.pageInfo.currentPage = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getCountOfProductsByCategory.fulfilled, (state, action) => {
            if(action.payload >= 12)
                state.pageInfo.totalRecords = action.payload;
            else
                state.pageInfo.totalRecords = 12;
        });

        builder.addCase(getCountOfProductsByCategory.rejected, (state, action) => {
            state.pageInfo.totalRecords = 12;
        });
    },

})

export const { setCategoryId, setCurrentPage, setSearchValue } = filterSlice.actions;
export const selectActiveCategory = (state) => state.filter.categoryId;
export const selectCurrentPage = (state) => state.filter.pageInfo;
export const selectSearchValue = (state) => state.filter.searchValue;
export default filterSlice.reducer;