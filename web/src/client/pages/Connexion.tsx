import { OtpForm } from "../components/OtpForm";

export function Connexion() {
	return (
		<section className="service-page">
			<header className="page-intro">
				<h1 className="page-title">Connexion à la démo</h1>
				<p className="page-description">Utilisez une adresse fictive. Le code s'affiche ici, sans envoi d'e-mail.</p>
				<p className="notice">Ce compte ne vérifie pas votre identité légale.</p>
			</header>
			<div className="service-panel">
				<OtpForm />
			</div>
		</section>
	);
}
