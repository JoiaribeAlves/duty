import "dotenv/config";
import axios from "axios";

const app = axios.create({
	baseURL: process.env.API_BASE_URL,
});

export function getFarmacy(id: string) {
	return app.get(`/pharmacy/${id}`);
}

export function getFarmacies() {
	return app.get("/pharmacies");
}

export function getDuties() {
	return app.get("/duties");
}

export function getDuty(date: string) {
	return app.get(`/duty/${date}`);
}
