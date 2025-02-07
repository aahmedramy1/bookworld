import React, {useEffect, useState} from "react";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

const StoreModal = ({ open, handleClose, store, handleSave}) => {
    const [error, setError] = useState("");

    const [storeData, setStoreData] = useState({
        name: "",
        address: "",
    });

    useEffect(() => {
        if (store) {
            setStoreData(store);
        } else {
            setStoreData({ name: "", address: "" });
        }
    }, [store]);

    useEffect(() => {
        setError("");
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoreData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!storeData.name || !storeData.address ) {
            setError("All fields are required.");
            return;
        }

        handleSave(storeData);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
            <DialogTitle sx={{ backgroundColor: "#c1501f", color: "white" }}>
                {store ? "Edit Store" : "New Store"}
            </DialogTitle>
            <DialogContent className='flex flex-col gap-2 mt-4'>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <div className='flex flex-col gap-2'>
                    <div>Store Name</div>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Enter Store Name"
                        name="name"
                        className='bg-gray-100 !m-0'
                        value={storeData.name}
                        onChange={handleChange}
                        size="small"
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <div>Store Address</div>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Enter Store Address"
                        className='bg-gray-100 !m-0'
                        size="small"
                        name="address"
                        value={storeData.address}
                        onChange={handleChange}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant='outlined'>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default StoreModal;