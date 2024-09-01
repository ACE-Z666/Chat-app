import { configureStore } from "@reduxjs/toolkit";
import  themeSliceReducer  from "./themeSlice";

const store = configureStore({
    reducer: {

        theme : themeSliceReducer,

    },
}); 

export default store
