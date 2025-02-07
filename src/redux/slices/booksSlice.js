import { createSlice } from "@reduxjs/toolkit";
import booksData from "../../data/books.json";

const booksSlice = createSlice({
    name: "books",
    initialState: {
        allBooks: booksData,
        filteredBooks: booksData,
    },
    reducers: {
        addBook: (state, action) => {
            const newBook = {
                ...action.payload,
                id: state.allBooks.length ? state.allBooks[state.allBooks.length - 1].id + 1 : 1,
            };
            state.allBooks.push(newBook);
            state.filteredBooks.push(newBook);
        },
        editBook: (state, action) => {
            const { id, name, pageCount, authorId, storeIds } = action.payload;
            const book = state.allBooks.find((b) => b.id === id);
            if (book) {
                book.name = name;
                book.pageCount = pageCount;
                book.authorId = authorId;
                book.storeIds = storeIds;
            }
            state.filteredBooks = state.allBooks;
        },
        removeBook: (state, action) => {
            state.allBooks = state.allBooks.filter((b) => b.id !== action.payload);
            state.filteredBooks = state.filteredBooks.filter((b) => b.id !== action.payload);
        },
        filterBooksByName: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredBooks = state.allBooks.filter((book) =>
                book.name.toLowerCase().includes(searchTerm)
            );
        },
    },
});

export const { addBook, editBook, removeBook, filterBooksByName } = booksSlice.actions;
export default booksSlice.reducer;
