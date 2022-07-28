import { FaRoute } from "react-icons/fa";

import { Layout } from "../Layout";

import styles from "./Styles.module.scss";

export function NotFound() {
	return (
		<Layout>
			<div className={styles.content}>
				<h1>
					<FaRoute /> Erro 404!
				</h1>

				<h2>Página não encontrada!</h2>
			</div>
		</Layout>
	);
}
