import { useQuery } from "react-query";
import format from "date-fns/format";
import { Helmet } from "react-helmet";
import { FaCamera, FaInfoCircle } from "react-icons/fa";

import { Layout } from "../Layout";
import { ErrorLoadData, Spiner } from "../Utils";
import { getDuties } from "../../services/api";

import styles from "./Styles.module.scss";

export function Shifts() {
	function getCurrentMonth() {
		const month = new Date().getMonth();

		switch (month) {
			case 0:
				return "january";
			case 1:
				return "february";
			case 2:
				return "march";
			case 3:
				return "april";
			case 4:
				return "may";
			case 5:
				return "june";
			case 6:
				return "july";
			case 7:
				return "august";
			case 8:
				return "september";
			case 9:
				return "october";
			case 10:
				return "november";
			default:
				return "december";
		}
	}

	const { data, isError, isLoading } = useQuery(
		["shifts"],
		() => getDuties(getCurrentMonth()),
		{
			staleTime: 1000 * 60, // One minute
		}
	);

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

				<meta
					name="description"
					content={`Escala de plantões de farmácia durante o mês de ${currentMonth}`}
				/>
			</Helmet>

			<Layout>
				<h1 className={styles.title}>
					Escala de plantões para o mês de {currentMonth}
				</h1>

				<ul className={styles.shifts}>
					{data?.data.map((shift) => (
						<li key={shift.id}>
							<span>
								<FaCamera />
							</span>

							<p>{format(new Date(shift.startDate), "dd - MM - yy")}</p>

							<a href={`/plantoes/${shift.pharmacyId}`}>
								<FaInfoCircle />
								Detalhes
							</a>
						</li>
					))}
				</ul>
			</Layout>
		</>
	);
}
