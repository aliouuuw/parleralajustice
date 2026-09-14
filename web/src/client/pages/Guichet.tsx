import { useEffect, useState } from "react";
import { GuichetTable } from "../components/GuichetTable";
import { getGuichetCases, type GuichetRow } from "../lib/api";
import { InlineError } from "../preview/Alert";

export function Guichet() {
	const [rows, setRows] = useState<GuichetRow[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getGuichetCases().then(setRows).catch(() => {
			setError("Impossible de charger le registre. Actualisez la page pour réessayer.");
		});
	}, []);

	return (
		<>
			<section className="pv-track" aria-labelledby="guichet-title">
				<div className="pv-container pv-track__layout">
					<div className="pv-track__copy">
						<h1 id="guichet-title">Registre des demandes</h1>
						<p className="pv-lede">Ouvrez un code pour consulter un dossier et son historique.</p>
					</div>
					<img
						className="pv-track__art"
						src="/images/hero/noter-1280.webp"
						srcSet="/images/hero/noter-1280.webp 1280w, /images/hero/noter-2560.webp 2560w"
						sizes="(max-width: 1184px) 50vw, 560px"
						width={2720}
						height={1536}
						alt="Illustration décorative : une personne note une référence dans un carnet."
						decoding="async"
					/>
				</div>
			</section>
			<section className="pv-register-band">
				<div className="pv-container">
					{error ? (
						<InlineError id="guichet-error">{error}</InlineError>
					) : rows ? (
						<GuichetTable rows={rows} />
					) : (
						<p className="pv-field__hint" role="status">Chargement du registre…</p>
					)}
				</div>
			</section>
		</>
	);
}
