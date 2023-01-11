import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { LayoutAdm } from "../../Layout";
import { Spiner } from "../../../Utils";
import { updatePharmacy, getPharmacy } from "../../../../services/api";
import { IPharmacy } from "../../../../interfaces";

import styles from "../Styles.module.scss";

interface IFormInputs {
	name: string;
	telephone: string;
	whatsapp: string;
	street: string;
	number: number;
	district: string;
	complement: string;
	linkToMap: string;
	city: string;
	state: string;
	imageUrl: string;
}

const schema = yup
	.object({
		name: yup
			.string()
			.required("O Nome é obrigatório.")
			.min(3, "O Nome deve ter pelo menos 3 caracteres."),
		telephone: yup
			.string()
			.required("O Telefone é obrigatório.")
			.min(12, "Telefone inválido.")
			.max(12, "Telefone inválido."),
		whatsapp: yup.string(),
		street: yup
			.string()
			.required("O nome da Avenida/Rua é obrigatório.")
			.min(3, "O nome da Avenida/Rua deve ter pelo menos 3 caracteres."),
		number: yup
			.number()
			.required("O Número do estabelecimento é obrigatório.")
			.positive("O Número do estabelecimento não pode ser negativo.")
			.integer('O Número do estabelecimento não pode ser "quebrado".'),
		district: yup
			.string()
			.required("O nome do Bairro é obrigatório.")
			.min(3, "O nome do Bairro deve ter pelo menos 3 caracteres."),
		complement: yup
			.string()
			.required("O Complemento é obrigatório.")
			.min(3, "O Complemento deve ter pelo menos 3 caracteres."),
		linkToMap: yup
			.string()
			.required("O Link do Google Maps é obrigatório.")
			.min(20, "O Link do Google Maps deve ter pelo menos 20 caracteres."),
		city: yup
			.string()
			.required("A Cidade é obrigatória.")
			.min(3, "A Cidade deve ter pelo menos 3 caracteres."),
		state: yup
			.string()
			.required("O Estado é obrigatório.")
			.min(2, "O Estado deve ter 2 caracteres.")
			.max(2, "O Estado deve ter 2 caracteres."),
	})
	.required();

export function EditPharmacyAdm() {
	const { pharmacyId } = useParams<{ pharmacyId: string }>();

	const {
		handleSubmit,
		register,
		setFocus,
		formState: { errors },
	} = useForm<IFormInputs>({ resolver: yupResolver(schema) });

	const { data, isError, isLoading } = useQuery(
		["pharmacy"],
		() => getPharmacy(pharmacyId!),
		{ cacheTime: 0 }
	);

	if (isLoading) {
		return (
			<LayoutAdm>
				<Spiner />
			</LayoutAdm>
		);
	}

	if (isError) {
		{
			toast.error("Não foi possível obter os dados. Tente novamente.");
		}

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

	const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
		const dataFormated: IPharmacy = {
			name: data.name,
			telephone: data.telephone,
			whatsapp: data.whatsapp,
			address: {
				street: data.street,
				number: data.number,
				district: data.district,
				complement: data.complement,
				linkToMap: data.linkToMap,
				city: data.city,
				state: data.state,
			},
			imageUrl: data.imageUrl,
		};

		try {
			await updatePharmacy(pharmacyId!, dataFormated);

			toast.success("Farmácia editada com sucesso.");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return toast.error(
					"Falha ao editar a Farmácia. Erro interno no servidor."
				);
			}
		}
	};

	return (
		<LayoutAdm>
			<>
				<ToastContainer theme="dark" />

				<h2>Editar Farmácia</h2>

				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.inputs}>
						<div className={styles.input}>
							<input
								type="text"
								placeholder="Nome da Farmácia"
								defaultValue={data?.data.name}
								{...register("name")}
							/>
							<small>{errors.name?.message}</small>
						</div>

						<div className={styles.input}>
							<input
								type="text"
								placeholder="Telefone Fixo"
								defaultValue={data?.data.telephone}
								{...register("telephone")}
							/>
							<small>{errors.telephone?.message}</small>
						</div>

						<div className={styles.input}>
							<input
								type="text"
								placeholder="Celular/Whatsapp"
								defaultValue={data?.data.whatsapp}
								{...register("whatsapp")}
							/>
							<small>{errors.whatsapp?.message}</small>
						</div>

						<div className={styles.input}>
							<input
								type="text"
								placeholder="Nome da Avenida/Rua"
								defaultValue={data?.data.address.street}
								{...register("street")}
							/>
							<small>{errors.street?.message}</small>
						</div>

						<div className={styles.input}>
							<input
								type="text"
								placeholder="Número do Estabelecimento"
								defaultValue={data?.data.address.number}
								{...register("number")}
							/>
							<small>{errors.number?.message}</small>
						</div>

						<div className={styles.input}>
							<input
								type="text"
								placeholder="Nome do Bairro"
								defaultValue={data?.data.address.district}
								{...register("district")}
							/>
							<small>{errors.district?.message}</small>
						</div>

						<div className={styles.input}>
							<input
								type="text"
								placeholder="Complemento/Ponto de Referência"
								defaultValue={data?.data.address.complement}
								{...register("complement")}
							/>
							<small>{errors.complement?.message}</small>
						</div>

						<div className={styles.input}>
							<input
								type="url"
								placeholder="Link do Google Maps"
								defaultValue={data?.data.address.linkToMap}
								{...register("linkToMap")}
							/>
							<small>{errors.linkToMap?.message}</small>
						</div>

						<div className={styles.input}>
							<input
								type="text"
								placeholder="Cidade"
								defaultValue={data?.data.address.city}
								{...register("city")}
							/>
							<small>{errors.city?.message}</small>
						</div>

						<div className={styles.input}>
							<input
								type="text"
								placeholder="Estado"
								defaultValue={data?.data.address.state}
								{...register("state")}
							/>
							<small>{errors.state?.message}</small>
						</div>
					</div>

					<button type="submit">
						<FaSave />
						Salvar
					</button>
				</form>
			</>
		</LayoutAdm>
	);
}
