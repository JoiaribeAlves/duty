import { useEffect, useState } from "react";

import { Timer } from "./timer";
import { Layout } from "../Layout";
import { Spiner } from "../Utils";

import styles from "./Styles.module.scss";
import { FaMapMarkedAlt, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const data = {
	name: "Ultra Popular",
	telephone: "5569993042139",
	address: {
		street: "Av. Pe. Adolpho Rohl",
		number: 1623,
		district: "Setor 2",
		complement: "Esquina com Av. Marechal Rondon",
		maps: "https://goo.gl/maps/Soz3buK4ByKgtmyj9",
	},
};

export function Main() {
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [second, setSecond] = useState(0);
	const [message, setMessage] = useState("");

	const now = new Date();
	const currentMonth = now.getMonth() + 1;
	let nextDuty = new Timer("2022-08-02T22:00:00");

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
				<h1 className={styles.title}>
					<span>{data.name}</span> estará de plantão em:
					{/* <span>{data.name}</span> encerrará o plantão em: */}
				</h1>

				<div className={styles.timer}>
					<ul>
						<li title={`${hour < 10 ? `0${hour} Hora` : `${hour} Horas`}`}>
							<p>{hour < 10 ? `0${hour}` : hour}</p>
							<small>{hour >= 2 ? "Horas" : "Hora"}</small>
						</li>

						<li
							title={`${
								minute < 10 ? `0${minute} Minuto` : `${minute} Minutos`
							}`}
						>
							<p>{minute < 10 ? `0${minute}` : minute}</p>
							<small>{minute >= 2 ? "Minutos" : "Minuto"}</small>
						</li>

						<li
							title={`${
								second < 10 ? `0${second} Segundo` : `${second} Segundos`
							}`}
						>
							<p>{second < 10 ? `0${second}` : second}</p>
							<small>{second >= 2 ? "Segundos" : "Segundo"}</small>
						</li>
					</ul>
				</div>

				<div className={styles.address}>
					<h2>Endereço:</h2>
					<p>
						{`${data.address.street}, ${data.address.number}, ${data.address.district} - ${data.address.complement}`}
					</p>

					<div className={styles.maps}>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<a href={data.address.maps} target="_blank" title="Ver no mapa">
							<FaMapMarkedAlt /> Ver no mapa
						</a>
					</div>
				</div>

				<a
					href={`https://api.whatsapp.com/send?phone=${data.telephone}&text=Olá, boa noite`}
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
