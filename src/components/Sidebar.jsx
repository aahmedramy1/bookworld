import React from "react";
import { FaHome, FaBook, FaUser, FaStore, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {

    const menuItems = [
        { icon: <FaHome />, text: "Home" },
        { icon: <FaBook />, text: "Books" },
        { icon: <FaStore />, text: "Stores" },
        { icon: <FaUser />, text: "Authors" }
    ];

    return (
        <aside className="w-1/5 h-screen bg-white text-gray-500 flex flex-col">
            <div className="p-4 text-lg font-bold text-black">Book <span className="font-normal">World</span></div>
            <nav className="flex-1">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index} className="p-3 hover:bg-primary hover:text-white hover:cursor hover:cursor-pointer flex items-center ">
                            {item.icon}
                            <span className="ml-2">{item.text}</span>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-3 hover:bg-primary hover:text-white flex items-center cursor-pointer">
                <FaSignOutAlt className="mr-2" /> Logout
            </div>
        </aside>
    );
};

export default Sidebar;
