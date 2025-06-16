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
import { addFavorite, removeFavorite } from '../store/favoritesSlice.jsx';

import Tooltip from '@mui/material/Tooltip';
import AssignmentIcon from '@mui/icons-material/Assignment';

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
        py: 8,
        px: 4,
      }}
    >
      {entities.map((product) => (
        <Card
          key={product.id}
          sx={{
            width: 220,
            height: 420,
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
            height="200"
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
            <Tooltip
              title={favorites.includes(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              arrow>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: 'red' }} />}
                checked={favorites.includes(product.id)}
                onChange={() => handleToggleFavorite(product.id)}
                aria-label="Añadir a favoritos"
              />
            </Tooltip>
            <Tooltip title="Ver Detalles">
              <Checkbox
                icon={<AssignmentIcon />}
                onChange={() => handleViewDetails(product.id)}
              ></Checkbox>
            </Tooltip>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default ProductCard;