import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#007bff", // Primary color (Blue)
        },
        secondary: {
            main: "#f50057", // Secondary color (Pink)
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none", // Prevents all caps in buttons
                    borderRadius: "8px",
                },
            },
        },
    },
});

export default theme;
