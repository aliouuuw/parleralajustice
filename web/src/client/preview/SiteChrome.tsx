import { useEffect, useState, type ReactNode } from "react";
import { getSession, signOut, type SessionUser } from "../lib/api";
import { ServiceHeader } from "./ServiceHeader";
import "./preview.css";

export type SiteSection = "deposer" | "suivre" | "acte" | "connexion" | "guichet" | "other";

const BRAND_MARK = (
	<svg width="34" height="30" viewBox="0 0 34 30">
		<defs><clipPath id="pv-mark-bubble"><path d="M0 30V13a7 7 0 0 1 7-7h15a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7Z" /></clipPath></defs>
		<path d="M0 30V13a7 7 0 0 1 7-7h15a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7Z" fill="var(--color-brand)" />
		<circle cx="27" cy="7" r="7" fill="var(--color-gold)" />
		<circle cx="27" cy="7" r="7" fill="var(--color-brand-lit)" clipPath="url(#pv-mark-bubble)" />
	</svg>
);

export function SiteChrome({
	current,
	taskMode,
	children,
}: {
	current: SiteSection;
	taskMode?: boolean;
	children: ReactNode;
}) {
	const [user, setUser] = useState<SessionUser>(null);
	const [signingOut, setSigningOut] = useState(false);
	const [accountError, setAccountError] = useState("");

	useEffect(() => {
		let active = true;
		getSession().then((session) => {
			if (active) setUser(session);
		}).catch(() => {
			if (active) setAccountError("Connexion indisponible. Actualisez la page.");
		});
		return () => { active = false; };
	}, [current]);

	async function onSignOut() {
		setSigningOut(true);
		setAccountError("");
		try {
			if (await signOut()) {
				location.assign("/");
				return;
			}
			setAccountError("Déconnexion impossible. Réessayez.");
		} catch {
			setAccountError("Connexion interrompue. Réessayez la déconnexion.");
		}
		setSigningOut(false);
	}

	return (
		<div className={taskMode ? "pv pv--task" : "pv"}>
			<a className="pv-skip" href="#main-content">Aller au contenu principal</a>
			<div className="pv-notice">
				<div className="pv-container pv-notice__inner">
					<strong>Prototype indépendant</strong>
					<span>Ce site ne dépend pas du Ministère de la Justice. Aucune demande n'est transmise.</span>
				</div>
			</div>
			<ServiceHeader
				brandHref="/"
				brandLabel="Parler à la Justice"
				brandSublabel="démo"
				brandMark={BRAND_MARK}
				nav={[
					{ href: "/", label: "Déposer une demande", shortLabel: "Déposer", current: current === "deposer" },
					{ href: "/suivre", label: "Suivre un dossier", shortLabel: "Suivre", current: current === "suivre" },
					{ href: "/acte", label: "Obtenir un acte", shortLabel: "Acte", current: current === "acte" },
				]}
				account={user ? {
					label: signingOut ? "Déconnexion…" : "Se déconnecter",
					shortLabel: signingOut ? "…" : "Sortir",
					busy: signingOut,
					onClick: onSignOut,
				} : {
					href: "/connexion",
					label: "Connexion",
					shortLabel: "Compte",
					current: current === "connexion",
				}}
			/>
			{accountError && <p className="pv-header__alert" role="alert">{accountError}</p>}
			{children}
			<footer className="pv-footer">
				<div className="pv-container pv-footer__inner">
					<div>
						<strong>Parler à la justice</strong>
						<p>Service citoyen au Sénégal.</p>
					</div>
					<nav aria-label="Liens de pied de page">
						<a href="https://justice.sec.gouv.sn/">Ministère de la Justice</a>
						<a href="/acte">Obtenir un acte</a>
						<a href="/guichet">Registre</a>
						<a href="https://public.e-service.sn/">e-Services Justice</a>
					</nav>
				</div>
			</footer>
		</div>
	);
}
