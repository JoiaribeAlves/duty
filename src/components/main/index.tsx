import { useEffect, useState } from "react";
import { FaMapMarkedAlt, FaWhatsapp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Timer } from "./timer";
import { Layout } from "../Layout";

import styles from "./Styles.module.scss";

const data = {
	name: "Farmácia Mais Saúde",
	telephone: "5569992525658",
	address: {
		street: "Av. Florianópolis",
		number: 1719,
		district: "Setor 7",
		complement: "Em frente ao hospital municipal",
		linkToMaps: "https://goo.gl/maps/JzDnAJ52RiwbFQxf7",
	},
};

function getBrowserInfo(): void {
	const isChrome = navigator.userAgent.includes("Chrome");

	if (!isChrome) {
		toast.info(
			"Para uma melhor experiência utilize o navegador Google Chrome."
		);
	}
}
getBrowserInfo();

export function Main() {
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [second, setSecond] = useState(0);

	const now = new Date();
	const currentHours = now.getHours();
	const currentMinutes = now.getMinutes();
	const currentMonth = now.getMonth() + 1;
	let nextDuty = new Timer("2022-08-08T07:00:00");

	// if (now.getHours() < 22) {
	// 	nextDuty = new Timer(`${now.getFullYear()}-${currentMonth < 9 ? "0"+currentMonth : currentMonth}-${now.getDate()}T22:00:00 GMT-0400`);
	// } else {
	// 	nextDuty = new Timer(`${now.getFullYear()}-${currentMonth < 9 ? "0"+currentMonth : currentMonth}-${now.getDate() + 1}T07:00:00 GMT-0400`);
	// }

	// console.log(new Timer(`${nextDuty.targetDate}`));

	function setTime(): void {
		setInterval(() => {
			setHour(nextDuty.total[1]);
			setMinute(nextDuty.total[2]);
			setSecond(nextDuty.total[3]);
		}, 1000);
	}

	useEffect(() => {
		setTime();
	}, []);

	return (
		<Layout>
			<>
				<ToastContainer theme="dark" />

				<h1 className={styles.title}>
					{currentHours >= 7 &&
					currentMinutes >= 1 &&
					currentHours <= 21 &&
					currentMinutes <= 59 ? (
						<>O plantão iniciará em:</>
					) : (
						<>O plantão encerrará em:</>
					)}
				</h1>

				<div className={styles.timer}>
					<ul>
						<li title={`${hour < 10 ? `0${hour} Hora(s)` : `${hour} Hora(s)`}`}>
							<p>{hour < 10 ? `0${hour}` : hour}</p>
							<small>{hour >= 2 ? "Horas" : "Hora"}</small>
						</li>

						<li
							title={`${
								minute < 10 ? `0${minute} Minuto(s)` : `${minute} Minuto(s)`
							}`}
						>
							<p>{minute < 10 ? `0${minute}` : minute}</p>
							<small>{minute >= 2 ? "Minutos" : "Minuto"}</small>
						</li>

						<li
							title={`${
								second < 10 ? `0${second} Segundo(s)` : `${second} Segundo(s)`
							}`}
						>
							<p>{second < 10 ? `0${second}` : second}</p>
							<small>{second >= 2 ? "Segundos" : "Segundo"}</small>
						</li>
					</ul>
				</div>

				<div className={styles.address}>
					<h2>{data.name}</h2>

					<h3>Endereço:</h3>
					<p>
						{`${data.address.street}, ${data.address.number}, ${data.address.district} - ${data.address.complement}`}
					</p>

					<a
						href={data.address.linkToMaps}
						target="_blank"
						className={styles.maps}
						title="Ver no mapa"
					>
						<FaMapMarkedAlt /> Ver no mapa
					</a>
				</div>

				<a
					href={`https://api.whatsapp.com/send?phone=${data.telephone}&text=Olá`}
					target="_blank"
					className={styles.chat}
					title="Charmar no Whatsapp"
				>
					<FaWhatsapp />
				</a>
			</>
		</Layout>
	);
}
