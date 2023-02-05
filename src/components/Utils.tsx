import { MdRefresh } from "react-icons/md";

export function Spinner() {
	return (
		<div className="spinner">
			<span></span>
		</div>
	);
}

interface IErrorLoadData {
	fnRefresh: () => unknown;
}

export function ErrorLoadData({ fnRefresh }: IErrorLoadData) {
	return (
		<div className="error-load">
			<p>Ocorreu um erro ao carregar os dados.</p>

			<button type="button" onClick={fnRefresh}>
				<MdRefresh /> Tentar novamente
			</button>
		</div>
	);
}
