import axios from "axios";

const BASE_URL = "http://localhost:8080";

const login = (loginRequest) => {
    return axios.post(`${BASE_URL}/auth/login`, loginRequest);
};

const AuthService = {
    login
};

export default AuthService;