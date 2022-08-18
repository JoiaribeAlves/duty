import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";
import { Spiner } from "../Utils";

export function Protected({ children }: { children: JSX.Element }) {
	const { loading, authenticated, logout } = useContext(AuthContext);

	if (loading) {
		return <Spiner />;
	}

	if (!authenticated) {
		return <Navigate to="/admin/login" replace={true} />;
	}

	return (
		<>
			<button onClick={() => logout()}>Sair</button>
			<hr />
			{children}
		</>
	);
}
