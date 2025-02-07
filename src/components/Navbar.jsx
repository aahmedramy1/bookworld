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
            <div className="flex justify-between items-center">
                <div className="flex flex-col ">
                    <h1 className="text-lg font-semibold">{capitalize(pageName)}</h1>
                    <Breadcrumb />
                </div>
                <div className='flex gap-2 items-center'>
                    <img src='https://s3-alpha-sig.figma.com/img/7c2a/9493/a71dfb9fcdfe7fb63bbb95893aa013b4?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fmVVjCZKYRfqzKpHkWCmv3DvPVTGLEvaIrpTn8qYE1fgk1eVYObFiYgF6Rw4UmBBDltefS~Tkri-v6e8QUZcPTe8yVprhK-c7JSAAM62PYr8XCIYbvTnja7hQAkV5HCDEhNmy5zqOSqhUfvGXrUbgm4kBlXFJuUkzxSbr5DIXKwScoo1-mMJjuXINIzzg0v-XBfWUDk6MDX22C5iwIBo41JNHF7IFwU21Ak8ZF-Q~9HArDzEj2M96tcIOe91qnqRLEajrvW82A8AupN1mUTMRFlmzIt2b704pauIPdGr1KqOrYuwO411bEnEc96ecESRVFKXFry-F2~UJIPQPTEMlQ__'
                            alt="Profile picture" className="w-12 h-12 rounded-lg" />
                    <div className='text-[#3E435D]'>
                        Jacob Jones
                    </div>
                </div>
            </div>
            <Divider />
        </nav>
    );
};

export default Navbar;