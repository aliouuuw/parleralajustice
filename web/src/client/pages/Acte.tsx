import { Button } from "../preview/Button";

const OFFICIAL_EXITS = [
	{
		title: "e-Sénégal",
		description: "Consulter la page du ministère de la Justice sur e-Sénégal.",
		href: "https://e-senegal.sn/#/home/administrations/ministere-de-la-justice",
		label: "Ouvrir e-Sénégal",
	},
	{
		title: "e-Services Justice",
		description: "Accéder à l'espace public du portail e-Services Justice.",
		href: "https://public.e-service.sn/#/public",
		label: "Ouvrir e-Services",
	},
] as const;

export function Acte() {
	return (
		<section className="pv-track" aria-labelledby="acte-title">
			<div className="pv-container pv-track__layout">
				<div className="pv-track__copy">
					<h1 id="acte-title">Obtenir un acte</h1>
					<p className="pv-lede">Pour une démarche réelle, utilisez les services officiels. Cette démo ne délivre aucun acte.</p>
					<div className="pv-acte-exits">
						{OFFICIAL_EXITS.map((exit) => (
							<article key={exit.href} className="pv-acte-exit">
								<h2>{exit.title}</h2>
								<p>{exit.description}</p>
								<Button variant="primary" href={exit.href} target="_blank" rel="noopener noreferrer" arrow>
									{exit.label}
								</Button>
							</article>
						))}
					</div>
				</div>
				<img
					className="pv-track__art"
					src="/images/others/act.png"
					width={2720}
					height={1536}
					alt="Illustration décorative : une personne retire un document d'une photocopieuse."
					decoding="async"
				/>
			</div>
		</section>
	);
}
