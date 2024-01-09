import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Rating,
  TableSortLabel,
  Paper,
  Box,
} from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getScotches } from "../services/scotchService";
import { ScotchColumn } from "../types/scotch";
import { useState } from "react";
import SortDirection from "../types/sortDirection";

function ScotchTable() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<ScotchColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const scotches = useQuery({
    queryKey: ["scotches", sortBy, sortDirection],
    queryFn: () => getScotches("", 0, 100, sortBy, sortDirection),
    placeholderData: keepPreviousData,
  });
  const onClickSortHeader = (column: ScotchColumn) => {
    if (column === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };
  return (
    <Box>
      <h1>Scotches</h1>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}
                  onClick={() => onClickSortHeader("name")}
                >
                  <TableSortLabel
                    active={sortBy === "name"}
                    direction={sortDirection}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "none", md: "table-cell" },
                  }}
                  onClick={() => onClickSortHeader("region")}
                >
                  <TableSortLabel
                    active={sortBy === "region"}
                    direction={sortDirection}
                  >
                    Region
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "none", md: "table-cell" },
                  }}
                  onClick={() => onClickSortHeader("age")}
                >
                  <TableSortLabel
                    active={sortBy === "age"}
                    direction={sortDirection}
                  >
                    Age
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}
                  onClick={() => onClickSortHeader("amount")}
                >
                  <TableSortLabel
                    active={sortBy === "amount"}
                    direction={sortDirection}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}
                  onClick={() => onClickSortHeader("averageRating")}
                >
                  <TableSortLabel
                    active={sortBy === "averageRating"}
                    direction={sortDirection}
                  >
                    Rating
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scotches.data?.map((scotch) => (
                <TableRow
                  key={scotch.id}
                  hover
                  onClick={(e) => navigate(`/scotches/${scotch.id}`)}
                >
                  <TableCell>
                    <img
                      src={scotch.images[0]}
                      width={100}
                      height={100}
                      alt={scotch.name}
                      style={{
                        height: "100px",
                        width: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </TableCell>
                  <TableCell>{scotch.name}</TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "none", md: "table-cell" },
                    }}
                  >
                    {scotch.region}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "none", md: "table-cell" },
                    }}
                  >
                    {scotch.age}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {scotch.amount}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    <Rating value={scotch.averageRating} readOnly />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default ScotchTable;
