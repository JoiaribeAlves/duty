import { SubmitHandler, useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { IShift } from "../../../../interfaces";
import { Spiner } from "../../../Utils";
import { LayoutAdm } from "../../Layout";
import styles from "../../Styles.module.scss";

export function EditShiftAdm() {
	const { handleSubmit, register, formState: { errors } } = useForm();

	const { data, isError, isLoading } = useQuery(["editShift"], () => {});

	if (isLoading) {
		return (
			<LayoutAdm>
				<Spiner />
			</LayoutAdm>
		);
	}

	if (isError) {
		toast.error("Não foi possível obter os dados do plantão. Tente novamente.");

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

	// const onSubmit: SubmitHandler<IShift> = async (data) => {
	// 	return;
	// }
	const onSubmit = async (data: any) => {
		return;
	}
	return (
		<LayoutAdm>
			<>
				<ToastContainer theme="dark" />

				<h2>Editar Plantão</h2>

				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.inputs}>
						<div className={styles.input}>
							<input
								type="text"
								placeholder="Id do Plantão"
							/>
						</div>

						<div className={styles.input}>
							<select>
								<option value="null">Selecione</option>
							</select>
						</div>
					</div>

					<button type="submit">
						<FaSave />
						Salvar alterações
					</button>
				</form>
			</>
		</LayoutAdm>
	);
}
