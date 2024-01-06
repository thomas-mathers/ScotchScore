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
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getScotches } from "../services/scotchService";

function ScotchTable() {
  const navigate = useNavigate();
  const scotches = useQuery({
    queryKey: ["scotches"],
    queryFn: () => getScotches(),
  });
  return (
    <Box>
      <h1>Scotches</h1>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                ></TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  <TableSortLabel>Name</TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
                >
                  <TableSortLabel>Region</TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}
                >
                  <TableSortLabel>Age</TableSortLabel>
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  <TableSortLabel>Price</TableSortLabel>
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  <TableSortLabel>Rating</TableSortLabel>
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
                    <Rating value={scotch.averageRating} />
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
