import { FaCalendarAlt, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./Styles.module.scss";

export function Menu() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<Link to="/">
						<FaHome /> Início
					</Link>
				</li>

				<li>
					<Link to="/plantoes">
						<FaCalendarAlt />
						Plantões
					</Link>
				</li>
			</ul>
		</nav>
	);
}
