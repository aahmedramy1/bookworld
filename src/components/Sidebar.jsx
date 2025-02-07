import React from "react";
import { FaStore, FaSignOutAlt, FaFeather, FaBookOpen } from "react-icons/fa";
import { MdGridView } from "react-icons/md";

const Sidebar = () => {

    const menuItems = [
        { icon: <MdGridView />, text: "Shop" },
        { icon: <FaStore />, text: "Stores" },
        { icon: <FaFeather />, text: "Author" },
        { icon: <FaBookOpen />, text: "Books" },
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
