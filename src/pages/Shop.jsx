import {useDispatch, useSelector} from "react-redux";
import BookCard from "../components/BookCard";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {debounce} from "lodash";
import {filterBooksByName} from "../redux/slices/booksSlice";

const Shop = () => {
    const [search, setSearch] = useState("");
    const books = useSelector(state => state.books.filteredBooks);
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

    const handleChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        debouncedSearch(value);
    };

    return (
        <div className="flex flex-col gap-6 max-h-full">
            <div className='flex justify-between items-center'>
                <div className='text-2xl font-[500]'>Browse Books</div>
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
            <div className="grid grid-cols-3 gap-4 overflow-auto pb-6 pl-2">
                {
                    books.map(book => (
                        <BookCard book={book} key={book.id} />
                    ))
                }
            </div>
        </div>
    )
}
export default Shop;