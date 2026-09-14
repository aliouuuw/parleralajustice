import { OtpForm } from "../components/OtpForm";

export function Connexion() {
	return (
		<>
			<section className="pv-track" aria-labelledby="connexion-title">
				<div className="pv-container pv-track__layout">
					<div className="pv-track__copy">
						<h1 id="connexion-title">Connexion</h1>
						<p className="pv-lede">Saisissez votre e-mail. Un code s'affiche sur cette page pour confirmer l'accès.</p>
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
			<section className="pv-type-band" aria-label="Comment fonctionne la connexion">
				<div className="pv-container pv-track-help">
					<div className="pv-track-help__step"><span>1</span><div><strong>Votre e-mail</strong><p>Saisissez l'adresse que vous souhaitez utiliser.</p></div></div>
					<div className="pv-track-help__step"><span>2</span><div><strong>Un code sur cette page</strong><p>Le code s'affiche ici pour confirmer l'accès.</p></div></div>
					<div className="pv-track-help__step"><span>3</span><div><strong>Un dépôt identifié</strong><p>Après connexion, le dépôt peut porter votre compte.</p></div></div>
				</div>
			</section>
		</>
	);
}
