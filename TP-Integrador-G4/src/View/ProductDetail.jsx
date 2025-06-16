import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Box, Typography, CircularProgress, Container, Paper, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams(); 
  const { entities } = useSelector((state) => state.products);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const foundProduct = entities.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id, entities]);

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ marginLeft: 2 }}>Cargando producto...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            ID: {product.id}
          </Typography>
          <Typography variant="body1" paragraph>
            Descripcion: {product.description}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Categoria:</strong> {product.category}
          </Typography>
           <Typography variant="body1" paragraph>
            <strong>Cantidad de Opiniones</strong> {product.rating.count}
            <strong> Valoracion:</strong> {product.rating.rate}
           </Typography>
          <Typography variant="h5" color="primary" sx={{ mt: 3, fontWeight: 'bold' }}>
            ${product.price}
          </Typography>
          <Button variant="outlined" sx={{ mt: 3 }} onClick={() => navigate('/')}>
            Volver a la Lista de Productos
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProductDetail;