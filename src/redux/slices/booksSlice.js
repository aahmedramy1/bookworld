import { createSlice } from "@reduxjs/toolkit";
import booksData from "../../data/books.json"; // Ensure this path is correct

const booksSlice = createSlice({
    name: "books",
    initialState: booksData,
    reducers: {
        addBook: (state, action) => {
            state.push(action.payload);
        },
        editBook: (state, action) => {
            const { id, name, pageCount, authorId, storeIds } = action.payload;
            const book = state.find((b) => b.id === id);
            if (book) {
                book.name = name;
                book.pageCount = pageCount;
                book.authorId = authorId;
                book.storeIds = storeIds;
            }
        },
        removeBook: (state, action) => {
            return state.filter((b) => b.id !== action.payload);
        },
    },
});

export const { addBook, editBook, removeBook } = booksSlice.actions;
export default booksSlice.reducer;
