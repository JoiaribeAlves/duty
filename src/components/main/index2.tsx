import { useEffect, useState } from "react";

import { getDuty } from "../../services/api";
import { Layout } from "../Layout";
import { Spiner } from "../Utils";

import { IDuty } from "../../interfaces";

import styles from "./Styles.module.scss";
import countdown from "countdown";

export function Main2(): JSX.Element {
	const [pharmacyData, setPharmacyData] = useState<IDuty | null>(null);
	const [loading, setLoading] = useState(true);
	const [errorLoad, setErrorLoad] = useState(false);

	async function loadContent(date: string): Promise<void> {
		try {
			const { data } = await getDuty(date);

			setPharmacyData(data);
		} catch (error) {
			setErrorLoad(true);
		} finally {
			setLoading(false);
		}
	}

	function date() {
		const now = new Date();

		const t = countdown(new Date(), new Date("2022-10-05"));

		console.log(t);
	}
	date();

	useEffect(() => {
		setTimeout(() => {
			loadContent("2022-08-10T22%3a00%3a00");
		}, 2000);
	}, []);

	return (
		<>
			{loading ? (
				<Spiner />
			) : (
				<Layout>
					<p>nome: {pharmacyData?.pharmacy.name}</p>
					<p>telefone: {pharmacyData?.pharmacy.telephone}</p>
					<p>endereço: {pharmacyData?.pharmacy.address.street}</p>
					<p>número: {pharmacyData?.pharmacy.address.number}</p>
					<p>bairro: {pharmacyData?.pharmacy.address.district}</p>
					<p>complemento: {pharmacyData?.pharmacy.address.complement}</p>
				</Layout>
			)}

			{errorLoad && (
				<div className={styles.errorLoad}>
					<p>Ocorreu um erro ao carregar os dados.</p>

					<button type="button" onClick={() => window.location.reload()}>
						Tentar novamente
					</button>
				</div>
			)}
		</>
	);
}
