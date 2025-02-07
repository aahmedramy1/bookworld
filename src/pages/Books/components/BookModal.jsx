import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    MenuItem,
    DialogActions,
    Button, Alert,
} from "@mui/material";
import {useSelector} from "react-redux";

const BookModal = ({ open, handleClose, book, handleSave }) => {
    const [error, setError] = useState("");
    const authors = useSelector(state => state.authors.allAuthors)

    const [bookData, setBookData] = useState({
        name: "",
        pages: "",
        author: "",
    });

    useEffect(() => {
        if (book) {
            setBookData(book);
        } else {
            setBookData({ name: "", pages: "", author: "" });
        }
    }, [book]);

    useEffect(() => {
        setError("");
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!bookData.name || !bookData.pageCount || !bookData.authorId) {
            setError("All fields are required.");
            return;
        }

        handleSave(bookData);
        handleClose();
    };


    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
            <DialogTitle sx={{ backgroundColor: "#c1501f", color: "white" }}>
                {book ? "Edit Book" : "New Book"}
            </DialogTitle>
            <DialogContent className='flex flex-col gap-2 mt-4'>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <div className='flex flex-col gap-2'>
                    <div>Book Name</div>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Enter Book Name"
                        name="name"
                        className='bg-gray-100 !m-0'
                        value={bookData.name}
                        onChange={handleChange}
                        size="small"
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <div>Number of pages</div>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Enter number of Pages"
                        className='bg-gray-100 !m-0'
                        size="small"
                        name="pageCount"
                        type="number"
                        value={bookData.pageCount}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <div>Author</div>
                    <TextField
                        select
                        fullWidth
                        margin="dense"
                        label="Select Author"
                        className='bg-gray-100 !m-0'
                        size="small"
                        name="authorId"
                        value={bookData.authorId}
                        onChange={handleChange}
                    >
                        {authors.map((author) => (
                            <MenuItem key={author.id} value={author.id}>
                                {author.name}
                            </MenuItem>
                        ))}
                    </TextField>
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
    );
};

export default BookModal;
