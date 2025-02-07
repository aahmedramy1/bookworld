import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GenericList from "../../components/GenericList";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addStore, editStore, filterStoresByName, removeStore} from "../../redux/slices/storesSlice";
import {debounce} from "lodash";
import StoreModal from "./components/StoreModal";

const Index = () => {
    const [storeModalOpen, setStoreModalOpen] = useState(false);
    const [storeToEdit, setStoreToEdit] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [search, setSearch] = useState("");
    const data = useSelector(state => state.stores.filteredStores);
    const dispatch = useDispatch();

    const onSearch = useCallback((searchTerm) => {
        dispatch(filterStoresByName(searchTerm));
    }, [dispatch]);

    const handleSave = (storeData) => {
        if(storeData.id) {
            dispatch(editStore(storeData));
        } else {
            dispatch(addStore(storeData));
        }
    }

    const addNewStore = () => {
        setStoreToEdit(null);
        setStoreModalOpen(true);
    }

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
                       setStoreModalOpen(!storeModalOpen);
                       setStoreToEdit(row);
                    }
                },
                {
                    label: 'Delete',
                    onClick: (row) => {
                        dispatch(removeStore(row.id));
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
            <div className='flex justify-between items-center'>
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
                <button
                    className="bg-primary text-white rounded px-4 py-2"
                    onClick={addNewStore}
                >
                    Add New Store
                </button>
            </div>
            <div className="overflow-auto">
                <GenericList
                    data={data}
                    columns={columns}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <StoreModal
                open={storeModalOpen}
                store={storeToEdit}
                handleClose={() => setStoreModalOpen(false)}
                handleSave={handleSave}
            />
        </div>
    );
}

export default Index;