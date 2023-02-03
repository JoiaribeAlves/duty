import { useEffect, useRef, useState } from "react";

export function Spinner() {
	return (
		<div className="spinner">
			<span></span>
		</div>
	);
}

export function ErrorLoadData() {
	return (
		<div className="error-load">
			<p>Ocorreu um erro ao carregar os dados.</p>

			<button type="button" onClick={() => window.location.reload()}>
				Tentar novamente
			</button>
		</div>
	);
}

export function WhatsappGroupModal() {
	const [showModal, setShowModal] = useState(true);
	const modal = useRef<HTMLDivElement>(null);

	function removeModal() {
		modal.current?.remove();

		localStorage.setItem("showWhatsModal", "false");
	}

	useEffect(() => {
		const whatsModal = localStorage.getItem("showWhatsModal");

		if (whatsModal) {
			setShowModal(false);
		}
	}, []);

	return (
		<>
			{showModal && (
				<div ref={modal} className="modal">
					<h2>Grupo no Whatsapp</h2>

					<p>
						Faça parte do nosso grupo no Whatsapp, te informaremos todos os dias
						qual farmácia está de plantão em nosso município.
					</p>

					<div className="modalActions">
						<button type="button" onClick={removeModal}>
							Não, obrigado
						</button>

						<a
							href="https://chat.whatsapp.com/EhzdDGQ5TJNC83LVdUwMcl"
							target="_blank"
							onClick={removeModal}
						>
							Entrar no grupo
						</a>
					</div>
				</div>
			)}
		</>
	);
}
