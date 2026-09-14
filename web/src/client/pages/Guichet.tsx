import { useEffect, useState } from "react";
import { GuichetTable } from "../components/GuichetTable";
import { getGuichetCases, type GuichetRow } from "../lib/api";

export function Guichet() {
	const [rows, setRows] = useState<GuichetRow[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getGuichetCases().then(setRows).catch(() => {
			setError("Impossible de charger le registre. Actualisez la page pour réessayer.");
		});
	}, []);

	return (
		<section className="service-page">
			<header className="page-intro">
				<h1 className="page-title">Registre des demandes</h1>
				<p className="page-description">Demandes fictives, accessibles sans contrôle d'accès.</p>
			</header>
			<div className="register-section">
				<h2 className="register-heading">Demandes récentes</h2>
				{error ? (
					<p className="form-error" role="alert">{error}</p>
				) : rows ? (
					<GuichetTable rows={rows} />
				) : (
					<p role="status">Chargement du registre…</p>
				)}
			</div>
		</section>
	);
}
