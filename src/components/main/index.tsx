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
				<h1 className={styles.title}>Farmácia de plantão hoje em Jaru</h1>

				<div className={styles.watch}>
					{/* <p>Esse plantão acabará em:</p> */}

					<div className={styles.marks}>
						<div>{hour < 10 ? `0${hour}` : hour}</div>

						<span>:</span>

						<div>{minute < 10 ? `0${minute}` : minute}</div>

						<span>:</span>

						<div>{second < 10 ? `0${second}` : second}</div>
					</div>
				</div>
			</>
		</Layout>
	);
}
