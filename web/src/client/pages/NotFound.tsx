import { Button } from "../preview/Button";

export function NotFound() {
	return (
		<section className="pv-track" aria-labelledby="missing-title">
			<div className="pv-container pv-track__layout">
				<div className="pv-track__copy">
					<h1 id="missing-title">Page introuvable</h1>
					<p className="pv-lede">Cette adresse ne correspond à aucune page de la démo. Revenez à l'accueil ou suivez un dossier existant.</p>
					<div className="pv-hero__action">
						<Button variant="primary" href="/" arrow>Revenir à l'accueil</Button>
						<Button variant="secondary" href="/suivre">Suivre une demande</Button>
					</div>
				</div>
				<img
					className="pv-track__art"
					src="/images/others/404.png"
					width={2720}
					height={1536}
					alt="Illustration décorative : une personne face à un rideau de magasin fermé."
					decoding="async"
				/>
			</div>
		</section>
	);
}
