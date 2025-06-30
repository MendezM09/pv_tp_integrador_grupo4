import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { addFavorite, removeFavorite } from '../store/favoritesSlice.jsx';
import Tooltip from '@mui/material/Tooltip';
import AssignmentIcon from '@mui/icons-material/Assignment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function ProductCard() {
  const { entities } = useSelector((state) => state.products);
  const favorites = useSelector((state) => state.favorites.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  const categoryOptions = [
    '',
    'electronics',
    'jewelery',
    'men\'s clothing',
    'women\'s clothing',
    'others',
  ];

  const processedProducts = useMemo(() => {
    let tempProducts = [...entities];

    if (selectedCategory !== '') {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    if (sortBy === 'price_asc') {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'alpha_asc') {
      tempProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'alpha_desc') {
      tempProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    return tempProducts;
  }, [entities, selectedCategory, sortBy]);

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
        flexDirection: 'column',
        width: '100%',
        py: 4,
        px: 4,
      }}
    >
      
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end', 
        mb: 4,
      }}>
        <Box sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          maxWidth: '400px', 
          justifyContent: 'flex-end', 
        }}>
          {/* Filtro por Categoría */}
          <FormControl sx={{ minWidth: 180, flexGrow: 0 }}> 
            <InputLabel id="category-filter-label">Categoría</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={selectedCategory}
              label="Categoría"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option === '' ? 'all' : option} value={option}>
                  {option === '' ? 'Todas las categorías' : option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Ordenar  */}
          <FormControl sx={{ minWidth: 180, flexGrow: 0 }}> 
            <InputLabel id="sort-by-label">Ordenar por</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              value={sortBy}
              label="Ordenar por"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="">Sin ordenar</MenuItem>
              <MenuItem value="price_asc">Precio: Menor a Mayor</MenuItem>
              <MenuItem value="price_desc">Precio: Mayor a Menor</MenuItem>
              <MenuItem value="alpha_asc">Nombre: A-Z</MenuItem>
              <MenuItem value="alpha_desc">Nombre: Z-A</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Grid de Productos */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center', 
          alignItems: 'center',
        }}
      >
        {processedProducts.length > 0 ? (
          processedProducts.map((product) => (
            <Card
              key={product.id}
              sx={{
                width: 180,
                height: 350,
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
                height="160"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 , px: 1, py: 1 }}>
                <Tooltip title={product.title}>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                        {product.title}
                    </Typography>
                </Tooltip>
                <Typography variant="body1" paragraph>
                  **Categoría:** {product.category}
                </Typography>
                <Typography variant="h5" color="black" sx={{fontWeight: 'bold', mt: 1 }}>
                  ${product.price}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', px: 1, py: 0.5 }}>
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
                  <IconButton
                    aria-label="Ver Detalles"
                    onClick={() => handleViewDetails(product.id)}
                  >
                    <AssignmentIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
            No se encontraron productos que coincidan con los filtros.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ProductCard;