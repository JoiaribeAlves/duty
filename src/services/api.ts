import axios from "axios";

const app = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function getFarmacy(id: string) {
	return app.get(`/pharmacy/${id}`);
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
