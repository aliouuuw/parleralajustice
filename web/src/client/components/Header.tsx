import { useEffect, useState } from "react";
import { getSession, signOut, type SessionUser } from "../lib/api";
import { useRoute } from "../lib/router";

export function Header() {
	const { path } = useRoute();
	const [user, setUser] = useState<SessionUser>(null);
	const [signingOut, setSigningOut] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		getSession().then((session) => {
			if (active) setUser(session);
		}).catch(() => {
			if (active) setError("Connexion indisponible. Actualisez la page.");
		});
		return () => { active = false; };
	}, [path]);

	async function onSignOut() {
		setSigningOut(true);
		setError("");
		try {
			if (await signOut()) {
				location.assign("/");
				return;
			}
			setError("Déconnexion impossible. Réessayez.");
		} catch {
			setError("Connexion interrompue. Réessayez la déconnexion.");
		}
		setSigningOut(false);
	}

	return (
		<header className="site-header">
			<div className="site-container header-inner">
				<a href="/" className="brand-mark" aria-label="Parler à la justice, accueil">
					<span className="brand-name">Parler à la justice<span>Démo citoyenne</span></span>
				</a>
				<nav className="site-nav" aria-label="Navigation principale">
					<a href="/" aria-current={path === "/" || path === "/parler" ? "page" : undefined}>Déposer</a>
					<a href="/suivre" aria-current={path === "/suivre" ? "page" : undefined}>Suivre un dossier</a>
					{user ? (
						<button type="button" className="nav-account" disabled={signingOut} onClick={onSignOut}>
							{signingOut ? "Déconnexion…" : "Se déconnecter"}
						</button>
					) : (
						<a className="nav-account" href="/connexion" aria-current={path === "/connexion" ? "page" : undefined}>Connexion démo</a>
					)}
				</nav>
			</div>
			{error && <p className="site-container form-error" role="alert">{error}</p>}
		</header>
	);
}
