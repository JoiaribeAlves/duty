import { FaBars } from "react-icons/fa";

import styles from "./Styles.module.scss";

export function Header() {
	return (
		<header className={styles.header}>
			<button type="button">
				<FaBars />
			</button>
		</header>
	);
}
