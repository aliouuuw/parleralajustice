import { useEffect, useState } from "react";
import { DossierView } from "../components/DossierView";
import { TrackForm } from "../components/TrackForm";
import { getCase, type CaseDossier } from "../lib/api";

export function Dossier({ code }: { code: string }) {
	const [data, setData] = useState<CaseDossier | null>(null);
	const [notFound, setNotFound] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let active = true;
		setData(null);
		setNotFound(false);
		setError(null);
		getCase(code).then((result) => {
			if (!active) return;
			if (result) setData(result);
			else setNotFound(true);
		}).catch(() => {
			if (active) setError("Impossible de charger le dossier. Actualisez la page pour réessayer.");
		});
		return () => { active = false; };
	}, [code]);

	if (notFound || error) {
		return (
			<section className="service-page">
				<header className="page-intro">
					<p className="page-kicker">Suivi d'une demande</p>
					<h1 className="page-title">{notFound ? "Code de suivi inconnu" : "Dossier indisponible"}</h1>
					<p className="page-description">Vérifiez le code de suivi indiqué sur votre reçu de dépôt.</p>
				</header>
				<div className="service-panel">
					<p className="form-error" role="alert">
						{error || "Aucun dossier ne correspond à ce code. Corrigez-le pour relancer la recherche."}
					</p>
					<TrackForm key={code} prefill={code} />
				</div>
			</section>
		);
	}

	if (!data) {
		return (
			<section className="service-page">
				<header className="page-intro">
					<p className="page-kicker">Suivi d'une demande</p>
					<h1 className="page-title">Votre dossier</h1>
				</header>
				<div className="service-panel"><p role="status">Chargement du dossier…</p></div>
			</section>
		);
	}

	return <DossierView data={data} />;
}
