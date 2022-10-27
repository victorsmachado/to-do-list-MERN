//Lista de importações
import React from "react";
import { useState } from "react";
import styles from "./styles.module.css";
import { Paper, TextField, Button } from "@material-ui/core";
import Task from "../../components/Task";
import { useEffect } from "react";
import title from "../../assets/img/teste.PNG";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../services/taskServices";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pagina principal
const Main = () => {
  //Definição dos estados dos dados da to-do list
  const [user] = useState(localStorage.getItem("usuario"));
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  //Função para definir os alertas de erro e sucesso com TOASTIFY
  //Alerta de erro se servidor
  const notifyError = () => {
    toast.error("Server Error!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  //Alerta de sucesso quando a tarefa é salva
  const notifySucess = () => {
    toast.success("Tarefa salva com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  //Alerta de sucesso quando a tarefa é deletada
  const notifySucessDelete = () => {
    toast.success("Tarefa deletada com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  //Alerta de sucesso quando a tarefa é deletada
  const notifySucessUpdate = () => {
    toast.success("Tarefa alterada com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  //Função para pegar as tarefas do servidor
  //Foi usado use effect para que sempre que algo na tela ativar uma função ela possa reagir e ser executada
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (error) {
        notifyError();
        console.log(error);
      }
    };
    fetchData().catch(console.error);
  }, []);

  //Função para pegar os dados enquanto o usuário digita no input da task
  const handleChange = ({ currentTarget: input }) => {
    setCurrentTask(input.value);
  };

  //Função para adicionar uma nova tarefa
  const handleSubmit = async () => {
    const originalTasks = tasks;
    try {
      const data = await addTask({ task: currentTask, user: user });
      const tasks = originalTasks;
      tasks.push(data);
      notifySucess();
      setCurrentTask("");
    } catch (error) {
      notifyError();
      console.log(error);
    }
  };

  //Função para atualizar o status de uma tarefa
  const handleUpdate = async (currentTask) => {
    const originalTasks = tasks;
    try {
      const tasks = [...originalTasks];
      const index = tasks.findIndex((task) => task._id === currentTask);
      tasks[index] = { ...tasks[index] };
      tasks[index].completed = !tasks[index].completed;
      setTasks(tasks);
      await updateTask(currentTask, {
        completed: tasks[index].completed,
      });
      notifySucessUpdate();
    } catch (error) {
      notifyError();
      setTasks(originalTasks);
      console.log(error);
    }
  };

  //Função para deletar uma tarefa
  const handleDelete = async (currentTask) => {
    const originalTasks = tasks;
    try {
      const tasks = originalTasks.filter((task) => task._id !== currentTask);
      setTasks(tasks);
      await deleteTask(currentTask);
      notifySucessDelete();
    } catch (error) {
      notifyError();
      setTasks(originalTasks);

      console.log(error);
    }
  };

  //Função para fazer o logout, removendo os dados do usuario do localStorage
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  //Renderização da tela
  return (
    <div className={styles.App}>
      <Paper
        elevation={3}
        className={styles.container}
        style={{ borderRadius: "10px" }}
      >
        <div className={styles.main_container}>
          <nav className={styles.navbar}>
            <h1>Olá {user}</h1>
            <button className={styles.white_btn} onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </div>
        <div className={styles.heading}>
          <img
            style={{ width: "60%", height: 100 }}
            src={title}
            alt="To do list"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className={styles.flex}
          style={{ margin: "15px 0" }}
        >
          <TextField
            variant="outlined"
            size="small"
            style={{ width: "80%" }}
            value={currentTask}
            required={true}
            onChange={handleChange}
            placeholder="Adicionar nova tarefa"
          />
          <Button
            className={styles.addButton}
            style={{
              height: "40px",
              width: "30%",
              backgroundColor: "#3bb19b",
              color: "#fff",
              marginLeft: "10px",
              border: "none",
            }}
            variant="outlined"
            type="submit"
          >
            Adicionar tarefa
          </Button>
        </form>
        <div>
          {tasks.map((task) => {
            if (task.user === user) {
              return (
                <li key={task._id} style={{ listStyleType: "none" }}>
                  <Task
                    id={task._id}
                    completed={task.completed}
                    onUpdate={() => handleUpdate(task._id)}
                    task={task.task}
                    onDelete={() => handleDelete(task._id)}
                  />
                </li>
              );
            }
            return <p>Adicione tarefas!</p>;
          })}
        </div>
      </Paper>
      <ToastContainer />
    </div>
  );
};

export default Main;
