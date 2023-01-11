import { useState } from "react";
import { useQuery } from "react-query";
import format from "date-fns/format";
import { Helmet } from "react-helmet";
import {
	FaCamera,
	FaInfoCircle,
	FaMapMarkerAlt,
	FaPhone,
	FaTimes,
} from "react-icons/fa";

import { Layout } from "../Layout";
import { ErrorLoadData, Spiner } from "../Utils";
import { getDuties, getPharmacy } from "../../services/api";
import { IPharmacy } from "../../interfaces";

import styles from "./Styles.module.scss";

export function Shifts() {
	const [showModal, setShowModal] = useState(false);
	const [pharmacyModal, setPharmacyModal] = useState<IPharmacy>();

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

	async function loadPharmacyData(id: string) {
		setShowModal(true);

		const res = await getPharmacy(id);

		setPharmacyModal(res.data);
	}

	const currentMonthIndex = new Date().getMonth();
	const currentMonth = months[currentMonthIndex];

	return (
		<>
			<Helmet>
				<title>Escala de Plantões</title>

				<meta
					name="description"
					content={`Escala das farmácias que ficarão de plantão durante o mês de ${currentMonth}`}
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

							<button
								type="button"
								onClick={() => loadPharmacyData(shift.pharmacyId)}
							>
								<FaInfoCircle /> Detalhes
							</button>
						</li>
					))}
				</ul>

				{showModal && (
					<div className={styles.modal}>
						<div
							className={styles.background}
							style={{
								backgroundImage: `url("${pharmacyModal?.imageUrl}")`,
							}}
						></div>

						<div className={styles.content}>
							<h3>{pharmacyModal?.name}</h3>
							<p>
								<FaMapMarkerAlt /> {pharmacyModal?.address.street},{" "}
								{pharmacyModal?.address.number},{" "}
								{pharmacyModal?.address.district}
							</p>
							<p>
								<FaPhone />
								{pharmacyModal?.telephone}
							</p>
						</div>

						<button
							type="button"
							className={styles.closeModal}
							onClick={() => setShowModal(false)}
						>
							<FaTimes />
						</button>
					</div>
				)}
			</Layout>
		</>
	);
}
