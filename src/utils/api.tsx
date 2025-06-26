import axios from "axios";

const api = axios.create();
api.defaults.baseURL = "https://api.hackaodonto2025.orangebox.technology/api/";

export default api;