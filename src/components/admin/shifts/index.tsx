import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";

import { deleteShift, getDuties } from "../../../services/api";
import { Spiner } from "../../Utils";

import { LayoutAdm } from "../Layout";

import styles from "../Styles.module.scss";

export function ShiftsAdm() {
	const tenSecondsInMilliseconds = 1000 * 60;
	const { data, isError, isLoading } = useQuery(["shift"], () => getDuties(), {
		staleTime: tenSecondsInMilliseconds,
	});

	if (isLoading) {
		return (
			<LayoutAdm>
				<Spiner />
			</LayoutAdm>
		);
	}

	if (isError) {
		toast.error("Não foi possível obter os dados. Tente novamente.");

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

	async function delShift(id: string) {
		if (confirm("Você realmente deseja excluir este plantão?")) {
			try {
				await deleteShift(id);

				toast.success("O Plantão foi deletado com sucesso.");
			} catch (error) {
				toast.error("Erro ao deletar o Plantão. Tente novamente.");
			}
		}
	}

	return (
		<LayoutAdm>
			<>
				<ToastContainer theme="dark" />

				<p className={styles.btnNewPharmacyOrShift}>
					<Link to="/admin/plantao/novo">
						<FaPlus /> Novo Plantão
					</Link>
				</p>

				<table className={styles.table}>
					<thead>
						<tr>
							<th>#</th>
							<th>Início</th>
							<th>Término</th>
							<th>Editar</th>
							<th>Excluir</th>
						</tr>
					</thead>

					<tbody>
						{data?.data.map((shift, index) => (
							<tr key={index + 1}>
								<td className={styles.textCenter}>
									{index + 1 < 10 ? `0${index + 1}` : index + 1}
								</td>

								<td className={styles.textCenter}>
									{format(new Date(shift.startDate), "dd - MM - yy")}
								</td>

								<td className={styles.textCenter}>
									{format(new Date(shift.endDate), "dd - MM - yy")}
								</td>

								<td className={styles.textCenter}>
									<Link to={`/admin/plantao/editar/${shift.id}`}>
										<FaEdit />
									</Link>
								</td>

								<td className={styles.textCenter}>
									<button
										type="button"
										className={styles.btnDelete}
										onClick={() => delShift(shift.id)}
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
