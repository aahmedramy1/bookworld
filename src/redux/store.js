import { configureStore } from '@reduxjs/toolkit';
import booksReducer from "./slices/booksSlice";
import authorsReducer from "./slices/authorSlice";

export const store = configureStore({
    reducer: {
        books: booksReducer,
        authors: authorsReducer,
    },
});

export default store;
