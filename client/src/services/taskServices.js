import axios from "axios";
const apiUrl = "http://localhost:8080/api/tasks";

//Utilização de axios para requisições http para a API das tasks

//Função de requisição da lista de tasks
export function getTasks() {
  return axios.get(apiUrl);
}

//Função para adicionar uma nova task no banco
export function addTask(task) {
  return axios.post(apiUrl, task);
}

//Função para atualizar o status de uma task no banco
export function updateTask(id, task) {
  return axios.put(apiUrl + "/" + id, task);
}

//Função para deletar uma task no banco
export function deleteTask(id) {
  return axios.delete(apiUrl + "/" + id);
}
