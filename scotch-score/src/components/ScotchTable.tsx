import { Paper, Box, Rating, useMediaQuery, useTheme } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getScotches } from '../services/scotchService';
import Scotch, { ScotchColumn } from '../types/scotch';
import { useEffect, useState } from 'react';
import SortDirection from '../types/sortDirection';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';
import formatCurrency from '../util/formatCurrency';
import { useNavigate } from 'react-router-dom';

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
    renderCell: (params) => <Rating value={params.value as number} readOnly />,
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

function ScotchTable() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const [sortBy, setSortBy] = useState<ScotchColumn>('name');
  const [sortDirection, setSortDirection] =
    useState<SortDirection>('Ascending');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [columnsVisible, setColumnVisible] = useState(ALL_COLUMNS);

  const scotches = useQuery({
    queryKey: ['scotches', sortBy, sortDirection, page, pageSize],
    queryFn: () => getScotches('', page, pageSize, sortBy, sortDirection),
    placeholderData: keepPreviousData,
  });

  const rows = scotches.data ?? [];

  const onSortModelChange = (model: GridSortModel) => {
    if (model.length === 0) {
      return;
    }
    setSortBy(model[0].field as ScotchColumn);
    setSortDirection(model[0].sort === 'asc' ? 'Ascending' : 'Descending');
  };

  const onPaginationModelChange = (model: GridPaginationModel) => {
    setPage(model.page);
    setPageSize(model.pageSize);
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
        />
      </Paper>
    </Box>
  );
}

export default ScotchTable;
