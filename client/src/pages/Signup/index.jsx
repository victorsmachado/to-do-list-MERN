import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import InputForm from "../../components/inputs/InputForm";
import GreenButton from "../../components/buttons/GreenButton";
import WhiteButton from "../../components/buttons/WhiteButton";

const Signup = () => {
	const [data, setData] = useState({
		nome: "",
		email: "",
		senha: "",
		dataDeNascimento: "",
        endereco:""
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Bem vindo de volta</h1>
					<Link to="/login">
						<WhiteButton text="Fazer Login"/>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Criar conta</h1>
						<InputForm
						type='text'
						placeholder='Nome'
						onChange={handleChange}
						name="nome"
						value={data.nome}
						/>

						<InputForm
						type='text'
						placeholder='Email'
						onChange={handleChange}
						name="email"
						value={data.email}
						/>

						<InputForm
						type='password'
						placeholder='Senha'
						onChange={handleChange}
						name="senha"
						value={data.senha}
						/>

						<InputForm
						type='text'
						placeholder='Data de Nascimento'
						onChange={handleChange}
						name="dataDeNascimento"
						value={data.dataDeNascimento}
						/>

						<InputForm
						type='text'
						placeholder='Endereço'
						onChange={handleChange}
						name="endereco"
						value={data.endereco}
						/>
						
                    

                        
						{error && <div className={styles.error_msg}>{error}</div>}
						<GreenButton text="Cadastrar"/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;