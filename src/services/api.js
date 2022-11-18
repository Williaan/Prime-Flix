import axios from "axios";

//URL BASE: https://api.themoviedb.org/3/
//URL DA API:  /movie/now_playing?api_key=1630d10fd3e9f35433175201c404dd1a&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'

});

export default api;
