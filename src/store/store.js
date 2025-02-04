import {configureStore} from '@reduxjs/toolkit';
import srqSlice from './srqSlice';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        srq : srqSlice,
        auth: authSlice
        //TODO: add more slices here 
    }
});


export default store;