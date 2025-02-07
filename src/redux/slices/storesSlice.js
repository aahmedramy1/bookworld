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
            const newStore = {
                ...action.payload,
                id: state.allStores.length ? state.allStores[state.allStores.length - 1].id + 1 : 1,
            };
            state.allStores.push(newStore);
            state.filteredStores.push(newStore);
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