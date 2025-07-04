import { createSlice } from "@reduxjs/toolkit";

const initialState =[
    {id:"1", username:"user",email:"user@gmail.com", password: "user"},
];

const usersSlice = createSlice({
    name: "users",
    initialState:{
        entities: initialState,
    },
    
    reducers:{
        add(state,action){
            state.entities.push(action.payload);
        }
    },
});

export const {add} = usersSlice.actions;

export default usersSlice.reducer;
