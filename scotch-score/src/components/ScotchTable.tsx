import { Paper, Box, Rating, useMediaQuery, useTheme } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getScotches } from '../services/scotchService';
import Scotch, { ScotchColumn } from '../types/scotch';
import { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';
import formatCurrency from '../util/formatCurrency';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ScotchSearchParameters from '../types/scotchSearchParameters';
import SortDirection from '../types/sortDirection';

const columns: GridColDef<Scotch>[] = [
  {
    field: 'name',
    headerName: 'Name',
    headerAlign: 'left',
    align: 'left',
    flex: 1,
    minWidth: 200,
    disableColumnMenu: true,
  },
  {
    field: 'distillery',
    headerName: 'Distillery',
    headerAlign: 'left',
    align: 'left',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'region',
    headerName: 'Region',
    headerAlign: 'left',
    align: 'left',
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    headerAlign: 'right',
    align: 'right',
    width: 100,
    disableColumnMenu: true,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    headerAlign: 'right',
    align: 'right',
    width: 150,
    disableColumnMenu: true,
    valueFormatter: (params) => formatCurrency(params.value as number, 'CAD'),
  },
  {
    field: 'averageRating',
    headerName: 'Rating',
    headerAlign: 'right',
    align: 'right',
    width: 150,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Rating value={params.value as number} precision={0.5} readOnly />
    ),
  },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    headerAlign: 'right',
    align: 'right',
    width: 160,
    disableColumnMenu: true,
    valueFormatter: (params) =>
      new Date(params.value as string).toLocaleDateString(),
  },
];

const MOBILE_COLUMNS = {
  name: true,
  distillery: false,
  region: false,
  age: false,
  amount: false,
  averageRating: false,
  dateCreated: false,
};

const TABLET_COLUMNS = {
  name: true,
  distillery: false,
  region: false,
  age: false,
  amount: false,
  averageRating: true,
  dateCreated: false,
};

const LAPTOP_COLUMNS = {
  name: true,
  distillery: false,
  region: true,
  age: false,
  amount: false,
  averageRating: true,
  dateCreated: false,
};

const ALL_COLUMNS = {
  name: true,
  distillery: true,
  region: true,
  age: true,
  amount: true,
  averageRating: true,
  dateCreated: true,
};

function convertToStringToStringRecord(
  object: Record<string, any>,
): Record<string, string> {
  const record: Record<string, string> = {};
  for (const [key, value] of Object.entries(object)) {
    if (value) {
      record[key] = String(value);
    }
  }
  return record;
}

function createScotchSearchParametersFromSearchParams(
  searchParams: URLSearchParams,
): ScotchSearchParameters {
  const name = searchParams.get('name');
  const pageIndex = searchParams.get('pageIndex');
  const pageSize = searchParams.get('pageSize');
  const sortBy = searchParams.get('sortBy');
  const sortDirection = searchParams.get('sortDirection');

  const scotchSearchParameters: ScotchSearchParameters = {};

  if (name) {
    scotchSearchParameters.name = name;
  }

  if (pageIndex) {
    scotchSearchParameters.pageIndex = Number(pageIndex);
  }

  if (pageSize) {
    scotchSearchParameters.pageSize = Number(pageSize);
  }

  if (sortBy) {
    scotchSearchParameters.sortBy = sortBy as ScotchColumn;
  }

  if (sortDirection) {
    scotchSearchParameters.sortDirection = sortDirection as SortDirection;
  }

  return scotchSearchParameters;
}

function ScotchTable() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const [searchParams, setSearchParams] = useSearchParams();

  const [scotchSearchParameters, setScotchSearchParameters] =
    useState<ScotchSearchParameters>(
      createScotchSearchParametersFromSearchParams(searchParams),
    );
  const [columnsVisible, setColumnVisible] = useState(ALL_COLUMNS);

  const scotches = useQuery({
    queryKey: ['scotches', scotchSearchParameters],
    queryFn: () => getScotches(scotchSearchParameters),
    placeholderData: keepPreviousData,
  });

  const rows = scotches.data ?? [];

  const onSortModelChange = (model: GridSortModel) => {
    if (model.length === 0) {
      return;
    }
    setScotchSearchParameters({
      ...scotchSearchParameters,
      sortBy: model[0].field as ScotchColumn,
      sortDirection: model[0].sort === 'asc' ? 'Ascending' : 'Descending',
    });
  };

  const onPaginationModelChange = (model: GridPaginationModel) => {
    setScotchSearchParameters({
      ...scotchSearchParameters,
      pageIndex: model.page,
      pageSize: model.pageSize,
    });
  };

  useEffect(() => {
    if (isMobile) {
      setColumnVisible(MOBILE_COLUMNS);
    } else if (isTablet) {
      setColumnVisible(TABLET_COLUMNS);
    } else if (isLaptop) {
      setColumnVisible(LAPTOP_COLUMNS);
    } else {
      setColumnVisible(ALL_COLUMNS);
    }
  }, [isMobile, isTablet, isLaptop]);

  useEffect(() => {
    setSearchParams(
      new URLSearchParams(
        convertToStringToStringRecord(scotchSearchParameters),
      ),
    );
  }, [scotchSearchParameters, setSearchParams]);

  return (
    <Box>
      <h1>Scotches</h1>
      <Paper>
        <DataGrid
          autoHeight
          loading={scotches.isLoading}
          columns={columns}
          columnVisibilityModel={columnsVisible}
          rows={rows}
          rowCount={rows.length}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          onRowClick={(params) => navigate(`/scotches/${params.id}`)}
          sortingMode="server"
          onSortModelChange={onSortModelChange}
          paginationMode="server"
          onPaginationModelChange={onPaginationModelChange}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                page: scotchSearchParameters.pageIndex ?? 0,
                pageSize: scotchSearchParameters.pageSize ?? 25,
              },
            },
            sorting: {
              sortModel: [
                {
                  field: scotchSearchParameters.sortBy ?? 'name',
                  sort:
                    scotchSearchParameters.sortDirection === 'Ascending'
                      ? 'asc'
                      : 'desc',
                },
              ],
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default ScotchTable;
