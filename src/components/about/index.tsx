import { Helmet } from "react-helmet";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { FaCopy } from "react-icons/fa";

import { Layout } from "../Layout";
import qrCodePix from "/images/qrcode-pix.png";

import styles from "./Styles.module.scss";

export function About() {
	const QRCodeText =
		"00020126580014BR.GOV.BCB.PIX01367335baf2-9191-4db4-a456-a33fb8ae470d52040000530398654042.005802BR5914JoiaribeGAlves6004Jaru62170513ApoioPlantoes63047B14";

	function toastQRCode() {
		toast.success(
			'QRCode copiado com sucesso! No APP do seu banco, utilize a opção "PIX Copia e Cola".'
		);
	}

	return (
		<>
			<Helmet>
				<title>Sobre | Plantão de Farmácias</title>

				<meta
					name="description"
					content="Saiba mais sobre o projeto Plantão de Farmácias."
				/>
			</Helmet>

			<Layout>
				<ToastContainer theme="dark" />

				<div className={styles.about}>
					<h2>Sobre os plantões</h2>

					<p>
						No dia 26 de Abril de 2022 foi aprovada a Lei municipal 3.199 pela
						câmara de vereadores e sancionada pelo executivo municipal, a mesma
						institui o rodízio de plantões entre as farmácias e drogarias do
						município, inclusive nos feriados e finais de semana.
					</p>

					<p>
						De acordo com a referida Lei os estabelecimentos deverão cumprir a
						escala elaborada semestralmente pela{" "}
						<a href="https://acijaru.com.br/" target="_blank">
							<abbr title="Associação Comercial e Industrial de Jaru">
								ACIJ
							</abbr>
						</a>
						.
					</p>

					<p>
						O objetivo da Lei, é garantir que a população conte com serviço de
						assistência farmacêutica no período de 24 horas todos os dias.
					</p>
				</div>

				<div className={styles.qrCodePix}>
					<h2>Apoie o projeto</h2>

					<p>
						Não recebemos dinheiro público para manter o site no ar, fazendo uma
						pequena doação você estará ajudando a manter este projeto e levar a
						informação para as pessoas no momento em que elas mais precisam.
					</p>

					<div className={styles.qrCode}>
						<img src={qrCodePix} alt="QRCode Pix" width={150} height={150} />

						<CopyToClipboard text={QRCodeText} onCopy={toastQRCode}>
							<button type="button">
								<FaCopy /> Copiar QRCode
							</button>
						</CopyToClipboard>
					</div>
				</div>
			</Layout>
		</>
	);
}
