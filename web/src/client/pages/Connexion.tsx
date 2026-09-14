import { OtpForm } from "../components/OtpForm";

export function Connexion() {
	return (
		<>
			<section className="pv-track" aria-labelledby="connexion-title">
				<div className="pv-container pv-track__layout">
					<div className="pv-track__copy">
						<h1 id="connexion-title">Connexion à la démo</h1>
						<p className="pv-lede">Utilisez une adresse fictive. Le code s'affiche ici, sans envoi d'e-mail. Ce compte ne vérifie pas votre identité légale.</p>
						<OtpForm />
					</div>
					<img
						className="pv-track__art"
						src="/images/others/compte.png"
						width={2720}
						height={1536}
						alt="Illustration décorative : une personne tourne une clé dans une porte."
						decoding="async"
					/>
				</div>
			</section>
			<section className="pv-type-band" aria-label="Comment fonctionne la connexion démo">
				<div className="pv-container pv-track-help">
					<div className="pv-track-help__step"><span>1</span><div><strong>Une adresse fictive</strong><p>Saisissez un e-mail d'exemple, par exemple demo@exemple.sn.</p></div></div>
					<div className="pv-track-help__step"><span>2</span><div><strong>Un code affiché ici</strong><p>Aucun message n'est envoyé. Le code de démo apparaît sur cette page.</p></div></div>
					<div className="pv-track-help__step"><span>3</span><div><strong>Un dépôt identifié</strong><p>Après connexion, le dépôt peut porter le compte de démonstration.</p></div></div>
				</div>
			</section>
		</>
	);
}
