import { configureStore } from "@reduxjs/toolkit";
import  themeSliceReducer  from "./themeSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {

        theme : themeSliceReducer,
        auth: authReducer,

    },
}); 

export default store;
