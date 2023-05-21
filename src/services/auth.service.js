import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Register user
const register = async (userData) => {

    const response = await axios.post(`${baseURL}/usuarios`, userData);
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        ToastChakra('Usuario registrado', 'Bienvenido a la plataforma', 'success', 2500);
    }

    return response.data;
}

// Login user
const login = async (userData) => {
    
        const response = await axios.post(`${baseURL}/login`, userData);

        if(response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            ToastChakra('BIENVENIDO A LA PLATAFORMA - SGA', 'CARGANDO LOS DATOS ...', 'loading', 3500);
            return response.data;
        }
    
}

// updated my profile
const updateProfile = async (userData, token) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }

    const response = await axios.put(`${baseURL}/auth/update/${userData._id}`, userData, config);
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        ToastChakra('Perfil actualizado', 'Los datos se han actualizado correctamente', 'success', 2500);
        return response.data;
    }
}

// Logout user
const logout = () => {
    ToastChakra('CERRANDO SESIÓN ...', 'HASTA PRONTO, TE ESPERAMOS!', 'loading', 2000);
    localStorage.removeItem("user");
    // localStorage.removeItem("chakra-ui-color-mode");
    // window.location.reload();
}

const authService = {
    register,
    login,
    updateProfile,
    logout
}

export default authService;