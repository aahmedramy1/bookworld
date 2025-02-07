import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GenericList from "../components/GenericList";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterStoresByName} from "../redux/slices/storesSlice";
import {debounce} from "lodash";

const Stores = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [search, setSearch] = useState("");
    const data = useSelector(state => state.stores.filteredStores);
    const dispatch = useDispatch();

    const onSearch = useCallback((searchTerm) => {
        dispatch(filterStoresByName(searchTerm));
    }, [dispatch]);

    const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const columns = [
        { field: 'id', headerName: 'Store ID' },
        { field: 'name', headerName: 'Name' },
        { field: 'address', headerName: 'Address' },
        {
            headerName: 'Actions',
            actions: [
                {
                    label: 'Edit',
                    onClick: (row) => {
                        console.log('Edit clicked for:', row);
                    }
                },
                {
                    label: 'Delete',
                    onClick: (row) => {
                        console.log('Delete clicked for:', row);
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

    return (
        <div className="flex flex-col gap-6 max-h-full">
            <div className="flex gap-6 items-center">
                <div className="text-black font-bold text-2xl">
                    Stores List
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
            <div className="overflow-auto">
                <GenericList
                    data={data}
                    columns={columns}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
        </div>
    );
}

export default Stores;