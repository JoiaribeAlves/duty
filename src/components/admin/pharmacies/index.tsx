import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { LayoutAdm } from "../Layout";
import { deletePharmacy, getPharmacies } from "../../../services/api";
import { IPharmacy } from "../../../interfaces/index";

import styles from "./Styles.module.scss";

export function PharmaciesAdm() {
	const [pharmacies, setPharmacies] = useState<IPharmacy[] | []>([]);

	async function loadContent() {
		const { data } = await getPharmacies();

		setPharmacies(data);
	}

	async function delPharmacy(id: string) {
		try {
			if (confirm("Você realmente deseja deletar esta farmácia?")) {
				await deletePharmacy(id);

				toast.success("Farmácia deletada com sucesso.");
				loadContent();
			}
		} catch (error) {
			toast.error("Falha ao deletar a farmácia.");
		}
	}

	useEffect(() => {
		loadContent();
	}, []);

	return (
		<LayoutAdm>
			<>
				<ToastContainer theme="dark" />

				<table className={styles.table}>
					<thead>
						<tr>
							<th>#</th>
							<th>Nome</th>
							<th>Editar</th>
							<th>Deletar</th>
						</tr>
					</thead>

					{pharmacies.length > 0 ? (
						<tbody>
							{pharmacies.map((pharmacy, index) => (
								<tr key={index}>
									<td className={styles.textCenter}>{index + 1}</td>

									<td>{pharmacy.name}</td>

									<td className={styles.textCenter}>
										<Link to={`/admin/farmacia/editar/${pharmacy.id}`}>
											<FaEdit />
										</Link>
									</td>

									<td className={styles.textCenter}>
										<button
											type="button"
											className={styles.btnDelete}
											onClick={() => delPharmacy(pharmacy.id)}
										>
											<FaTrashAlt />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					) : (
						<tbody>
							<tr>
								<td colSpan={4}>Nenhuma farmácia encontrada.</td>
							</tr>
						</tbody>
					)}
				</table>
			</>
		</LayoutAdm>
	);
}
