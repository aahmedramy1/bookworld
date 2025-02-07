import {  Routes, Route, Navigate } from 'react-router-dom';
import Shop from '../pages/Shop';
import Books from "../pages/Books";
import Authors from "../pages/Authors";
import Stores from "../pages/Stores";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/shop/books" element={<Shop />} />
            <Route path="/admin/books" element={<Books />} />
            <Route path='/admin/stores' element={<Stores />} />
            <Route path="/admin/authors" element={<Authors />} />
            <Route path="*" element={<Navigate to="/shop" replace />} />
        </Routes>
    );
};

export default AppRouter;
