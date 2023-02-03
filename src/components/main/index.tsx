import { FaMapMarkedAlt, FaWhatsapp } from "react-icons/fa";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import Helmet from "react-helmet";

import { getDutyByDate } from "../../services/api";
import { Layout } from "../Layout";
import { ErrorLoadData, Spiner, WhatsappGroupModal } from "../Utils";

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

	const { isLoading, error, data } = useQuery(
		["duty"],
		() => getDutyByDate(setDateAndTimeToLoadContent()),
		{
			staleTime: 1000 * 60, // One minute
		}
	);

	if (isLoading) {
		return <Spiner />;
	}

	if (error) {
		return <ErrorLoadData />;
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

					<h3>Telefone:</h3>
					<p>{`${data?.data.pharmacy.telephone}`}</p>
					<br />

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

				<WhatsappGroupModal />

				<div className={styles.whatsappGroup}>
					<p>
						Faça parte do nosso grupo no Whatsapp e saiba em primeira mão quem
						está de plantão.
					</p>
					<a href="https://chat.whatsapp.com/EhzdDGQ5TJNC83LVdUwMcl">
						<FaWhatsapp />
						Entrar no grupo
					</a>
				</div>

				{data?.data.pharmacy.whatsapp && (
					<a
						href={`https://api.whatsapp.com/send?phone=${data?.data.pharmacy.whatsapp}&text=Olá, estou precisando de atendimento`}
						target="_blank"
						className={styles.chat}
						title="Charmar no Whatsapp"
					>
						<FaWhatsapp />
					</a>
				)}
			</Layout>
		</>
	);
}
