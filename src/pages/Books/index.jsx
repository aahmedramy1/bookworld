import React, { useState, useMemo, useEffect, useCallback } from 'react';
import GenericList from '../../components/GenericList';
import { useDispatch, useSelector } from "react-redux";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import {addBook, editBook, filterBooksByName, removeBook} from "../../redux/slices/booksSlice";
import BookModal from "./components/BookModal";

const Index = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [bookModalOpen, setBookModalOpen] = useState(false);
    const [bookToEdit, setBookToEdit] = useState(null);
    const [search, setSearch] = useState("");
    const data = useSelector(state => state.books.filteredBooks);
    const dispatch = useDispatch();

    const onSearch = useCallback((searchTerm) => {
        dispatch(filterBooksByName(searchTerm));
    }, [dispatch]);

    const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);


    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const columns = [
        { field: 'id', headerName: 'Book ID' },
        { field: 'name', headerName: 'Name' },
        { field: 'pageCount', headerName: 'Pages' },
        { field: 'authorId', headerName: 'Author' },
        {
            headerName: 'Actions',
            actions: [
                {
                    label: 'Edit',
                    onClick: (row) => {
                        setBookModalOpen(!bookModalOpen);
                        setBookToEdit(row);
                    }
                },
                {
                    label: 'Delete',
                    onClick: (row) => {
                        dispatch(removeBook(row.id));
                    }
                }
            ]
        }
    ];

    const handleSelectionChange = (newSelectedRows) => {
        setSelectedRows(newSelectedRows);
        console.log('Selected rows:', newSelectedRows);
    };

    const handleSave = (bookData) => {
        if(bookData.id) {
            dispatch(editBook(bookData));
        } else {
            dispatch(addBook(bookData));
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        debouncedSearch(value);
    };

    const addNewBook = () => {
        setBookToEdit(null);
        setBookModalOpen(true);
    }

    return (
        <div className="flex flex-col gap-6 max-h-full">
            <div className='flex justify-between items-center'>
                <div className="flex gap-6 items-center">
                    <div className="text-black font-bold text-2xl">
                        Books List
                    </div>
                    <TextField
                        className="bg-white rounded"
                        variant={"outlined"}
                        placeholder="Search"
                        value={search}
                        onChange={handleChange}
                        size="small"
                        sx={{
                            "& fieldset": { border: "none" },
                            "& .MuiOutlinedInput-root": { backgroundColor: "white" }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <button
                    className="bg-primary text-white rounded px-4 py-2"
                    onClick={addNewBook}
                >
                    Add New Book
                </button>
            </div>
            <div className="overflow-auto">
                <GenericList
                    data={data}
                    columns={columns}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <BookModal
                open={bookModalOpen}
                book={bookToEdit}
                handleClose={() => setBookModalOpen(false)}
                handleSave={handleSave}
            />
        </div>
    );
};

export default Index;
