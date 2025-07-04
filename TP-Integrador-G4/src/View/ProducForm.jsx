import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Grid, Container, Tooltip, IconButton, MenuItem } from '@mui/material';
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
  const [rate, setRate] = useState("");
  const [count, setCount] = useState("");
  const [errorValidacion, setErrorValidacion] = useState('');
  const [alertaExito, setAlertaExito] = useState(null);
  const categorias = ["men's clothing", "jewelery", "electronics", "women's clothing", "others"];
  useEffect(() => {
    if (initialProduct) {
      setId(initialProduct.id?.toString() || '');
      setTitulo(initialProduct.title || '');
      setPrecio(initialProduct.price?.toString() || '');
      setDescripcion(initialProduct.description || '');
      setCategoria(initialProduct.category || '');
      setImage(initialProduct.image || '');
      setRate(initialProduct.rating?.rate?.toString() || '');
      setCount(initialProduct.rating?.count?.toString() || '');
    } else {
      setId('');
      setTitulo('');
      setPrecio('');
      setDescripcion('');
      setCategoria('');
      setImage('');
      setRate('');
      setCount('');
    }
  }, [initialProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validarProducto({
      title: titulo,
      price: precio,
      description: descripcion,
      image: imagen,
      rate: rate,
      count: count,
      products,
    });

    if (error) {
      setErrorValidacion(error);
      return;
    }
    // Generación del nuevo ID en caso de nuevo
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
        rate: parseFloat(rate) || 0,
        count: parseInt(count) || 0,
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
        }, 2000);
      } else {
        const errorMessage = resultAction.payload || resultAction.error?.message || 'Error desconocido';
        alert(`Error al guardar/actualizar el producto: ${errorMessage}`);
      }
    } catch (error) {
      alert('Ocurrió un error inesperado al guardar/actualizar el producto.');
    }

    if (!initialProduct) {
      setId('');
      setTitulo('');
      setPrecio('');
      setDescripcion('');
      setCategoria('');
      setImage('');
      setRate('');
      setCount('');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{
        p: 4, position: 'relative',
        border: '2px solid #FBC02D',
        borderRadius: 3,
        padding: 4,
        boxShadow: 4,
      }}>
        {errorValidacion && (<AlertError severity="error" mensaje={errorValidacion} onClose={() => setErrorValidacion('')} ></AlertError>)}
        {alertaExito && (<AlertError severity="success" mensaje={alertaExito} onClose={() => setAlertaExito(null)} />)}
        <Typography variant="h5" component="h2" gutterBottom align="center">
          {initialProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </Typography>
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <Tooltip title={"Salir"}>
            <IconButton aria-label="salir" onClick={() => navigate('/home')}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{
          mt: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
          width: '100%',
        }}>
          {/* COLUMNA IZQUIERDA */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 2,
          }}>
            <Box sx={{
              width: '100%',
              height: 300,
              border: '1px solid #ccc',
              borderRadius: 2,
              backgroundColor: '#f9f9f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              {imagen ? (
                <Box
                  component="img"
                  src={imagen}
                  alt="Previsualización"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                  Sin imagen
                </Typography>
              )}
            </Box>

            <TextField
              fullWidth
              label="Ingresar URL de imagen"
              value={imagen}
              onChange={(e) => setImage(e.target.value)}
              size="small"
            />
          </Box>

          {/* COLUMNA DERECHA */}
          <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              multiline
              minRows={3}
              fullWidth
            />
            <TextField
              select
              label="Categoría"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
              fullWidth
            >
              {categorias.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Valoración"
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                fullWidth
              />
              <TextField
                label="Cantidad de Opiniones"
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                fullWidth
              />
            </Box>

            <TextField
              label="Precio"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                py: 1.2,
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: '#FBC02D',
                borderRadius: '50px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#F9A825',
                },
              }}
            >
              {initialProduct ? 'Guardar Cambios' : 'Agregar Producto'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProductForm;