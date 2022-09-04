import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IContext, IUser } from "../interfaces";
import { app, signin } from "../services/api";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<IUser | null>(null);
	const [loading, setLoading] = useState(true);
	const [errorMsg, seterrorMsg] = useState(false);

	useEffect(() => {
		const recoveredUser = localStorage.getItem("@user");
		const token = localStorage.getItem("@token");

		if (recoveredUser && token) {
			setUser(JSON.parse(recoveredUser));
			app.defaults.headers.common["Authorization"] = "Bearer " + token.slice(1, token.length - 1);
		}

		setLoading(false);
	}, []);

	async function login(email: string, password: string): Promise<void> {
		const loggedUser = await signin(email, password);

		if (loggedUser) {
			setUser(loggedUser);

			localStorage.setItem("@user", JSON.stringify(loggedUser.user));
			localStorage.setItem("@token", JSON.stringify(loggedUser.token));

			app.defaults.headers.common[
				"Authorization"
			] = "Bearer " + loggedUser.token;

			navigate("/admin");
		} else {
			seterrorMsg(true);
		}
	}

	function logout(): void {
		setUser(null);
		localStorage.removeItem("@user");
		localStorage.removeItem("@token");
		app.defaults.headers.common["Authorization"] = "";
		navigate("/admin/login");
		seterrorMsg(false);
	}

	return (
		<AuthContext.Provider
			value={{
				loading,
				errorMsg,
				authenticated: !!user,
				user,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
