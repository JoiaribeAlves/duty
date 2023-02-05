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

import { getDuties, getPharmacyById } from "../../services/api";
import { useMonth } from "../../hooks/useMonth";
import { Layout } from "../Layout";
import { ErrorLoadData, Spinner } from "../Utils";
import { IPharmacy } from "../../interfaces";

import styles from "./Styles.module.scss";

export function Shifts() {
	const [showModal, setShowModal] = useState(false);
	const [pharmacyModal, setPharmacyModal] = useState<IPharmacy | null>(null);

	const { data, isError, isLoading, refetch } = useQuery(
		["duties"],
		() => getDuties(new Date().getMonth() + 1),
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

	if (isError) {
		return (
			<Layout>
				<ErrorLoadData fnRefresh={refetch} />
			</Layout>
		);
	}

	async function loadPharmacyData(id: string) {
		setShowModal(true);

		const res = await getPharmacyById(id);

		setPharmacyModal(res.data);
	}

	return (
		<>
			<Helmet>
				<title>Escala | Plantão de Farmácia</title>

				<meta
					name="description"
					content={`Escala das farmácias que ficarão de plantão durante o mês de ${useMonth(
						new Date().getMonth() + 1
					)}.`}
				/>
			</Helmet>

			<Layout>
				<h1 className={styles.title}>
					Escala de plantões para o mês de {useMonth(new Date().getMonth() + 1)}
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
					<div className={styles.modalContainer}>
						<div className={styles.modal}>
							<div
								className={styles.image}
								style={{
									backgroundImage: `url("${pharmacyModal?.imageUrl}")`,
								}}
							></div>

							<div className={styles.info}>
								<h3>{pharmacyModal?.name ?? ""}</h3>
								<p>
									{pharmacyModal ? (
										<>
											<FaMapMarkerAlt /> {pharmacyModal.address.street},{" "}
											{pharmacyModal.address.number},{" "}
											{pharmacyModal.address.district}
										</>
									) : (
										<FaMapMarkerAlt />
									)}
								</p>
								<p>
									{pharmacyModal ? (
										<>
											<FaPhone />
											{pharmacyModal.telephone}
										</>
									) : (
										<FaPhone />
									)}
								</p>
							</div>

							<button
								type="button"
								className={styles.closeModal}
								onClick={() => {
									setShowModal(false), setPharmacyModal(null);
								}}
							>
								<FaTimes />
							</button>
						</div>
					</div>
				)}
			</Layout>
		</>
	);
}
