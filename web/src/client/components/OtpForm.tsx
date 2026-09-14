import { useState } from "react";
import { sendOtp, verifyOtp } from "../lib/api";
import { navigate } from "../lib/router";
import { Button } from "../preview/Button";
import { InlineError } from "../preview/Alert";

export function OtpForm() {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [hint, setHint] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [sending, setSending] = useState(false);
	const [verifying, setVerifying] = useState(false);
	const busy = sending || verifying;

	async function onSend() {
		if (busy) return;
		setError(null);
		if (!email.includes("@") || !email.includes(".")) {
			setError("Saisissez une adresse complète, par exemple demo@exemple.sn.");
			return;
		}
		setSending(true);
		setHint("");
		try {
			const result = await sendOtp(email.trim().toLowerCase());
			if (!result.ok) {
				setError(result.error);
				return;
			}
			if (result.otp) {
				setOtp(result.otp);
				setHint(`Code : ${result.otp}. Il s'affiche ici, sans envoi d'e-mail.`);
			} else {
				setHint("Code demandé. Aucun code n'est disponible à afficher ici.");
			}
		} catch {
			setError("Impossible d'obtenir le code. Vérifiez votre connexion et réessayez.");
		} finally {
			setSending(false);
		}
	}

	async function onSubmit(event: React.FormEvent) {
		event.preventDefault();
		if (busy) return;
		setError(null);
		setVerifying(true);
		try {
			const ok = await verifyOtp(email.trim(), otp.trim());
			if (!ok) {
				setError("Code invalide. Vérifiez le code ou demandez-en un nouveau.");
				return;
			}
			navigate("/");
		} catch {
			setError("Connexion impossible. Vérifiez votre connexion et réessayez.");
		} finally {
			setVerifying(false);
		}
	}

	return (
		<form className="pv-lookup pv-lookup--stack" onSubmit={onSubmit} aria-busy={busy} noValidate>
			<div className="pv-lookup__group">
				<label htmlFor="demo-email">
					Adresse e-mail <span className="pv-optional">(obligatoire)</span>
				</label>
				<input
					id="demo-email"
					type="email"
					required
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder="demo@exemple.sn"
					autoComplete="off"
					autoCapitalize="none"
					spellCheck={false}
					disabled={busy}
				/>
				<p className="pv-lookup__help">Demandez un code pour cette adresse.</p>
			</div>
			<div className="pv-lookup__group">
				<label htmlFor="demo-otp">
					Code de connexion <span className="pv-optional">(obligatoire)</span>
				</label>
				<input
					id="demo-otp"
					className="pv-input--data"
					type="text"
					required
					value={otp}
					onChange={(event) => setOtp(event.target.value)}
					inputMode="numeric"
					autoComplete="one-time-code"
					placeholder="6 chiffres"
					disabled={busy}
				/>
				<p className="pv-lookup__help">Le code s'affiche ici et se préremplit lorsqu'il est disponible.</p>
			</div>
			{hint && <p className="pv-lookup__hint" role="status">{hint}</p>}
			{busy && <p className="pv-lookup__help" role="status">{sending ? "Préparation du code…" : "Vérification du code…"}</p>}
			{error && <InlineError id="otp-error">{error}</InlineError>}
			<div className="pv-form__footer">
				<Button variant="secondary" type="button" disabled={busy} onClick={onSend}>
					{sending ? "Code en préparation…" : "Obtenir le code"}
				</Button>
				<Button variant="primary" type="submit" disabled={busy}>
					{verifying ? "Connexion en cours…" : "Se connecter"}
				</Button>
			</div>
		</form>
	);
}
