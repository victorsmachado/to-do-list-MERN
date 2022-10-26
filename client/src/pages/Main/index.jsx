import React from "react";
import { useState } from "react";
import styles from "./styles.module.css";
import { Paper, TextField, Button } from "@material-ui/core";
import Task from "../../components/Task";
import { useEffect } from "react";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../services/taskServices";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  const [user] = useState(localStorage.getItem("usuario"));
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  const notifyError = () => {
    toast.error("Server Error!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const notifySucess = () => {
    toast.success("Notificação salva com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const notifySucessDelete = () => {
    toast.success("Notificação deletada com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifySucessUpdate = () => {
    toast.success("Notificação alterada com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTasks();
        console.log(data);
        console.log(typeof data);
        setTasks(data);
      } catch (error) {
        notifyError();
        console.log(error);
      }
    };
    fetchData().catch(console.error);
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setCurrentTask(input.value);
  };

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
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.App}>
      <Paper elevation={3} className={styles.container}>
        <div className={styles.main_container}>
          <nav className={styles.navbar}>
            <h1>Olá {user}</h1>
            <button className={styles.white_btn} onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </div>
        <div className={styles.heading}>TO-DO</div>
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
            placeholder="Add New TO-DO"
          />
          <Button
            style={{ height: "40px" }}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Adicionar tarefa
          </Button>
        </form>
        <div>
          {tasks.map((task) => {
            console.log(task.user);
            console.log(user);
            if (task.user === user) {
              return (
                <Task
                  id={task._id}
                  completed={task.completed}
                  onUpdate={() => handleUpdate(task._id)}
                  task={task.task}
                  onDelete={() => handleDelete(task._id)}
                />
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
