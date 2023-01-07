import { configureStore } from "@reduxjs/toolkit"; 
import cartReducer from "./slices/cartSlice";

//config store
const store = configureStore({
    reducer : {
        cart: cartReducer,
    }
})

export default store