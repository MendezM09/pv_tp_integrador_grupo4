
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link'; 

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2, 
        mt: 'auto', 
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: 'center',
        borderTop: '1px solid',
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary">
          {'© '}
          <Link color="inherit" href="https://mui.com/"> 
            Mi Tienda Grupo4
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Universidad Nacional de jujuy
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;