import {  Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Books from "../pages/Books";


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/books" element={<Books />} />
            <Route path="*" element={<Navigate to="/shop" replace />} />
        </Routes>
    );
};

export default AppRouter;
