import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import booksReducer from "./slices/booksSlice";
import authorsReducer from "./slices/authorSlice";
import storesReducer from "./slices/storesSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    books: booksReducer,
    authors: authorsReducer,
    stores: storesReducer,
});

const persistConfig = {
    key: "root", // Root key for storage
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
