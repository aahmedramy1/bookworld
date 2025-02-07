import {createSlice} from "@reduxjs/toolkit";
import storesData from '../../data/stores.json';

const storesSlice = createSlice({
    name: "stores",
    initialState: {
        allStores: storesData,
        filteredStores: storesData,
    },
    reducers: {
        addStore: (state, action) => {
            state.allStores.push(action.payload);
            state.filteredStores.push(action.payload);
        },
        editStore: (state, action) => {
            const {id, name, address} = action.payload;
            const store = state.allStores.find((s) => s.id === id);
            if (store) {
                store.name = name;
                store.address = address;
            }
            state.filteredStores = state.allStores;
        },
        removeStore: (state, action) => {
            state.allStores = state.allStores.filter((s) => s.id !== action.payload);
            state.filteredStores = state.filteredStores.filter((s) => s.id !== action.payload);
        },
        filterStoresByName: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredStores = state.allStores.filter((store) =>
                store.name.toLowerCase().includes(searchTerm)
            );
        },
    }
})

export const {addStore, editStore, removeStore, filterStoresByName} = storesSlice.actions;
export default storesSlice.reducer;