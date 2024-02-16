import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Collapse, Container, Grid, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import FormProduct from "./components/FormProduct";
import TableProduct from "./components/TableProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [textAlert, setTextAlert] = useState("");
  const [viewAlert, setViewAlert] = useState(false);
  const [iconAlert, setIconAlert] = useState(true);

  const url = "http://localhost:3002/";

  const allProducts = async () => {
    const allProductsBack = await axios(url);
    setProducts(allProductsBack.data);
  };

  useEffect(() => {
    allProducts();
  }, []);

  const editProduct = (product) => {
    setProduct(product);
  };

  const cleanProduct = () => {
    setProduct(null);
  };

  const saveProduct = async (productSave, id) => {
    if (id) {
      productSave.id = id;
      const editProductBack = await axios.put(url, productSave);
      setProducts(editProductBack.data);
    } else {
      const saveProductBack = await axios.post(url, productSave);
      setProducts(saveProductBack.data);
    }
  };

  const timeAlert = (message) => {
    setViewAlert(true);
    setTextAlert(message);
    setTimeout(() => {
      setViewAlert(false);
    }, 2000);
  };

  const deleteProduct = (id) => {
    axios
      .delete(url, { data: { id } })
      .then((resp) => {
        setProducts(resp.data);
        setIconAlert(true);
        timeAlert("El producto se elimino correctamente");
      })
      .catch((error) => {
        setIconAlert(false);
        timeAlert(error.response.data);
      });
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Typography variant="h3" sx={{ mb: 5 }}>
          CRUD
        </Typography>
        <Grid container spacing={4}>
          <Grid item md={7}>
            <TableProduct
              products={products}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
            />
          </Grid>
          <Grid item md={5}>
            <FormProduct
              product={product}
              cleanProduct={cleanProduct}
              saveProduct={saveProduct}
            />
          </Grid>
        </Grid>
      </Container>

      <Box maxWidth="lg" sx={{ml: 18}}>
        <Collapse in={viewAlert}>
          <Alert variant="filled" severity={iconAlert ? "success" : "error"}>{textAlert}</Alert>
        </Collapse>
      </Box>
    </>
  );
}

export default App;
