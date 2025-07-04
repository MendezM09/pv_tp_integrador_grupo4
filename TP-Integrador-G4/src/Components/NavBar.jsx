
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import logo from '../img/logo.jpg';
import { logout, isLogin, user } from '../middleware/auth';
import { IconButton } from '@mui/material';
import AlertError from '../Components/Alerts';
function NavBar() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLogin());
  const [userData, setUserData] = useState(user());
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
  if (isUserLoggedIn && !sessionStorage.getItem("welcomeShown")) {
    setShowWelcomeAlert(true);
    sessionStorage.setItem("welcomeShown", "true");

    const timer = setTimeout(() => setShowWelcomeAlert(false), 3000);
    return () => clearTimeout(timer);
  }
}, [isUserLoggedIn]);
  const handleLogout = () => {
    logout(); // Llama a la función de logout de tu middleware
    sessionStorage.removeItem("welcomeShown");
    setIsUserLoggedIn(false); // Actualiza el estado local a "no logueado"
    setUserData(null); // Limpia los datos del usuario
    navigate('/'); // Redirige al usuario a la página de inicio
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black', boxShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
      {showWelcomeAlert && (
        <AlertError
          severity="success"
          mensaje={`Bienvenido @${userData?.email}`}
          onClose={() => setShowWelcomeAlert(false)}
        />
      )}
      <Toolbar sx={{ minHeight: 110, px: 3 }}>
        {/* Logo que enlaza a la página de inicio */}
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <Box
            component="img"
            src={logo}
            alt="Logo Tienda"
            sx={{ height: 80, cursor: 'pointer', mr: 2 }}
          />
        </Link>
        <Box sx={{ flexGrow: 1 }} /> {/* Este Box actúa como espaciador flexible */}

        {/* Contenedor de los botones de navegación y la sección de usuario */}
        {/* Se oculta en pantallas muy pequeñas (xs) y se muestra en sm y superiores */}
        <Box sx={{ display: { xs: 'none', sm: 'flex', gap: 2 }, alignItems: 'center' }}>
          {/* Botones de navegación principales */}
          <Button color="inherit" component={Link} to="/home" startIcon={<ProductionQuantityLimitsIcon />} sx={{ fontSize: '1rem', fontWeight: 500 }}>
            Productos
          </Button>
          <Button color="inherit" component={Link} to="/favorites" startIcon={<FavoriteIcon />} sx={{ fontSize: '1rem', fontWeight: 500 }}>
            Favoritos
          </Button>
          <Button color="inherit" component={Link} to="/agregarProducto" startIcon={<AssignmentAddIcon />} sx={{ fontSize: '1rem', fontWeight: 500 }}>
            Agregar producto
          </Button>
          <Box>
            <IconButton onClick={handleMenuOpen}>
              <PersonPinIcon sx={{ color: '#FBC02D', fontSize: 40 }} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: 'black',
                  color: 'white',
                  border: '1px solid #FBC02D',
                  mt: 1,
                }
              }}
            >
              <MenuItem >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  💻{userData?.name || userData?.username}
                </Typography>
              </MenuItem>

              <MenuItem >
                <Typography variant="body2">
                  ✉️ {userData?.email}
                </Typography>
              </MenuItem>

              <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>
                <LogoutIcon sx={{ mr: 1 }} />
                Cerrar sesión
              </MenuItem>
            </Menu>
          </Box>

        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;