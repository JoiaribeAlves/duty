import { ReactNode, useState } from "react";
import { FaArrowLeft, FaBars } from "react-icons/fa";

import { Header } from "./header";
import { Menu } from "./menu";
import { Footer } from "./footer";

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
					{menu ? <FaArrowLeft /> : <FaBars />}
				</button>
			</Header>

			<Menu customClass={menu ? "open" : ""} />

			<main className="main">{children}</main>

			<Footer />
		</>
	);
}
