import { useEffect, useState } from "react";
import { CaseForm } from "../components/CaseForm";
import { getSession, type SessionUser } from "../lib/api";

export function Home() {
	const [user, setUser] = useState<SessionUser>(null);
	const [loading, setLoading] = useState(true);
	const [sessionError, setSessionError] = useState(false);

	useEffect(() => {
		let active = true;
		getSession().then((next) => {
			if (active) setUser(next);
		}).catch(() => {
			if (active) setSessionError(true);
		}).finally(() => {
			if (active) setLoading(false);
		});
		return () => { active = false; };
	}, []);

	return (
		<>
			{loading && <p className="session-status" role="status">Vérification de la connexion…</p>}
			{sessionError && <p className="form-error session-error" role="alert">Connexion indisponible. Actualisez la page avant de commencer.</p>}
			<CaseForm identified={Boolean(user)} disabled={loading || sessionError} />
		</>
	);
}
