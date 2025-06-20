import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'; 
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tienda
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button color="inherit" component={Link} to="/" startIcon={<ProductionQuantityLimitsIcon />}>
            Productos
          </Button>
          <Button color="inherit" component={Link} to="/favorites" startIcon={<FavoriteIcon/>}>
            Favoritos
          </Button>
          <Button color="inherit" component={Link} to="/agregarProducto" startIcon={<AssignmentAddIcon/>}>
            Agregar producto
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;