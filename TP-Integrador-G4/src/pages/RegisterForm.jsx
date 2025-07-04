import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { add } from "../store/usersSlice";
import { Box, TextField, Button, Typography, Card, CardContent, InputAdornment, IconButton, } from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logo from '../img/logo.jpg';
import AlertError from "../Components/Alerts";
import { ValidarUser } from "../services/ValidacionUser";
import AlertConfirm from "../Components/AlertConfirm";
const RegisterForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorValidacion, setErrorValidacion] = useState('');
    const [alertaExito, setAlertaExito] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [resolver, setResolver] = useState(null);
    const navigate = useNavigate();
    const lastId = useSelector((state) => state.users.entities.length);
    const users = useSelector((state) => state.users.entities);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = ValidarUser({ password: password, email: email, users });
        const confirmed = await showConfirmDialog(); // Espera confirmación del usuario
        if (!error && confirmed) {
            const data = {
                id: lastId + 1,
                username,
                password,
                email,
            };

            dispatch(add(data));
            setAlertaExito("Usuario Agregado Correctamente");

            setTimeout(() => {
                setAlertaExito(null);
                navigate('/');
            }, 2000);
        }
        else {
            setErrorValidacion(error);
            return;
        }

    };
    const PasswordVisibility = () => setShowPassword((prev) => !prev);
    const showConfirmDialog = () => {
        return new Promise((resolve) => {
            setOpenConfirm(true);
            setResolver(() => resolve);
        });
    };

    const handleConfirmClose = (result) => {
        setOpenConfirm(false);
        if (resolver) resolver(result);
    };
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Ocupa toda la altura de la ventana
                backgroundColor: "black"
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Logo */}
                <Box
                    component="img"
                    src={logo}
                    alt="Logo Tienda"
                    sx={{ height: 120, mb: 1 }}
                />
                {errorValidacion && <AlertError severity="error" mensaje={errorValidacion} onClose={() => setErrorValidacion('')}></AlertError>}
                {alertaExito && (<AlertError severity="success" mensaje={alertaExito} onClose={() => setAlertaExito(null)} />)}
                {/* Formulario */}
                <Card sx={{
                    minWidth: 300, maxWidth: 400, p: 3, boxShadow: 3, border: '2px solid #FBC02D', borderRadius: 3, backgroundColor: 'black'
                }}>
                    <CardContent>
                        <Typography variant="h5" component="h3" gutterBottom align="center" color='white'>
                            Registro
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                id="Username"
                                type="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#FBC02D', // Color del borde por defecto
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#FBC02D', // Color del borde en hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#FBC02D', // Color del borde cuando está enfocado
                                        },
                                    },
                                }}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                id="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#FBC02D', // Color del borde por defecto
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#FBC02D', // Color del borde en hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#FBC02D', // Color del borde cuando está enfocado
                                        },
                                    },
                                }}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{
                                    style: { color: 'white' },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={PasswordVisibility} sx={{ color: "white" }} edge="end">
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}

                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#FBC02D',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#FBC02D',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#FBC02D',
                                        },
                                    },
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 2, mb: 1,
                                    backgroundColor: '#FBC02D',
                                    color: '#000',
                                    fontWeight: 600,
                                    '&:hover': {
                                        backgroundColor: '#FFD740',
                                    }
                                }}
                            >
                                Guardar
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            {openConfirm && (
                <AlertConfirm open={openConfirm} onClose={handleConfirmClose} />
            )}
        </Box >
    )
}
export default RegisterForm;