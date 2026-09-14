export function Acte() {
	return (
		<section className="service-page">
			<header className="page-intro">
				<h1 className="page-title">Obtenir un acte</h1>
				<p className="page-description">Pour une démarche réelle, utilisez les services officiels. Cette démo ne délivre aucun acte.</p>
			</header>
			<div className="service-panel">
				<a
					className="service-exit"
					href="https://e-senegal.sn/#/home/administrations/ministere-de-la-justice"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className="service-exit-title">e-Sénégal</span>
					<span className="service-exit-description">
						Consulter la page du ministère de la Justice sur e-Sénégal. S'ouvre dans un nouvel onglet.
					</span>
				</a>
				<a
					className="service-exit"
					href="https://public.e-service.sn/#/public"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className="service-exit-title">e-Services Justice</span>
					<span className="service-exit-description">
						Accéder à l'espace public du portail e-Services Justice. S'ouvre dans un nouvel onglet.
					</span>
				</a>
			</div>
		</section>
	);
}
