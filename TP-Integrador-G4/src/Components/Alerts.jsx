import { Alert, AlertTitle, Box } from "@mui/material";

const AlertError = ({ severity, mensaje, onClose }) => {
  // Estilos según el tipo de alerta
  const styles = {
    error: {
      border: '2px solid red',
      backgroundColor: '#ffe6e6',
      boxShadow: '0px 0px 20px rgba(255,0,0,0.6)',
      title: 'Error',
    },
    success: {
      border: '2px solid green',
      backgroundColor: '#e6ffed',
      boxShadow: '0px 0px 20px rgba(25, 255, 21, 0.6)',
      title: 'Éxito',
    },
    warning: {
      border: '2px solid orange',
      backgroundColor: '#fff8e1',
      boxShadow: '0px 0px 20px rgba(255,165,0,0.6)',
      title: 'Advertencia',
    },
    info: {
      border: '2px solid #1976d2',
      backgroundColor: '#e3f2fd',
      boxShadow: '0px 0px 20px rgba(25,118,210,0.6)',
      title: 'Información',
    }
  };

  const currentStyle = styles[severity] || styles.error;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        width: '90%',
        maxWidth: '500px',
      }}
    >
      <Alert
        severity={severity}
        onClose={onClose}
        sx={{
          fontSize: '1.2rem',
          p: 3,
          border: currentStyle.border,
          borderRadius: 2,
          backgroundColor: currentStyle.backgroundColor,
          boxShadow: currentStyle.boxShadow,
          textAlign: 'center',
        }}
      >
        <AlertTitle sx={{ fontSize: '1.5rem' }}>
          {currentStyle.title}
        </AlertTitle>
        {mensaje}
      </Alert>
    </Box>
  );
};

export default AlertError;