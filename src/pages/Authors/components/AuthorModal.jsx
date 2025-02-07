import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";

const AuthorModal = ({ open, handleClose, author, handleSave}) => {
    const [error, setError] = useState("");

    const [authorData, setAuthorData] = useState({
        name: "",
    })

    useEffect(() => {
        if (author) {
            setAuthorData(author);
        } else {
            setAuthorData({ name: "" });
        }
    }, [author]);

    useEffect(() => {
        setError("");
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthorData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!authorData.name ) {
            setError("All fields are required.");
            return;
        }

        handleSave(authorData);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
            <DialogTitle sx={{ backgroundColor: "#c1501f", color: "white" }}>
                {author ? "Edit Author" : "New Author"}
            </DialogTitle>
            <DialogContent className='flex flex-col gap-2 mt-4'>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <div className='flex flex-col gap-2'>
                    <div>Book Name</div>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Enter Author Name"
                        name="name"
                        className='bg-gray-100 !m-0'
                        value={authorData.name}
                        onChange={handleChange}
                        size="small"
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

export default AuthorModal;