import axios from "axios";
const apiUrl = "http://localhost:8080/api/users";

//Utilização de axios para requisições http para a API do usuario

//Função de requisição de registrar no banco de dados
export function register(data) {
  return axios.post(apiUrl, data);
}
