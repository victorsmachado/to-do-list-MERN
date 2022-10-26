import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import InputForm from "../../components/inputs/InputForm";
import GreenButton from "../../components/buttons/GreenButton";

const Login = () => {
	const [data, setData] = useState({ email: "", senha: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data.token);
			localStorage.setItem('usuario',res.data.usuario)
			window.location = "/";
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
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Faça o Login</h1>
						<InputForm
						type='text'
						placeholder='Email'
						onChange={handleChange}
						name="email"
						value={data.email}
						/>
						<InputForm
						type='password'
						placeholder='Password'
						onChange={handleChange}
						name="senha"
						value={data.senha}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<GreenButton text="Login"/>
					</form>
				</div>
				<div className={styles.right}>
					<h1>Novo aqui?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Faça o cadastro.
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;