import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom"; // No necesitamos useRoutes aquí
import logo from '../img/logo.jpg';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// Componentes de Material-UI
import { Box, TextField, Button, Typography,  Card,  CardContent, InputAdornment,IconButton,} from '@mui/material';
import AlertError from '../Components/Alerts';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorValidacion, setErrorValidacion] = useState('');
    // Asumimos que `users.entities` es un array de objetos de usuario con `username` y `password`
    const users = useSelector((state) => state.users.entities);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Buscar el usuario en el estado de Redux
        const userFound = users.find((user) => user.email === email && user.password === password);

        if (userFound) {
            // Guardar los datos completos del usuario (o al menos su ID/nombre) en localStorage
            // ¡Importante! Asegúrate de guardar los datos relevantes del usuario, no solo el username.
            // Por ejemplo, `localStorage.setItem('auth', JSON.stringify({ name: userFound.username, /* otros datos si los hay */ }));`
            // Basándonos en tu auth.js, que parsea, lo ideal es guardar un objeto.
            localStorage.setItem('auth', JSON.stringify({ name: userFound.username , email: userFound.email,}));

            console.log('Login Success');
            navigate('/home'); // Redirige a la página de inicio
        } else {
            setErrorValidacion("Credenciales Invalidas")
            setEmail("");
            setPassword("");
            console.log('Login Failed');
        }
    };
    const PasswordVisibility = () => setShowPassword((prev) => !prev);
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
             {errorValidacion && <AlertError severity="error" mensaje={errorValidacion} onClose={() => setErrorValidacion('')}></AlertError>}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Logo */}
                <Box
                    component="img"
                    src={logo}
                    alt="Logo Tienda"
                    sx={{ height: 120, mb: 1 }}
                />

                {/* Formulario */}
                <Card sx={{
                    minWidth: 300, maxWidth: 400, p: 3, boxShadow: 3, border: '2px solid #FBC02D', borderRadius: 3, backgroundColor: 'black'
                }}>
                    <CardContent>
                        <Typography variant="h5" component="h3" gutterBottom align="center" color='white'>
                            Acceso
                        </Typography>
                        <Box component="form" onSubmit={handleLogin}>
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
                                            <IconButton onClick={PasswordVisibility} sx={{ color: "white" }}edge="end">
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
                                Ingresar
                            </Button>
                            <Typography align="center" variant="body2" color="white">
                                ¿No tenés una cuenta?{" "}
                                <Button color="inherit" component={Link} to="/registro" sx={{
                                    p: 0,
                                    minWidth: 0,
                                    textTransform: 'none',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        color: '#FFD740',
                                        backgroundColor: 'transparent',
                                    },
                                    '&:focus': {
                                        color: '#FFD740',
                                    },
                                }}>Registrate</Button>
                            </Typography>
                        </Box>

                    </CardContent>
                </Card>
            </Box>
        </Box >
    );
};

export default Login;