import axios from "axios";
const apiUrl = "http://localhost:8080/api/auth";

//Utilização de axios para requisições http para a API de autenticação

//Função de login
export function login(data) {
  return axios.post(apiUrl, data);
}
