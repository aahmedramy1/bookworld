import {createSlice} from "@reduxjs/toolkit";
import authorsData from "../../data/authors.json";

const authorsSlice = createSlice({
    name: 'authors',
    initialState: {
        allAuthors: authorsData,
        filteredAuthors: authorsData,
    },
    reducers: {
        addAuthor: (state, action) => {
            const newAuthor = {
                ...action.payload,
                id: state.allAuthors.length ? state.allAuthors[state.allAuthors.length - 1].id + 1 : 1,
            };
            state.allAuthors.push(newAuthor);
            state.filteredAuthors.push(newAuthor);
        },
        editAuthor: (state, action) => {
            const {id, name} = action.payload;
            const author = state.allAuthors.find((a) => a.id === id);
            if (author) {
                author.name = name;
            }
            state.filteredAuthors = state.allAuthors;
        },
        removeAuthor: (state, action) => {
            state.allAuthors = state.allAuthors.filter((a) => a.id !== action.payload);
            state.filteredAuthors = state.filteredAuthors.filter((a) => a.id !== action.payload);
        },
        filterAuthorsByName: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredAuthors = state.allAuthors.filter((author) =>
                author.name.toLowerCase().includes(searchTerm)
            );
        },
    }
})

export const {addAuthor, editAuthor, removeAuthor, filterAuthorsByName} = authorsSlice.actions;
export default authorsSlice.reducer;