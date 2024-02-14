const TableProduct = ({ products }) => {

    const editProduct = (id) => {
        console.log(id)
    }


  return (
    <>
      <table border={1}>
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Precio</td>
            <td>Usuario</td>
            <td>Editar</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.user_creator}</td>
                <td><button onClick={() => editProduct(product.idProduct)}>Editar</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableProduct;
