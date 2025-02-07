import React from "react";
import Breadcrumb from "./Breadcrumb";
import {Divider} from "@mui/material";
import { useLocation } from "react-router-dom";
import { capitalize} from "lodash";

const Navbar = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);
    const pageName = pathnames.length ? decodeURIComponent(pathnames[pathnames.length - 1]) : "Home";

    return (
        <nav className=" flex flex-col gap-8 ">
            <div className="flex flex-col ">
                <h1 className="text-lg font-semibold">{capitalize(pageName)}</h1>
                <Breadcrumb />
            </div>
            <Divider />
        </nav>
    );
};

export default Navbar;