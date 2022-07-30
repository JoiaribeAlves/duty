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
					Drogarias Ultra Popular está de plantão hoje
				</h1>

				<div className={styles.timer}>
					<p>Esse plantão acabará em:</p>

					<ul>
						<li>
							<p>{hour < 10 ? `0${hour}` : hour}</p>
							<small>Hora(s)</small>
						</li>

						<li>
							<p>{minute < 10 ? `0${minute}` : minute}</p>
							<small>Minuto(s)</small>
						</li>

						<li>
							<p>{second < 10 ? `0${second}` : second}</p>
							<small>Segundo(s)</small>
						</li>
					</ul>
				</div>
			</>
		</Layout>
	);
}
