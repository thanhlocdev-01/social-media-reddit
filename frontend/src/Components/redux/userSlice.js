import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState:{
        username: "thanhloc2909",
        name: 'john',
        age: '21',
        about: "I'm a software engineer",
        avaUrl: 'https://preview.redd.it/fc9k38jwfwv51.png?auto=webp&s=9ce3d4c488091bb21969fd0fad7a6d89e4bfc50d',
        theme: '#ff9051',
        pending: false,
        error: false,
        theme: "#ff9051",
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

            state.name = action.payload.displayName;
            state.username = action.payload.username;
            state.age = action.payload.age;
            state.about = action.payload.about;
            state.avaUrl = action.payload.avaUrl;
            state.theme = action.payload.theme;
        },
        updateError: (state) => {
            state.error = true;
            state.pending = false;
          },
    }
})

export const {updateStart, updateSuccess, updateError} = userSlice.actions;
export default userSlice.reducer;