import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";
import { Spiner } from "../Utils";

import styles from "./styles.module.scss";

export function Protected({ children }: { children: JSX.Element }) {
	const { loading, authenticated, logout } = useContext(AuthContext);

	if (loading) {
		return <Spiner />;
	}

	if (!authenticated) {
		return <Navigate to="/admin/login" replace={true} />;
	}

	return <>{children}</>;
}
