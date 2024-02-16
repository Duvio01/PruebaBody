import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import validationSchema from "../validations/validationsForm";
import { useEffect, useState } from "react";
import axios from "axios";

const FormProduct = ({ product, saveProduct, cleanProduct }) => {
  const [productSelected, setProductSelected] = useState(null);
  const [users, setUsers] = useState(null);

  const getUsers = async () => {
    const allUsers = await axios.get("http://localhost:3002/users");
    setUsers(allUsers.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (product) {
      formik.setFieldValue("name", product.name);
      formik.setFieldValue("price", product.price);
      formik.setFieldValue("user", product.UserId ? product.UserId : '')
      setProductSelected(product);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      user: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      saveProduct(values, product ? product.idProduct : null);
      clearProduct();
    },
  });

  const clearProduct = () => {
    cleanProduct();
    setProductSelected(null);
    formik.handleReset();
  };

  return (
    <Box component={Paper} elevation={8} sx={{ p: 4 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          rowSpacing={2}
          sx={{ mb: 2 }}
        >
          <Grid item>
            <Typography variant="h5">
              {productSelected
                ? `Editar producto ${productSelected.name}`
                : "Crear producto"}
            </Typography>
          </Grid>
          <Grid item>
            {productSelected && <Button onClick={clearProduct}>Limpiar</Button>}
          </Grid>
        </Grid>
        <Grid container rowSpacing={2}>
          <Grid item md={12}>
            <TextField
              id="name"
              name="name"
              label="Nombre"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label="Precio"
              id="price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <FormControl fullWidth>
              <InputLabel id="label-select">Usuarios</InputLabel>
              <Select
                value={formik.values.user}
                id="user"
                name="user"
                labelId="label-select"
                label='Usuarios'
                onChange={formik.handleChange}
              > 
                <MenuItem value='' sx={{height: 30}}></MenuItem>
                {users?.map((user) => (
                  <MenuItem value={user.id}>{user.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          type="submit"
        >
          {productSelected ? "Guardar" : "Crear"}
        </Button>
      </form>
    </Box>
  );
};

export default FormProduct;
