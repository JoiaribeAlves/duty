import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { LayoutAdm } from "../Layout";
import { Spiner } from "../../Utils";
import { deletePharmacy, getPharmacies } from "../../../services/api";

import styles from "./Styles.module.scss";

export function PharmaciesAdm() {
	const tenSecondsInMilliseconds = 1000 * 10;
	const { data, isLoading, isError } = useQuery(
		["pharmacies"],
		() => getPharmacies(),
		{ staleTime: tenSecondsInMilliseconds }
	);

	if (isLoading) {
		return (
			<LayoutAdm>
				<Spiner />
			</LayoutAdm>
		);
	}

	if (isError) {
		toast.error(
			"Não foi possível obter a lista de farmácias. Tente novamente."
		);

		return (
			<LayoutAdm>
				<>
					<ToastContainer theme="dark" />

					<button
						type="button"
						className={styles.btnRefreshWindow}
						onClick={() => window.location.reload()}
					>
						Tentar novamente
					</button>
				</>
			</LayoutAdm>
		);
	}

	async function delPharmacy(id: string) {
		try {
			if (confirm("Você realmente deseja deletar esta farmácia?")) {
				await deletePharmacy(id);

				toast.success("Farmácia deletada com sucesso.");
			}
		} catch (error) {
			toast.error("Falha ao deletar a farmácia.");
		}
	}

	return (
		<LayoutAdm>
			<>
				<ToastContainer theme="dark" />

				<p className={styles.new}>
					<Link to="/admin/farmacia/nova">
						<FaPlus /> Nova farmácia
					</Link>
				</p>

				<table className={styles.table}>
					<thead>
						<tr>
							<th>#</th>
							<th>Nome</th>
							<th>Editar</th>
							<th>Deletar</th>
						</tr>
					</thead>

					<tbody>
						{data?.data.map((pharmacy, index) => (
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
										onClick={() => delPharmacy(pharmacy.id!)}
									>
										<FaTrashAlt />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		</LayoutAdm>
	);
}
