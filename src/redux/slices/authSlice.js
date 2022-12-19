import { createSlice } from "@reduxjs/toolkit"
import { loginRequest } from "../requests";



const initialState = {
    isAuthenticated: false,
    profile: {
        id: "00000000-0000-0000-0000-000000000000",
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        isAdmin: 0,
    }
}

const authSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setStatus(state, action){
            state.isAuthenticated = action.payload;
        },

        setProfile(state, action){
            state.profile = action.payload;
        },

        logout(state, action){
            state.profile = {
                id: "00000000-0000-0000-0000-000000000000",
                firstName: '',
                lastName: '',
                email: '',
                mobileNumber: '',
                isAdmin: 0,
            };
            state.isAuthenticated = false;
        },
        updateProfile(state, action){
            state.profile.firstName = action.payload.firstName;
            state.profile.lastName = action.payload.lastName;
            state.profile.mobileNumber = action.payload.mobileNumber;;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(loginRequest.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.profile = action.payload;
        });

        builder.addCase(loginRequest.rejected, (state, action) => {
            state.isAuthenticated = false
            state.profile = action.payload;
            alert('Authentication failed. Please try again');
        });
    }

})

export const { setStatus, setProfile, logout, updateProfile } = authSlice.actions;
export const selectAuthStatus = (state) => state.auth.isAuthenticated;
export const selectProfile = (state) => state.auth.profile;

export default authSlice.reducer;