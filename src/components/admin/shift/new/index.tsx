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
import { IShift } from "../../../../interfaces";

import styles from "../../Styles.module.scss";

const schema = yup
	.object({
		pharmacyId: yup
			.string()
			.required("Este campo é obrigatório.")
			.min(3, "O Nome deve ter pelo menos 3 caracteres."),
		startDate: yup
			.string()
			.required("Este campo é obrigatório.")
			.min(10, "Data inválida.")
			.max(10, "Data inválida."),
		endDate: yup
			.string()
			.required("Este campo é obrigatório.")
			.min(10, "Data inválida.")
			.max(10, "Data inválida."),
	})
	.required();

export function NewShiftAdm() {
	const [creating, setCreating] = useState(false);

	const {
		handleSubmit,
		register,
		setFocus,
		formState: { errors },
	} = useForm<IShift>({ resolver: yupResolver(schema) });

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

	const onSubmit: SubmitHandler<IShift> = async (data) => {
		if (confirm("Você realmente deseja cadastrar um novo Plantão?")) {
			const formatedData = {
				pharmacyId: data.pharmacyId,
				startDate: `${data.startDate}T02:00:00.000Z`,
				endDate: `${data.endDate}T11:00:00.000Z`,
			};

			try {
				setCreating(true);

				await createShift(formatedData);

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
							<input type="text" placeholder="ID do Plantão" disabled={true} />
						</div>

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
								placeholder="Início yyyy-mm-dd"
								{...register("startDate")}
							/>
							<small>{errors.startDate?.message}</small>
						</div>

						<div className={styles.input}>
							<input
								type="text"
								placeholder="Término yyyy-mm-dd"
								{...register("endDate")}
							/>
							<small>{errors.endDate?.message}</small>
						</div>
					</div>

					<button type="submit" disabled={creating}>
						<FaSave />
						Cadastrar Plantão
					</button>
				</form>
			</>
		</LayoutAdm>
	);
}
