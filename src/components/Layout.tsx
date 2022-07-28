import React from "react";
import { Header } from "./header";
import { Menu } from "./menu";

interface ILayoutProps {
	children: React.ReactNode;
}

export function Layout({ children }: ILayoutProps) {
	return (
		<>
			<Header />

			<Menu />

			<main className="main">
				{children}
			</main>
		</>
	);
}
