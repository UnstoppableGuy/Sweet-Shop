import { createSlice } from "@reduxjs/toolkit"
import { fetchShop, fetchShopProducts } from "../requests";
import { fetchOrders } from "../requests";
import { fetchRevies } from "../requests";

const orderItem = {
    id: "00000000-0000-0000-0000-000000000000",
    createdat: '',
    deliverydate: '',
    status: '',
    amount: '',
    address: {
        city:'',
        country:'',
        housenumber: '',
        postalCode:'',
        street: '',
    }
}

const productItemShop = {
    product: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "string",
        description: "string",
        price: 0
      },
      images: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          url: "string"
        }
      ],
      tags: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          text: "string"
        }
      ],
      categories: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          title: "string",
          description: "string"
        }
      ]
}


const initialState = {
    currentTab: 'main info',
    shopInfo:{
        name: '',
        description: '',
        ipNumber: '',
        city:'',
        country:'',
        housenumber: '',
        postalCode:'',
        street: ''
    },
    orders: [],
    shopProducts:[{
        product: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "",
            description: "",
            price: 0
          },
          images: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              url: ""
            }
          ],
          tags: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              text: ""
            }
          ],
          categories: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              title: "",
              description: ""
            }
          ]  
    }],
    reviews: [],
}

const profileSlice = createSlice({
    name: 'profile-page',
    initialState,
    reducers: {
        setCurrentTab(state, action){
            state.currentTab = action.payload;
        },
        clearProfilePage(state, action){
            state.currentTab = 'main info'
            state.shopInfo = {
                name: '',
                description: '',
                ipNumber: '',
                city:'',
                country:'',
                housenumber: '',
                postalCode:'',
                street: ''
            };
            state.orders = []
            state.shopProducts = []
            state.reviews = []
        },

        updateShop(state, action){
            state.shopInfo = action.payload;
        }

    },
    extraReducers: (builder) => {

        builder.addCase(fetchShop.pending, (state, action) => {
            state.shopInfo = {
                name: '',
                description: '',
                ipNumber: '',
                city:'',
                country:'',
                housenumber: '',
                postalCode:'',
                street: ''
            };
        });

        builder.addCase(fetchShop.fulfilled, (state, action) => {
            if(action.payload)
                state.shopInfo = action.payload;
            else{
                state.shopInfo = {
                    name: '',
                    description: '',
                    ipNumber: '',
                    city:'',
                    country:'',
                    housenumber: '',
                    postalCode:'',
                    street: ''
                };
            }   
        });

        builder.addCase(fetchShop.rejected, (state, action) => {
            state.shopInfo = {
                name: '',
                description: '',
                ipNumber: '',
                city:'',
                country:'',
                housenumber: '',
                postalCode:'',
                street: ''
            };
        });

        builder.addCase(fetchOrders.pending, (state, action) => {
            
            state.orders = [];
        });

        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        });

        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.orders = [];
        });

        builder.addCase(fetchShopProducts.pending, (state, action) => {
            state.shopProducts = [];
        });

        builder.addCase(fetchShopProducts.fulfilled, (state, action) => {
            state.shopProducts = action.payload;
        });

        builder.addCase(fetchShopProducts.rejected, (state, action) => {
            state.shopProducts = [];
        });

        builder.addCase(fetchRevies.pending, (state, action) => {
            state.reviews = [];
        });

        builder.addCase(fetchRevies.fulfilled, (state, action) => {
            state.reviews = action.payload;
            console.log(state.reviews)
        });

        builder.addCase(fetchRevies.rejected, (state, action) => {
            state.reviews = [];
        });
    },

})

export const { setCurrentTab, clearProfilePage, updateShop } = profileSlice.actions;
export const selectCurrentTab = (state) => state.profile.currentTab;
export const selectAddress = (state) => state.profile.shopInfo.country + ' ,' + state.profile.shopInfo.city + ' ,' + state.profile.shopInfo.street + ' ,' + state.profile.shopInfo.housenumber ;
export const selectShopInfo = (state) => state.profile.shopInfo;
export const selectorders = (state) => state.profile.orders;
export const selectShopProducts = (state) => state.profile.shopProducts;
export const selectReviews = (state) => state.profile.reviews;
export default profileSlice.reducer;