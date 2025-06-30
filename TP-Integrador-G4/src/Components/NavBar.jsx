import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import logo from '../img/logo.jpg'
function NavBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black', boxShadow: '0 2px 6px rgba(0,0,0,0.5)', }}>
      <Toolbar sx={{ minHeight: 110, px: 3 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Box
            component="img"
            src={logo}
            alt="Logo Tienda"
            sx={{ height: 80, cursor: 'pointer', mr: 2 }}
          />
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', sm: 'flex', gap: 2 } }}>
          <Button color="inherit" component={Link} to="/" startIcon={<ProductionQuantityLimitsIcon />} sx={{ fontSize: '1rem', fontWeight: 500 }}>
            Productos
          </Button>
          <Button color="inherit" component={Link} to="/favorites" startIcon={<FavoriteIcon />} sx={{ fontSize: '1rem', fontWeight: 500 }}>
            Favoritos
          </Button>
          <Button color="inherit" component={Link} to="/agregarProducto" startIcon={<AssignmentAddIcon />} sx={{ fontSize: '1rem', fontWeight: 500 }}>
            Agregar producto
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;