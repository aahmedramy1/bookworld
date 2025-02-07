import { configureStore } from '@reduxjs/toolkit';
import booksReducer from "./slices/booksSlice";
import authorsReducer from "./slices/authorSlice";
import storesReducer from "./slices/storesSlice";

export const store = configureStore({
    reducer: {
        books: booksReducer,
        authors: authorsReducer,
        stores: storesReducer,
    },
});

export default store;
