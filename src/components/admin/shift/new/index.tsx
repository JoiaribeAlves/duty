import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { LayoutAdm } from "../../Layout";
import { Spiner } from "../../../Utils";
import { createShift, getPharmacies } from "../../../../services/api";

import styles from "./Styles.module.scss";

interface IShiftSchema {
	pharmacyId: string;
	date: string;
	month: string;
}

const schema = yup
	.object({
		pharmacyId: yup
			.string()
			.required("Este campo é obrigatório.")
			.min(3, "O Nome deve ter pelo menos 3 caracteres."),
		date: yup
			.string()
			.required("Este campo é obrigatório.")
			.min(10, "Data inválida.")
			.max(10, "Data inválida."),
		month: yup.string().required("Este campo é obrigatório."),
	})
	.required();

export function NewShiftAdm() {
	const [creating, setCreating] = useState(false);

	const {
		handleSubmit,
		register,
		setFocus,
		formState: { errors },
	} = useForm<IShiftSchema>({ resolver: yupResolver(schema) });

	const tenSecondsInMilliseconds = 1000 * 10;
	const { data, isError, isLoading } = useQuery(
		["pharmacies"],
		() => getPharmacies(),
		{
			staleTime: tenSecondsInMilliseconds,
		}
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
			"Não foi possível obter os dados das farmácias. Tente novamente."
		);

		return (
			<LayoutAdm>
				<>
					<ToastContainer theme="dark" />

					<div className={styles.btnRefreshWindow}>
						<button type="button" onClick={() => window.location.reload()}>
							Tentar novamente
						</button>
					</div>
				</>
			</LayoutAdm>
		);
	}

	const onSubmit: SubmitHandler<IShiftSchema> = async (data) => {
		if (confirm("Você realmente deseja cadastrar um novo Plantão?")) {
			const formattedData = {
				pharmacyId: data.pharmacyId,
				month: data.month,
				startDate: `${data.date}T02:00:00.000Z`,
				endDate: `${data.date}T11:00:00.000Z`,
			};

			try {
				setCreating(true);

				await createShift(formattedData);

				setFocus("pharmacyId");
				toast.success("Plantão criado com sucesso.");
			} catch (error) {
				if (axios.isAxiosError(error)) {
					if (error.response?.status === 422) {
						return toast.warning(
							"Já existe um Plantão cadastrado para esta data."
						);
					} else {
						return toast.error(
							"Não foi possível criar o Plantão. Erro interno no servidor."
						);
					}
				}
			} finally {
				setCreating(false);
			}
		}
	};

	return (
		<LayoutAdm>
			<>
				<ToastContainer theme="dark" />

				<h2>Novo Plantão</h2>

				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.inputs}>
						<div className={styles.input}>
							<select {...register("pharmacyId")}>
								{data?.data.map((pharmacy, index) => (
									<option key={index + 1} value={pharmacy.id}>
										{pharmacy.name}
									</option>
								))}
							</select>
							<small>{errors.pharmacyId?.message}</small>
						</div>

						<div className={styles.input}>
							<input
								type="text"
								placeholder="Data yyyy-mm-dd"
								{...register("date")}
							/>
							<small>{errors.date?.message}</small>
						</div>

						<div className={styles.input}>
							<select {...register("month")}>
								<option value="january">Janeiro</option>
								<option value="february">Fevereiro</option>
								<option value="march">Março</option>
								<option value="april">Abril</option>
								<option value="may">Maio</option>
								<option value="june">Junho</option>
								<option value="july">Julho</option>
								<option value="august">Agosto</option>
								<option value="september">Setembro</option>
								<option value="october">Outubro</option>
								<option value="november">Novembro</option>
								<option value="december">Dezembro</option>
							</select>
							<small>{errors.month?.message}</small>
						</div>
					</div>

					<div className={styles.actions}>
						<button type="submit" disabled={creating}>
							<FaSave />
							Cadastrar
						</button>
					</div>
				</form>
			</>
		</LayoutAdm>
	);
}
