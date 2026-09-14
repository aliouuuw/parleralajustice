export function NotFound() {
	return (
		<section className="service-page">
			<header className="page-intro">
				<p className="page-kicker">Page indisponible</p>
				<h1 className="page-title">Page introuvable</h1>
				<p className="page-description">Cette adresse ne correspond à aucune page de la démo.</p>
			</header>
			<div className="service-panel">
				<p>Revenez à l'accueil pour déposer une demande fictive ou consulter un dossier existant.</p>
				<div className="action-row">
					<a className="text-link" href="/">Revenir à l'accueil</a>
					<a className="text-link" href="/suivre">Suivre une demande</a>
				</div>
			</div>
		</section>
	);
}
