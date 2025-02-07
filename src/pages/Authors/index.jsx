import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GenericList from "../../components/GenericList";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {debounce} from "lodash";
import {addAuthor, editAuthor, filterAuthorsByName, removeAuthor} from "../../redux/slices/authorSlice";
import AuthorModal from "./components/AuthorModal";

const Index = () => {
    const [authorModalOpen, setAuthorModalOpen] = useState(false);
    const [authorToEdit, setAuthorToEdit] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [search, setSearch] = useState("");
    const data = useSelector(state => state.authors.filteredAuthors)
    const dispatch = useDispatch();

    const onSearch = useCallback((searchTerm) => {
        dispatch(filterAuthorsByName(searchTerm));
    }, [dispatch]);

    const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const columns = [
        { field: 'id', headerName: 'Author ID' },
        { field: 'name', headerName: 'Name' },
        {
            headerName: 'Actions',
            actions: [
                {
                    label: 'Edit',
                    onClick: (row) => {
                        setAuthorModalOpen(!authorModalOpen);
                        setAuthorToEdit(row);
                    }
                },
                {
                    label: 'Delete',
                    onClick: (row) => {
                        dispatch(removeAuthor(row.id));
                    }
                }
            ]
        }
    ];

    const handleSelectionChange = (newSelectedRows) => {
        setSelectedRows(newSelectedRows);
        console.log('Selected rows:', newSelectedRows);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        debouncedSearch(value);
    };

    const handleSave = (authorData) => {
        if(authorData.id) {
            dispatch(editAuthor(authorData));
        } else {
            dispatch(addAuthor(authorData));
        }
    }

    const addNewAuthor = () => {
        setAuthorModalOpen(true);
        setAuthorToEdit(null);
    }

    return (
        <div className="flex flex-col gap-6 max-h-full">
            <div className='flex justify-between items-center'>
                <div className="flex gap-6 items-center">
                    <div className="text-black font-bold text-2xl">
                        Authors List
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
                    onClick={addNewAuthor}
                >
                    Add New Author
                </button>
            </div>
            <div className="overflow-auto">
                <GenericList
                    data={data}
                    columns={columns}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <AuthorModal
                open={authorModalOpen}
                author={authorToEdit}
                handleClose={() => setAuthorModalOpen(false)}
                handleSave={handleSave}
            />
        </div>
    );
}

export default Index;