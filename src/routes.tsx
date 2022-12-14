import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/auth";
import { Main } from "./components/main";
import { Shifts } from "./components/shifts";
import { About } from "./components/about";
import { Login } from "./components/admin/login";
import { Protected } from "./components/protected";
import { DashboardAdm } from "./components/admin/dashboard";
import { PharmaciesAdm } from "./components/admin/pharmacies";
import { NewPharmacyAdm } from "./components/admin/pharmacy/new";
import { EditPharmacyAdm } from "./components/admin/pharmacy/edit";
import { ShiftsAdm } from "./components/admin/shifts";
import { NewShiftAdm } from "./components/admin/shift/new";
import { EditShiftAdm } from "./components/admin/shift/edit";
import { NotFound } from "./components/not-found";

export function MainRoutes() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/plantoes" element={<Shifts />} />
					<Route path="/sobre" element={<About />} />

					<Route path="/admin/login" element={<Login />} />
					<Route
						path="/admin"
						element={
							<Protected>
								<DashboardAdm />
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

					<Route
						path="/admin/farmacia/nova"
						element={
							<Protected>
								<NewPharmacyAdm />
							</Protected>
						}
					/>

					<Route
						path="/admin/farmacia/editar/:pharmacyId"
						element={
							<Protected>
								<EditPharmacyAdm />
							</Protected>
						}
					/>

					<Route
						path="/admin/plantoes"
						element={
							<Protected>
								<ShiftsAdm />
							</Protected>
						}
					/>

					<Route
						path="/admin/plantao/novo"
						element={
							<Protected>
								<NewShiftAdm />
							</Protected>
						}
					/>

					<Route
						path="/admin/plantao/editar/:shiftId"
						element={
							<Protected>
								<EditShiftAdm />
							</Protected>
						}
					/>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}
