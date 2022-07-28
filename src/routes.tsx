import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Main } from "./components/main";

export function MainRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
			</Routes>
		</BrowserRouter>
	);
}
