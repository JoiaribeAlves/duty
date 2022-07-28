import { FaCalendarAlt, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./Styles.module.scss";

interface IMenuPros {
	customClass: string;
}

export function Menu(props: IMenuPros) {
	return (
		<nav className={`${styles.nav} ${props.customClass}`}>
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
