import {
  TextField,
  alpha,
  InputAdornment,
  AutocompleteRenderInputParams,
} from "@mui/material";
import { Search } from "@mui/icons-material";

function AutocompleteSearchBar(params: AutocompleteRenderInputParams) {
  return (
    <TextField
      {...params}
      size="small"
      sx={{
        borderRadius: "4px",
        backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
        },
        "& .MuiInputBase-root": {
          color: "inherit",
        },
        "& .MuiInputAdornment-root": {
          color: "inherit",
        },
        "& .MuiIconButton-root": {
          color: "inherit",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          display: "none",
        },
      }}
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      placeholder="Search..."
    />
  );
}

export default AutocompleteSearchBar;
