import {Dialog,DialogTitle,DialogContent,DialogContentText, DialogActions,Button} from "@mui/material";

const AlertConfirm = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Confirmar Registro</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de de la contraseña?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancelar</Button>
        <Button
          onClick={() => onClose(true)}
          variant="contained"
          sx={{ backgroundColor: "#FBC02D", color: "#000", fontWeight: 600 }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertConfirm;