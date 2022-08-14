export function Spiner() {
	return (
		<div className="spiner">
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
