//Lista de Imports
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import InputForm from "../../components/inputs/InputForm";
import BlackButton from "../../components/buttons/BlackButton";
import WhiteButton from "../../components/buttons/WhiteButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../services/authServices";

//Page Login
const Login = () => {
  //Definição dos estados
  const [data, setData] = useState({ email: "", senha: "" });

  //Definição do alerta de erro TOASTIFY
  const notify = () => {
    toast.error("Email ou senha incorretos !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  //Função para alterar o estado do data quando o usuário digita
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  //Função para fazer o login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await login(data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("usuario", res.data.usuario);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        notify();
      }
    }
  };

  //Renderização da página
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Faça o Login</h1>
            <InputForm
              type="text"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={data.email}
            />
            <InputForm
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="senha"
              value={data.senha}
            />
            <BlackButton text="Login" />
          </form>
        </div>
        <div className={styles.right}>
          <h1>Novo aqui?</h1>
          <Link to="/signup">
            <WhiteButton text="Faça o cadastro" />
          </Link>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
