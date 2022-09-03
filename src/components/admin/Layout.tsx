import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

import styles from "./Styles.module.scss";

export function LayoutAdm({ children }: { children: JSX.Element }) {
	const { logout } = useContext(AuthContext);

	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>

			<header className={styles.header}>Admin</header>

			<nav className={styles.navbar}>
				<ul>
					<li>
						<Link to="/admin">Dashboard</Link>
					</li>

					<li>
						<Link to="/admin/farmacias">Farmácias</Link>
					</li>

					<li>
						<Link to="/admin/plantoes">Plantões</Link>
					</li>

					<li>
						<button onClick={() => logout()}>Sair</button>
					</li>
				</ul>
			</nav>

			<main className={styles.mainAdm}>{children}</main>
		</>
	);
}
