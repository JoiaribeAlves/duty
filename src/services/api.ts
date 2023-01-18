import axios from "axios";

import { IDuties, IDuty, IPharmacy } from "../interfaces";

export const app = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function getAllPharmacies() {
	return app.get<IPharmacy[] | []>("/pharmacies");
}

export async function getPharmacyById(id: string) {
	return app.get<IPharmacy>(`/pharmacies/${id}`);
}

export async function getAllDuties() {
	return app.get<IDuties[] | []>("/duties");
}

export async function getDutyByDate(date: string) {
	return app.get<IDuty>(`/duties/date/${date}`);
}

export async function getDutyById(id: string) {
	return app.get<IDuty>(`/duties/id/${id}`);
}

export async function getDutyByMonth(month: string) {
	return app.get<IDuties[] | []>(`/duties/month/${month}`);
}
