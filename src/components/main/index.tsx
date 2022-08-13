import { useEffect, useState } from "react";
import { FaMapMarkedAlt, FaWhatsapp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";
import "react-toastify/dist/ReactToastify.css";

import { getDuty } from "../../services/api";
import { Layout } from "../Layout";
import { Spiner } from "../Utils";

import { IDuty } from "../../interfaces";

import styles from "./Styles.module.scss";

function getBrowserInfo(): void {
	const isChrome = navigator.userAgent.includes("Chrome");

	if (!isChrome) {
		toast.info(
			"Para uma melhor experiência utilize o navegador Google Chrome."
		);
	}
}
getBrowserInfo();

export function Main(): JSX.Element {
	const [pharmacyData, setPharmacyData] = useState<IDuty>();
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

	function addZeroIfNecessary(number: number): string {
		return number < 10 ? `0${number}` : `${number}`;
	}

	function setDateAndTimeToLoadContent(): void {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const day = now.getDate();
		const hours = now.getHours();

		if (hours >= 0 && hours < 7) {
			loadContent(
				`${year}-${addZeroIfNecessary(month)}-${addZeroIfNecessary(
					day
				)}T02%3a00%3a00`
			);
		} else {
			loadContent(
				`${year}-${addZeroIfNecessary(month)}-${addZeroIfNecessary(
					day + 1
				)}T02%3a00%3a00`
			);
		}
	}

	useEffect(() => {
		setDateAndTimeToLoadContent();
	}, []);

	return (
		<>
			{loading ? (
				<Spiner />
			) : (
				<Layout>
					<ToastContainer theme="dark" />

					<h1 className={styles.title}>
						Farmácia de plantão em {pharmacyData?.pharmacy.address.city}
					</h1>

					<div className={styles.timer}>
						<div className={styles.start}>
							<p>Início</p>
							<div>
								<p>
									{format(
										new Date(pharmacyData!.duty.startDate),
										"dd - MM - yy"
									)}
								</p>
								<p>
									{format(new Date(pharmacyData!.duty.startDate), "HH") + "h"}
								</p>
							</div>
						</div>

						<div className={styles.end}>
							<p>Término</p>
							<div>
								<p>
									{format(new Date(pharmacyData!.duty.endDate), "dd - MM - yy")}
								</p>
								<p>
									{format(new Date(pharmacyData!.duty.endDate), "HH") + "h"}
								</p>
							</div>
						</div>
					</div>

					<div className={styles.address}>
						<h2>{pharmacyData?.pharmacy.name}</h2>

						<h3>Telefone:</h3>
						<p>{`${pharmacyData?.pharmacy.telephone}`}</p>
						<br />

						<h3>Endereço:</h3>
						<p>
							{`${pharmacyData?.pharmacy.address.street}, ${pharmacyData?.pharmacy.address.number}, ${pharmacyData?.pharmacy.address.district} - ${pharmacyData?.pharmacy.address.complement}`}
						</p>

						<a
							href={pharmacyData?.pharmacy.address.linkToMap}
							target="_blank"
							className={styles.maps}
							title="Ver no mapa"
						>
							<FaMapMarkedAlt /> Ver no mapa
						</a>
					</div>

					{pharmacyData?.pharmacy.whatsapp && (
						<a
							href={`https://api.whatsapp.com/send?phone=${pharmacyData?.pharmacy.whatsapp}&text=Olá, estou precisando de atendimento`}
							target="_blank"
							className={styles.chat}
							title="Charmar no Whatsapp"
						>
							<FaWhatsapp />
						</a>
					)}
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
