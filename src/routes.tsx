import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Main } from "./components/main";
import { Main2 } from "./components/main/index2";
import { NotFound } from "./components/not-found";

export function MainRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
