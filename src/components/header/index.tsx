import { ReactNode } from "react";

import styles from "./Styles.module.scss";

interface IHeaderProps {
	children: ReactNode;
}

export function Header({ children }: IHeaderProps) {
	return <header className={styles.header}>{children}</header>;
}
