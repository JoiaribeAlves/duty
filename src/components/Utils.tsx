import { ReactNode } from "react";

export function Spiner() {
	return <span className="spiner"></span>;
}

interface IAlert {
	children: ReactNode;
}

export function Alert({ children }: IAlert) {
	return (
		<div className="alert">
			{children}

			<button type="button">OK</button>
		</div>
	);
}
