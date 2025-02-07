import React from "react";
import { FaStore, FaSignOutAlt, FaFeather, FaBookOpen } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { Link, useLocation } from "react-router-dom"; // <-- Import useLocation

const Sidebar = () => {
    const location = useLocation(); // <-- Get current path

    const menuItems = [
        { icon: <MdGridView />, text: "Shop", path: "/shop" },
        { icon: <FaStore />, text: "Stores", path: "/stores" },
        { icon: <FaFeather />, text: "Author", path: "/authors" },
        { icon: <FaBookOpen />, text: "Books", path: "/admin/books" },
    ];

    return (
        <aside className="w-1/5 h-screen bg-white text-gray-500 flex flex-col">
            <div className="p-4 text-lg font-bold text-black">
                Book <span className="font-normal">World</span>
            </div>
            <nav className="flex-1">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path; // <-- Check if current path matches

                        return (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    className={`p-3 flex items-center ${
                                        isActive ? "bg-primary text-white font-bold" : "hover:bg-primary hover:text-white"
                                    }`}
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.text}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="p-3 hover:bg-primary hover:text-white flex items-center cursor-pointer">
                <FaSignOutAlt className="mr-2" /> Logout
            </div>
        </aside>
    );
};

export default Sidebar;
