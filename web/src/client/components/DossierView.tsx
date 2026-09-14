import { Button } from "@heroui/react";
import { useState } from "react";
import type { CaseDossier } from "../lib/api";

const KIND_LABEL: Record<string, string> = {
	information: "Information",
	reclamation: "Réclamation",
	signalement: "Signalement",
	suggestion: "Suggestion",
};

const STATUS_LABEL: Record<string, string> = {
	recu: "Reçu",
	en_cours: "En cours",
	repondu: "Répondu",
};

export function DossierView({ data }: { data: CaseDossier }) {
	const [copyStatus, setCopyStatus] = useState("");
	const kind = KIND_LABEL[data.kind] ?? data.kind;
	const anonymous = data.channel === "anonymous";

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(data.trackingCode);
			setCopyStatus("Code copié.");
		} catch {
			setCopyStatus("Copie impossible. Sélectionnez le code pour le copier.");
		}
	}

	return (
		<section className="service-page dossier-page">
			<header className="page-intro">
				<h1 className="page-title">Votre dossier</h1>
				<p className="page-description">Votre message et son historique de démonstration.</p>
			</header>

			<article className="service-panel receipt" aria-labelledby="receipt-title">
				<div className="receipt-heading">
					<h2 id="receipt-title">Reçu de dépôt</h2>
					<span className="status-label" data-status={data.status}>{STATUS_LABEL[data.status] ?? data.status}</span>
				</div>
				<div className="receipt-reference">
					<p>Votre code de suivi</p>
					<p className="ticket-code">{data.trackingCode}</p>
					<span>Conservez ce code pour retrouver votre demande.</span>
				</div>
				<dl className="receipt-facts">
					<div><dt>Déposé le</dt><dd>{new Date(data.createdAt).toLocaleDateString("fr-SN", { day: "numeric", month: "long", year: "numeric" })}</dd></div>
					<div><dt>Type de demande</dt><dd>{kind}</dd></div>
					<div><dt>Mode de dépôt</dt><dd>{anonymous ? "Sans compte" : "Compte démo"}</dd></div>
				</dl>
				<div className="receipt-actions action-row">
					<Button type="button" className="button-primary" onPress={copyCode}>Copier le code</Button>
					<Button type="button" className="button-secondary" variant="secondary" onPress={() => window.print()}>Imprimer le reçu</Button>
				</div>
				<p className="copy-status field-help" role="status">{copyStatus}</p>
			</article>

			<section className="dossier-message" aria-labelledby="message-title">
				<h2 id="message-title">Votre message</h2>
				{data.displayName && <p className="field-help">Nom de démonstration : {data.displayName}</p>}
				<p className="message-body">{data.body}</p>
				{data.audioKey && <audio aria-label="Message vocal joint" controls src={`/api/audio?key=${encodeURIComponent(data.audioKey)}`} />}
			</section>

			<section className="dossier-history" aria-labelledby="history-title">
				<h2 id="history-title">Historique du dossier</h2>
				<ol className="timeline">
					{data.events.map((event) => (
						<li key={event.id}>
							<strong>{event.label}</strong>
							<time dateTime={new Date(event.at).toISOString()}>{new Date(event.at).toLocaleString("fr-SN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</time>
						</li>
					))}
				</ol>
			</section>
			<a className="text-link dossier-return" href="/suivre">Rechercher un autre dossier</a>
		</section>
	);
}
