// FavoriteProducts.jsx
import React from 'react';
import { useSelector } from 'react-redux'; // Necesitamos useSelector para acceder al estado
import { useNavigate } from 'react-router-dom'; // Para la navegación a los detalles del producto
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

// Importa las acciones de favoritos (necesarias para el checkbox)
import { addFavorite, removeFavorite } from '.././favoritesSlice'; // Ajusta la ruta si es necesario

function FavoriteProducts() {
  // 1. Obtener la lista completa de productos
  const allProducts = useSelector((state) => state.products.entities);
  // 2. Obtener los IDs de los productos favoritos
  const favoriteIds = useSelector((state) => state.favorites.items);
  
  const dispatch = useDispatch(); // Para despachar acciones de favoritos
  const navigate = useNavigate(); // Para navegar a los detalles

  // 3. Filtrar los productos para obtener solo los favoritos
  const favoriteProducts = allProducts.filter(product =>
    favoriteIds.includes(product.id)
  );

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleToggleFavorite = (productId) => {
    if (favoriteIds.includes(productId)) { // Usa favoriteIds aquí
      dispatch(removeFavorite(productId));
    } else {
      dispatch(addFavorite(productId));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'center',
        padding: 3,
        mt: 4, // Un poco de margen superior
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom sx={{ width: '100%', textAlign: 'center' }}>
        Tus Productos Favoritos
      </Typography>

      {favoriteProducts.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Aún no tienes productos favoritos. ¡Añade algunos!
        </Typography>
      ) : (
        favoriteProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              maxWidth: 345,
              minWidth: 280,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={product.image}
              alt={product.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h7" component="div" noWrap>
                ID: {product.id}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" noWrap>
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ minHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                {product.description}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Categoría:</strong> {product.category}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                ${product.price}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: 'red' }} />}
                checked={favoriteIds.includes(product.id)} // Usa favoriteIds aquí
                onChange={() => handleToggleFavorite(product.id)}
                aria-label="Quitar de favoritos"
              />
              <Button
                size="small"
                variant="contained"
                onClick={() => handleViewDetails(product.id)}
              >
                Ver Detalles
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </Box>
  );
}

export default FavoriteProducts;