import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AppRouter from "./router/routes";

function App() {
    return (
        <div className="flex h-screen ">
            <Sidebar />
            <div className="w-4/5 flex flex-col bg-gray-100 p-8">
                <Navbar />
                <div className="flex-1 p-6  overflow-auto">
                    <AppRouter />
                </div>
            </div>
        </div>
    );
}

export default App;
