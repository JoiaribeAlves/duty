import { FaHeart } from "react-icons/fa";

import styles from "./Styles.module.scss";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				Desenvolvido com <span>{<FaHeart />}</span> por{" "}
				<a href="mailto:joiaribe_@hotmail.com">Joiaribe Alves</a>
			</p>
		</footer>
	);
}
