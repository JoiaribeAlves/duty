import { useQuery } from "react-query";
import format from "date-fns/format";
import { Helmet } from "react-helmet";

import { Layout } from "../Layout";
import { ErrorLoadData, Spiner } from "../Utils";
import { getDuties } from "../../services/api";

import styles from "./Styles.module.scss";

export function Shifts() {
	const { data, isError, isLoading } = useQuery(["shifts"], () => getDuties(), {
		staleTime: 1000 * 60, // One minute
	});

	if (isLoading) {
		return <Spiner />;
	}

	if (isError) {
		return <ErrorLoadData />;
	}

	const months = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];

	const currentMonthIndex = new Date().getMonth();
	const currentMonth = months[currentMonthIndex];

	return (
		<>
			<Helmet>
				<title>Escala de Plantões</title>

				<meta name="description" content="Escala de plantões de farmácia durante o mês corrente." />
			</Helmet>

			<Layout>
				<h1 className={styles.title}>
					Lista de plantões para o mês de {currentMonth}
				</h1>

				<ul className={styles.shifts}>
					{data?.data.map((shift) => (
						<li key={shift.id}>
							<p>{format(new Date(shift.startDate), "dd/MM")}</p>
						</li>
					))}
				</ul>
			</Layout>
		</>
	);
}
