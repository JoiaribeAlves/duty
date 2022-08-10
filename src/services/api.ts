import axios from "axios";

import { IFarmacy } from "../interfaces";

const app = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function getFarmacy(id: string) {
	return app.get<IFarmacy>(`/pharmacy/${id}`);
}

export async function getFarmacies() {
	return app.get("/pharmacies");
}

export async function getDuties() {
	return app.get("/duties");
}

export async function getDuty(date: string) {
	return app.get(`/duty/${date}`);
}
