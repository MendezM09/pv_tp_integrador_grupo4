import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { addFavorite, removeFavorite } from '.././favoritesSlice.jsx';


function ProductCard() {
  const { entities } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleToggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
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
      }}
    >
      {entities.map((product) => (
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
            <Typography gutterBottom variant="h6" component="div" noWrap>
              {product.title}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Category:</strong> {product.category}
            </Typography>
            <Typography variant="h5" color="primary" sx={{ marginTop: 2, fontWeight: 'bold' }}>
              ${product.price}
            </Typography>
          </CardContent>

          <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: 'red' }} />}
              checked={favorites.includes(product.id)}
              onChange={() => handleToggleFavorite(product.id)}
              aria-label="Añadir a favoritos"
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
      ))}
    </Box>
  );
}

export default ProductCard;