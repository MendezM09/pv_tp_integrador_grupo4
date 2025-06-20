import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, CircularProgress, Container, Paper, Tooltip, Button } from '@mui/material'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit'; 
import Checkbox from '@mui/material/Checkbox';

function ProductDetail() {
  const { id } = useParams();
  const { entities, status } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'succeeded' && entities.length > 0) {
      const foundProduct = entities.find((p) => p.id === parseInt(id));
      setProduct(foundProduct);
    } else if (status === 'failed') {
      console.error("Error al cargar productos para ProductDetail.");
    }
  }, [id, entities, status]);
  if (!product && status !== 'failed') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ marginLeft: 2 }}>Cargando producto...</Typography>
      </Box>
    );
  }

  if (!product && status === 'succeeded') {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">Producto no encontrado.</Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Volver a la lista de productos
        </Button>
      </Box>
    );
  }
  if (status === 'failed') {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">Error al cargar el producto.</Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Volver a la lista de productos
        </Button>
      </Box>
    );
  }
  const handleEditClick = () => {
    navigate(`/editar-producto/${product.id}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 ,position: 'relative'}}>
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <Tooltip title={"Salir"}>
            <Checkbox
              icon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              aria-label="Salir"
            />
          </Tooltip>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {product.image && (
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          )}
        </Box>
        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            ID: {product.id}
          </Typography>
          <Typography variant="body1" paragraph>
            Descripción: {product.description}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Categoría:</strong> {product.category}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Cantidad de Opiniones:</strong> {product.rating?.count || 0}
            <strong> Valoración:</strong> {product.rating?.rate || 0}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mt: 3, fontWeight: 'bold' }}>
            ${product.price}
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />} 
              onClick={handleEditClick}>
              Editar Producto
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProductDetail;