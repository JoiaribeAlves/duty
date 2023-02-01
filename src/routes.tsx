import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Main } from "./components/main";
import { Shifts } from "./components/shifts";
import { About } from "./components/about";
import { Terms } from "./components/terms";
import { Policy } from "./components/policy";
import { NotFound } from "./components/not-found";

export function MainRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/plantoes" element={<Shifts />} />
				<Route path="/sobre" element={<About />} />
				<Route path="/termos-de-uso" element={<Terms />} />
				<Route path="/politica-de-privacidade" element={<Policy />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
