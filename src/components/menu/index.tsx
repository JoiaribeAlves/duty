import { FaCalendarAlt, FaHome, FaInfoCircle, FaUserShield } from "react-icons/fa";
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

				<li>
					<Link to="/sobre">
						<FaInfoCircle />
						Sobre
					</Link>
				</li>

				<li>
					<Link to="/admin/login">
						<FaUserShield />
						Área Restrita
					</Link>
				</li>
			</ul>
		</nav>
	);
}
