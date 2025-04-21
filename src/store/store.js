import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'; // Import your authSlice reducer


const Store = configureStore({
    reducer:{
        auth: authReducer,
    }
});

export default Store;