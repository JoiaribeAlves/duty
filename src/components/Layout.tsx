import { ReactNode, useState } from "react";
import { FaBars } from "react-icons/fa";

import { Header } from "./header";
import { Menu } from "./menu";

interface ILayoutProps {
	children: ReactNode;
}

export function Layout({ children }: ILayoutProps) {
	const [menu, setMenu] = useState(false);

	function handleMenu() {
		setMenu(!menu);
	}

	return (
		<>
			<Header>
				<button type="button" onClick={handleMenu}>
					<FaBars />
				</button>
			</Header>

			<Menu customClass={menu ? "open" : ""} />

			<main>{children}</main>
		</>
	);
}
