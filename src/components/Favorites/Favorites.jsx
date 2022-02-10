import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import  { tiketContext }  from "../MyContext/MyContext";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Favorites() {
  const { favorite, getFavorite,  deleteFromFavorite } =
    React.useContext(tiketContext);
    console.log(favorite, "favorite");
    
  React.useEffect(() => {
    getFavorite();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Photo</StyledTableCell>
              <StyledTableCell align="center">Car</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favorite.products ? (
              <>
                {favorite.products.map((elem) => (
                  <StyledTableRow key={elem.item.id}>
                    <StyledTableCell component="th" scope="row" align="center">
                      <img
                        width="120px"
                        src={elem.item.photo}
                        alt={elem.item.name}
                      />
                    {console.log(elem.item.town, "name")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {elem.item.town}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={(e) =>
                          deleteFromFavorite(elem.item.id, elem.item.price)
                        }
                        style={{ color: "red" }}
                      >
                        &times;
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell>
                  <h1>Загрузка...</h1>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
