import styled from "@emotion/styled";
import { TableCell, TableRow, createTheme, tableCellClasses } from "@mui/material";

export const themePalette = createTheme({
  palette: {
    primary: {
      main: "#0080ff",
    },
    secondary: {
      main: "#00a3ff",
    },
    tableHead: {
      main: "#00caff",
    },
    tableBody: {
      main: "#8af1ff",
    },
    action: {
      hover: "#d2ffff",
    },
  },
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`] : {
      backgroundColor: theme.palette.tableHead.main,
      color: theme.palette.common.white,
      fontSize: 16,
      fontWeight: 700
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      // backgroundColor: theme.palette.tableBody.main
    }
  }))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(2n)': {
      backgroundColor: theme.palette.tableBody.main
      
    },
    '&:nth-of-type(2n + 1)': {
      backgroundColor: theme.palette.action.hover
    }
  }));