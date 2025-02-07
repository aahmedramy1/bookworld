import React, { useState } from 'react';
import GenericList from '../components/GenericList';
import {useSelector} from "react-redux";

const Books = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const data = useSelector(state => state.books);

    const columns = [
        {field: 'id', headerName: 'Book ID'},
        { field: 'name', headerName: 'Name' },
        {field: 'pageCount', headerName: 'Pages'},
        {field: 'authorId', headerName: 'Author'},
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

    return (
        <div>
            <GenericList
                data={data}
                columns={columns}
                onSelectionChange={handleSelectionChange}
            />
        </div>
    );
};

export default Books;
