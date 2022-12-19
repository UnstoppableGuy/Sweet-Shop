import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import auth from './slices/authSlice'
import cart from './slices/cartSlice'
import categories from './slices/categorySlice'
import product from './slices/productSlice'
import detailsProduct from './slices/detailsProductSlice'
import profile from './slices/profileSlice'
import storage from 'redux-persist/lib/storage'
import transit from './slices/transitSlice'
import { persistReducer, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import tag from './slices/tagSlice'
import order from './slices/orderSlice'

const rootReducer = combineReducers({
    filter, 
    auth,
    cart,
    categories,
    product,
    detailsProduct,
    profile,
    transit,
    tag,
    order
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'profile']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

export default store;
