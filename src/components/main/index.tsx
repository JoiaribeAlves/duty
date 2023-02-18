import {
	FaMapMarkedAlt,
	FaWhatsapp,
	FaPhoneAlt,
	FaTelegramPlane,
} from "react-icons/fa";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import Helmet from "react-helmet";

import { getDutyByDate } from "../../services/api";
import { Layout } from "../Layout";
import { ErrorLoadData, Spinner } from "../Utils";

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
	function addZeroIfNecessary(number: number): string {
		return number < 10 ? `0${number}` : `${number}`;
	}

	function setDateAndTimeToLoadContent(): string {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const day = now.getDate();
		const hours = now.getHours();

		if (hours >= 0 && hours < 7) {
			return `${year}-${addZeroIfNecessary(month)}-${addZeroIfNecessary(
				day
			)}T02%3a00%3a00.000Z`;
		} else if (month === 12 && day === 31) {
			return `${year + 1}-01-01T02%3a00%3a00.000Z`;
		} else if (day === 31) {
			return `${year}-${addZeroIfNecessary(month + 1)}-01T02%3a00%3a00.000Z`;
		} else {
			return `${year}-${addZeroIfNecessary(month)}-${addZeroIfNecessary(
				day < 31 ? day + 1 : day
			)}T02%3a00%3a00.000Z`;
		}
	}

	function maskPhoneNumber(number: string) {
		const n = number.split("");

		if (n.length === 10) {
			return `${n[0]}${n[1]} ${n[2]}${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}`;
		} else {
			return `${n[2]}${n[3]} ${n[4]}${n[5]}${n[6]}${n[7]}-${n[8]}${n[9]}${n[10]}${n[11]}`;
		}
	}

	const { isLoading, error, data, refetch } = useQuery(
		["duty"],
		() => getDutyByDate(setDateAndTimeToLoadContent()),
		{
			staleTime: 1000 * 60, // One minute
		}
	);

	if (isLoading) {
		return (
			<Layout>
				<Spinner />
			</Layout>
		);
	}

	if (error) {
		return (
			<Layout>
				<ErrorLoadData
					// @ts-ignore
					fnRefresh={refetch}
				/>
			</Layout>
		);
	}

	return (
		<>
			<Helmet>
				<title>Início | Plantão de Farmácia</title>

				<meta
					name="description"
					content="Veja qual farmácia está de plantão no município de Jaru-RO."
				/>
			</Helmet>

			<Layout>
				<ToastContainer theme="dark" />

				<h1 className={styles.title}>
					Farmácia de plantão em {data?.data.pharmacy.address.city}
				</h1>

				<div className={styles.timer}>
					<div className={styles.start}>
						<p>Início</p>
						<div>
							<p>
								{format(new Date(data!.data.duty.startDate), "dd - MM - yy")}
							</p>
							<p>{format(new Date(data!.data.duty.startDate), "HH") + "h"}</p>
						</div>
					</div>

					<div className={styles.end}>
						<p>Término</p>
						<div>
							<p>{format(new Date(data!.data.duty.endDate), "dd - MM - yy")}</p>
							<p>{format(new Date(data!.data.duty.endDate), "HH") + "h"}</p>
						</div>
					</div>
				</div>

				<div className={styles.address}>
					<h2>{data?.data.pharmacy.name}</h2>

					<h3>Telefone{data?.data.pharmacy.whatsapp ? "s" : ""}:</h3>
					<div className={styles.phones}>
						<p>
							<a
								href={`tel:+55${data?.data.pharmacy.telephone}`}
								className={styles.tel}
								title="Telefone Fixo"
							>
								<FaPhoneAlt />
								{maskPhoneNumber(data?.data.pharmacy.telephone || "")}
							</a>
						</p>

						{data?.data.pharmacy.whatsapp && (
							<p>
								<a
									href={`https://api.whatsapp.com/send?phone=${data?.data.pharmacy.whatsapp}&text=Olá, estou precisando de atendimento`}
									target="_blank"
									className={styles.whats}
									title="Charmar no Whatsapp"
								>
									<FaWhatsapp /> {maskPhoneNumber(data?.data.pharmacy.whatsapp)}
								</a>
							</p>
						)}
					</div>

					<h3>Endereço:</h3>
					<p>
						{`${data?.data.pharmacy.address.street}, ${data?.data.pharmacy.address.number}, ${data?.data.pharmacy.address.district} - ${data?.data.pharmacy.address.complement}`}
					</p>

					<a
						href={data?.data.pharmacy.address.linkToMap}
						target="_blank"
						className={styles.maps}
						title="Ver no mapa"
					>
						<FaMapMarkedAlt /> Ver no mapa
					</a>
				</div>

				<div className={styles.groups}>
					<p>
						Faça parte do nosso grupo no Whatsapp ou do canal no Telegram e
						saiba, em primeira mão, qual farmácia está de plantão.
					</p>

					<div className={styles.links}>
						<a
							href="https://chat.whatsapp.com/EhzdDGQ5TJNC83LVdUwMcl"
							target="_blank"
							className={styles.whatsappLink}
						>
							<FaWhatsapp />
							Entrar no grupo do Whatsapp
						</a>

						<a
							href="https://t.me/plantao_de_farmacia_jaru"
							target="_blank"
							className={styles.telegramLink}
						>
							<FaTelegramPlane />
							Entrar no canal do Telegram
						</a>
					</div>
				</div>
			</Layout>
		</>
	);
}
