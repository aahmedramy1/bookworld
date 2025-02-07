import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#BF5523", // Primary color (Blue)
        },
        secondary: {
            main: "#f50057", // Secondary color (Pink)
        },
    },
    typography: {
        fontFamily: `"Poppins", "Arial", "sans-serif"`, // Use Poppins as primary font
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
