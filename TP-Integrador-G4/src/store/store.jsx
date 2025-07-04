import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice.jsx";
import favoritesReducer from "./favoritesSlice.jsx";
import usersReducer from "./usersSlice.jsx"


export default configureStore({
    reducer:{
        products: productsReducer,
        favorites: favoritesReducer,
        users: usersReducer,
    },
});