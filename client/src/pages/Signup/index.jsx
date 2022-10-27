//Lista de imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import InputForm from "../../components/inputs/InputForm";
import BlackButton from "../../components/buttons/BlackButton";
import WhiteButton from "../../components/buttons/WhiteButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../../services/userServices";

//Page de cadastro
const Signup = () => {
  //Definição dos estados dos dados de cadastro
  const [data, setData] = useState({
    nome: "",
    email: "",
    senha: "",
    dataDeNascimento: "",
    endereco: "",
  });

  //Definição dos alertas
  //Definição do alerta de erro TOASTIFY
  const notifyError = () => {
    toast.error("Já existe usuário com esse email!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  //Definição do alerta de sucesso TOASTIFY
  const notifySucess = () => {
    toast.success("Usuário criado com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  //Uso da função navigate do react router dom para redirecionar o usuário para a tela de login
  const navigate = useNavigate();

  //Função para alterar o estado do data enquanto o usuário digita
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  //Função para enviar os dados do cadastro para o servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await register(data);
      notifySucess();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        notifyError();
      }
    }
  };

  //Renderização da página
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Bem vindo de volta</h1>
          <Link to="/login">
            <WhiteButton text="Fazer Login" />
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Criar conta</h1>
            <InputForm
              type="text"
              placeholder="Nome"
              onChange={handleChange}
              name="nome"
              value={data.nome}
            />

            <InputForm
              type="text"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={data.email}
            />

            <InputForm
              type="password"
              placeholder="Senha"
              onChange={handleChange}
              name="senha"
              value={data.senha}
            />

            <InputForm
              type="text"
              placeholder="Data de Nascimento"
              onChange={handleChange}
              name="dataDeNascimento"
              value={data.dataDeNascimento}
            />

            <InputForm
              type="text"
              placeholder="Endereço"
              onChange={handleChange}
              name="endereco"
              value={data.endereco}
            />

            <BlackButton text="Cadastrar" />
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Signup;
