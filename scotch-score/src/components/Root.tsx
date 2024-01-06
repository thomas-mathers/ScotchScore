import {
  Container,
  AppBar,
  Grid,
  Box,
  Link,
  Autocomplete,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AutocompleteSearchBar from "./AutocompleteSearchBar";
import Scotch from "../types/scotch";
import { useQuery } from "@tanstack/react-query";
import { getScotches } from "../services/scotchService";
import { useState } from "react";
import { useDebounce } from "react-use";

function Root() {
  const [name, setName] = useState<string>("");
  const [debouncedName, setDebouncedName] = useState<string>(name);

  useDebounce(() => setDebouncedName(name), 1000, [name]);

  const scotches = useQuery({
    queryKey: ["scotches", debouncedName],
    queryFn: () => getScotches(debouncedName),
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
              disableClearable
              options={scotches.data || []}
              getOptionLabel={(option: string | Scotch) =>
                typeof option === "string" ? option : option.name
              }
              groupBy={(scotch) => scotch.region}
              renderInput={AutocompleteSearchBar}
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
              onInputChange={(event, value) => {
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
