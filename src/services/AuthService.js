import axios from "axios";
import { jwtDecode } from "jwt-decode";
import apiClient from "./apiClient";

const BASE_URL = "http://localhost:8080";

const login = (loginRequest) => {
  return axios.post(`${BASE_URL}/auth/login`, loginRequest);
};

const getAllEmployees = () => {
  return apiClient.get("/employees");
};

const saveToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  [];
  return localStorage.getItem("token");
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const isTokenExpired = () => {
  const token = getToken();

  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);

    return decodedToken.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

const AuthService = {
  login,
  saveToken,
  getToken,
  removeToken,
  isTokenExpired,
};

export default AuthService;
