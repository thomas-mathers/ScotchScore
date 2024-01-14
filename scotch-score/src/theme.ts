import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    background: {
      default: "#f4f7fa",
    },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& tr:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default,
          },
        }),
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&:hover": {
            color: "#ffffff",
          },
          "&.Mui-active": {
            "&&": {
              color: "#ffffff",

              "& * ": {
                color: "#ffffff",
              },
            },
          },
        },
        icon: {
          color: "#ffffff",
        },
      },
    },
  },
});

export default theme;
