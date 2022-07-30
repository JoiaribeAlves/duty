import { useEffect, useState } from "react";
import { Layout } from "../Layout";
import { Spiner } from "../Utils";

import styles from "./Styles.module.scss";

export function Main() {
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [second, setSecond] = useState(0);

	function setTime() {
		setInterval(() => {
			const time = new Date();

			setHour(time.getHours());
			setMinute(time.getMinutes());
			setSecond(time.getSeconds());
		}, 1000);
	}

	useEffect(() => {
		setTime();
	}, []);
	return (
		<Layout>
			<>
				<h1 className={styles.title}>
					<span>Drogarias Ultra Popular</span> está de plantão hoje
				</h1>

				<div className={styles.timer}>
					<p>Tempo restante de plantão:</p>

					<ul>
						<li>
							<p>{hour < 10 ? `0${hour}` : hour}</p>
							<small>{hour >= 2 ? "Horas" : "Hora"}</small>
						</li>

						<li>
							<p>{minute < 10 ? `0${minute}` : minute}</p>
							<small>{minute >= 2 ? "Minutos" : "Minuto"}</small>
						</li>

						<li>
							<p>{second < 10 ? `0${second}` : second}</p>
							<small>{second >= 2 ? "Segundos" : "Segundo"}</small>
						</li>
					</ul>
				</div>
			</>
		</Layout>
	);
}
