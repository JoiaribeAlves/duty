import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/auth";
import { Main } from "./components/main";
import { Shifts } from "./components/shifts";
import { Login } from "./components/admin/login";
import { Protected } from "./components/protected";
import { Dashboard } from "./components/admin/dashboard";
import { PharmaciesAdm } from "./components/admin/pharmacies";
import { NotFound } from "./components/not-found";

export function MainRoutes() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/plantoes" element={<Shifts />} />

					<Route path="/admin/login" element={<Login />} />
					<Route
						path="/admin"
						element={
							<Protected>
								<Dashboard />
							</Protected>
						}
					/>

					<Route
						path="/admin/farmacias"
						element={
							<Protected>
								<PharmaciesAdm />
							</Protected>
						}
					/>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}
