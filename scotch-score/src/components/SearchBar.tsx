import { Search } from '@mui/icons-material';
import {
  alpha,
  Autocomplete,
  CircularProgress,
  InputAdornment,
  Link,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDebounce } from 'react-use';

import { getScotches } from '../services/scotchService';
import Scotch from '../types/scotch';

function SearchBar() {
  const [name, setName] = useState<string>('');
  const [debouncedName, setDebouncedName] = useState<string>(name);

  useDebounce(() => setDebouncedName(name), 1000, [name]);

  const scotches = useQuery({
    queryKey: ['scotches', debouncedName],
    queryFn: () => getScotches({ name: debouncedName, pageSize: 10 }),
    placeholderData: [],
  });

  return (
    <Autocomplete
      freeSolo
      size="small"
      isOptionEqualToValue={(option: Scotch, value: Scotch) =>
        option.id === value.id
      }
      getOptionLabel={(option: string | Scotch) =>
        typeof option === 'string' ? option : option.name
      }
      filterOptions={(x) => x}
      groupBy={(scotch) => scotch.region}
      options={scotches.data ?? []}
      loading={scotches.isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            borderRadius: '4px',
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
            '&:hover': {
              backgroundColor: (theme) =>
                alpha(theme.palette.common.white, 0.25),
            },
            '& .MuiInputBase-root': {
              color: 'inherit',
            },
            '& .MuiInputAdornment-root': {
              color: 'inherit',
            },
            '& .MuiIconButton-root': {
              color: 'inherit',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              display: 'none',
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
            sx={{ width: '100%' }}
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
  );
}

export default SearchBar;
