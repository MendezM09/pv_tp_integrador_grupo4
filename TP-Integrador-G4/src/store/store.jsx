import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice.jsx";
import favoritesReducer from "./favoritesSlice.jsx";


export default configureStore({
    reducer:{
        products: productsReducer,
        favorites: favoritesReducer,
    },
});