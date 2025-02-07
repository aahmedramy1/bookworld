import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {capitalize} from "lodash";

const Breadcrumb = () => {
    const location = useLocation();
    const pathNames = location.pathname.split("/").filter((x) => x);

    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            {pathNames.map((value, index) => {
                const to = `/${pathNames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathNames.length - 1;

                return isLast ? (
                    <Typography color="text.primary" key={to}>
                        {capitalize(decodeURIComponent(value))}
                    </Typography>
                ) : (
                    <Link component={RouterLink} underline="hover" color="inherit" to={to} key={to}>
                        {capitalize(decodeURIComponent(value))}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default Breadcrumb;
