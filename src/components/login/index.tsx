import { FormEvent, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaUserCircle } from "react-icons/fa";

import { AuthContext } from "../../contexts/auth";

import styles from "./Styles.module.scss";

export function Login() {
	const { loading, login, errorMsg, authenticated } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	if (authenticated) {
		return <Navigate to="/admin" />
	}

	async function handleLogin(ev: FormEvent): Promise<void> {
		ev.preventDefault();

		login(email, password);
	}

	return (
		<>
			<Helmet>
				<title>Fazer login</title>

				<meta name="robots" content="noindex,nofollow" />
				<meta name="description" content="Página de login." />
			</Helmet>

			<form className={styles.form} onSubmit={handleLogin}>
				<div className={styles.avatar}>
					<FaUserCircle />
				</div>

				{errorMsg && <small>Falha na autenticação</small>}

				<div className={styles.fieldGroup}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						placeholder="Digite seu email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className={styles.fieldGroup}>
					<label htmlFor="password">Senha</label>
					<input
						type="password"
						name="password"
						placeholder="Digite sua senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className={styles.fieldGroup}>
					<button type="submit" disabled={loading}>
						Entrar
					</button>
				</div>
			</form>
		</>
	);
}
