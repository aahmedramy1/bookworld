import {  Routes, Route, Navigate } from 'react-router-dom';
import Shop from '../pages/Shop';
import Books from "../pages/Books";
import Authors from "../pages/Authors";


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/shop/books" element={<Shop />} />
            <Route path="/admin/books" element={<Books />} />
            <Route path="/admin/authors" element={<Authors />} />
            <Route path="*" element={<Navigate to="/shop" replace />} />
        </Routes>
    );
};

export default AppRouter;
