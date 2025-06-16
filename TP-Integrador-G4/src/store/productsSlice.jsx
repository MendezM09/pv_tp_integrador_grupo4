import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
export const fetchProducts = createAsyncThunk("fetchProducts", async()=>{
    const response = await fetch ("https://fakestoreapi.com/products");
    const products = await response.json();
    return products;
});

const productsSlice = createSlice({
    name: "Products", 
    initialState:{
        entities: [],
    },
    reducers:{
        add(state, action){
            state.entities.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled(), (state, action)=>{
            state.entities=[...state.entities, ...action.payload];

        })
    }

});
export const {add} = productsSlice.actions;
export default productsSlice.reducer;