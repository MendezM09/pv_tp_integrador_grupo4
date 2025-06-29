import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Grid, Container, Tooltip, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createProduct, updateProduct } from '../store/productsSlice';
import { validarProducto } from "../services/ValidacionDatos";
import AlertError from '../Components/Alerts';
function ProductForm({ initialProduct = null }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.entities);
  const [id, setId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImage] = useState('');
  const [errorValidacion, setErrorValidacion] = useState('');
  const [alertaExito, setAlertaExito] = useState(null);

  useEffect(() => {
    if (initialProduct) {
      setId(initialProduct.id?.toString() || '');
      setTitulo(initialProduct.title || '');
      setPrecio(initialProduct.price?.toString() || '');
      setDescripcion(initialProduct.description || '');
      setCategoria(initialProduct.category || '');
      setImage(initialProduct.image || '');
    } else {
      setId('');
      setTitulo('');
      setPrecio('');
      setDescripcion('');
      setCategoria('');
      setImage('');
    }
  }, [initialProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validarProducto({
      title: titulo,
      price: precio,
      description: descripcion,
      image: imagen,
      products,
    });

    if (error) {
      setErrorValidacion(error);
      return;
    }
    // Generación del nuevo ID si es producto nuevo
    let newId = null;
    if (!initialProduct) {
      const ids = products.map(p => Number(p.id)).filter(id => !isNaN(id));
      const maxId = ids.length > 0 ? Math.max(...ids) : 0;
      newId = maxId + 1;
    }

    const productData = {
      id: initialProduct?.id ?? newId,
      title: titulo,
      price: parseFloat(precio),
      description: descripcion,
      category: categoria,
      image: imagen,
      rating: {
        rate: 0,
        count: 0,
      },
    };
    try {
      let resultAction;
      let successMessage;
      let actionType;

      if (initialProduct) {
        resultAction = await dispatch(updateProduct(productData));
        successMessage = '¡Producto actualizado exitosamente!';
        actionType = updateProduct.fulfilled;
      } else {
        resultAction = await dispatch(createProduct(productData));
        successMessage = '¡Producto agregado exitosamente!';
        actionType = createProduct.fulfilled;
      }

      if (actionType.match(resultAction)) {
        setAlertaExito(successMessage);
        setTimeout(() => {
          setAlertaExito(null);
          navigate('/');
        }, 2000); // Espera 2 segundos antes de redirigir
      } else {
        const errorMessage = resultAction.payload || resultAction.error?.message || 'Error desconocido';
        alert(`Error al guardar/actualizar el producto: ${errorMessage}`);
      }
    } catch (error) {
      alert('Ocurrió un error inesperado al guardar/actualizar el producto.');
    }
    setErrorValidacion('');
    if (!initialProduct) {
      setTitulo('');
      setPrecio('');
      setDescripcion('');
      setCategoria('');
      setImage('');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, position: 'relative' }}>
        {errorValidacion && (<AlertError severity="error" mensaje={errorValidacion} onClose={() => setErrorValidacion('')} ></AlertError>)}
        {alertaExito && (<AlertError severity="success" mensaje={alertaExito} onClose={() => setAlertaExito(null)}/>)}
        <Typography variant="h5" component="h2" gutterBottom align="center">
          {initialProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </Typography>
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <Tooltip title="Salir">
            <IconButton aria-label="salir" onClick={() => navigate('/')}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          maxWidth: 900,
          margin: 'auto',
          padding: 4,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3,
        }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Precio"
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
                inputProps={{ step: "0.01" }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={4}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Categoría"
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL de la Imagen"
                type="text"
                value={imagen}
                onChange={(e) => setImage(e.target.value)}
                required
                margin="normal"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {initialProduct ? 'Guardar Cambios' : 'Agregar Producto'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProductForm;