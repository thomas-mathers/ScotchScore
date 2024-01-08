import {
  Container,
  AppBar,
  Grid,
  Box,
  Link,
  Autocomplete,
  TextField,
  alpha,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Scotch from "../types/scotch";
import { useQuery } from "@tanstack/react-query";
import { getScotches } from "../services/scotchService";
import { useState } from "react";
import { useDebounce } from "react-use";
import { Search } from "@mui/icons-material";

function Root() {
  const [name, setName] = useState<string>("");
  const [debouncedName, setDebouncedName] = useState<string>(name);

  useDebounce(() => setDebouncedName(name), 1000, [name]);

  const scotches = useQuery({
    queryKey: ["scotches", debouncedName],
    queryFn: () => getScotches(debouncedName),
    placeholderData: [],
  });

  return (
    <Container maxWidth="lg">
      <AppBar>
        <Grid container spacing={1} padding={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Link
              component={RouterLink}
              to="/"
              variant="h6"
              underline="none"
              color="inherit"
            >
              ScotchScore
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Autocomplete
              freeSolo
              size="small"
              isOptionEqualToValue={(option: Scotch, value: Scotch) =>
                option.id === value.id
              }
              getOptionLabel={(option: string | Scotch) =>
                typeof option === "string" ? option : option.name
              }
              filterOptions={(x) => x}
              groupBy={(scotch) => scotch.region}
              options={scotches.data ?? []}
              loading={scotches.isLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    borderRadius: "4px",
                    backgroundColor: (theme) =>
                      alpha(theme.palette.common.white, 0.15),
                    "&:hover": {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.common.white, 0.25),
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
                    endAdornment: (
                      <>
                        {scotches.isLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  placeholder="Search..."
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Link
                    component={RouterLink}
                    underline="none"
                    to={`/scotches/${option.id}`}
                    sx={{ width: "100%" }}
                  >
                    {option.name}
                  </Link>
                </li>
              )}
              inputValue={name}
              onInputChange={(_, value) => {
                setName(value);
              }}
            />
          </Grid>
        </Grid>
      </AppBar>
      <Box
        sx={{
          height: (theme) => ({ xs: theme.spacing(14), sm: theme.spacing(9) }),
        }}
      />
      <Outlet />
    </Container>
  );
}

export default Root;
