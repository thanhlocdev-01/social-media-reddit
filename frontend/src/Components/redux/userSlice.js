import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState:{
        name: 'john',
        age: '21',
        about: "I'm a software engineer",
        avaUrl: 'https://preview.redd.it/fc9k38jwfwv51.png?auto=webp&s=9ce3d4c488091bb21969fd0fad7a6d89e4bfc50d',
        theme: '#ff9051',
        pending: false,
        error: false
    },
    reducers:{
        updateStart: (state) => {
            state.pending = true;
        },
        updateError: (state) => {
            state.pending = false;
            state.error = true;
        },
        updateSuccess: (state, action) => {
            state.pending = false;
            state.error = false;

            state.name = action.payload.name;
            state.age = action.payload.age;
            state.about = action.payload.about;
            state.avaUrl = action.payload.avaUrl;
            state.theme = action.payload.theme;
        }
    }
})

export const {updateStart, updateError, updateSuccess} = userSlice.actions;
export default userSlice.reducer;