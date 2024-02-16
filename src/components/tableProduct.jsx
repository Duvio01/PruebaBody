import { Delete, Edit } from "@mui/icons-material";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../configs/theme";
import { NumericFormat } from "react-number-format";

const TableProduct = ({ products, editProduct, deleteProduct }) => {
  const productEdit = (productSelect) => {
    editProduct(productSelect);
  };

  return (
    <>
      <TableContainer component={Paper} elevation={12}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Nombre</StyledTableCell>
              <StyledTableCell align="center">Precio</StyledTableCell>
              <StyledTableCell align="center">Usuario</StyledTableCell>
              <StyledTableCell align="center">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 && (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={4}>
                  No hay productos creados
                </StyledTableCell>
              </StyledTableRow>
            )}
            {products.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell align="center">{product.name}</StyledTableCell>
                <StyledTableCell align="center">
                  <NumericFormat
                    value={product.price}
                    displayType={"text"}
                    thousandSeparator={'.'}
                    prefix="$"
                    decimalSeparator={','}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product?.User?.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => productEdit(product)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteProduct(product.idProduct)}
                  >
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableProduct;
