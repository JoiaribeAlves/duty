import axios, { AxiosRequestConfig} from "axios";

import { IDuties, IDuty, IFarmacy, IUser } from "../interfaces";

export const app = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function getFarmacy(id: string) {
	return app.get<IFarmacy>(`/pharmacy/${id}`);
}

export async function getFarmacies() {
	return app.get<IFarmacy[]>("/pharmacies");
}

export async function getDuties() {
	return app.get<IDuties[]>("/duties");
}

export async function getDuty(date: string) {
	return app.get<IDuty>(`/duty/${date}`);
}

export async function signin(
	email: string,
	password: string
): Promise<IUser | null> {
	try {
		const { data } = await app.post<IUser>("/session", { email, password });

		return data;
	} catch (error) {
		return null;
	}
}

// app.interceptors.request.use((config: AxiosRequestConfig) => {
// 	const token = localStorage.getItem("@token");

// 	if (config.headers === undefined) {
// 		config.headers = {};
// 	}

// 	config.headers.Authorization = `Bearer ${token}`;

// 	return config;
// });
