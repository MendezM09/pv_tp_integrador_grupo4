 export const ValidarUser = ({ password, email, users }) => {
    if (password.length < 6) {
        return "La contraseña debe tener más de 6 caracteres";
    }
    const emailNormalizado = email.toLowerCase().trim();
    const emailExistente = users.find(
        user => user.email.toLowerCase().trim() === emailNormalizado
    );

    if (emailExistente) {
        return "El email ya está registrado";
    }
    return null;
};
