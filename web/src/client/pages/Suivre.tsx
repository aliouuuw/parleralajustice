import { TrackForm } from "../components/TrackForm";

export function Suivre({ prefill = "" }: { prefill?: string }) {
	return (
		<section className="service-page">
			<header className="page-intro">
				<h1 className="page-title">Retrouver votre demande</h1>
				<p className="page-description">Votre code de suivi donne accès au message et à son historique.</p>
			</header>
			<div className="service-panel">
				<TrackForm prefill={prefill} />
			</div>
		</section>
	);
}
