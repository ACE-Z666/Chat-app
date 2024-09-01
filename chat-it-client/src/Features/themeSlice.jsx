import { createSlice } from "@reduxjs/toolkit";


export const themeSlice = createSlice({
    name: "themeSlice",
    initialState: {light : true},
    reducers: {
        toggleTheme: (state) => {

                 state.light  = !state.light;
            },
        },
    })

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
