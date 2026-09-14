import { Button, Input, Label, TextField } from "@heroui/react";
import { useState } from "react";
import { sendOtp, verifyOtp } from "../lib/api";
import { navigate } from "../lib/router";

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
			setError("Utilisez une adresse fictive complète, par exemple demo@exemple.sn.");
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
				setHint(`Code de démonstration : ${result.otp}. Aucun e-mail réel n'est envoyé.`);
			} else {
				setHint("Code demandé dans le circuit de démo. Aucun code n'est disponible à afficher ici.");
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
		<form className="form-stack" onSubmit={onSubmit} aria-busy={busy}>
			<TextField name="email" type="email" isRequired isDisabled={busy}>
				<Label className="field-label">Adresse e-mail fictive</Label>
				<Input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="demo@exemple.sn"
					autoComplete="off"
					autoCapitalize="none"
					spellCheck={false}
					aria-describedby="email-help"
				/>
				<p className="field-help" id="email-help">Demandez un code pour cette adresse de démonstration.</p>
			</TextField>
			<TextField name="otp" isRequired isDisabled={busy}>
				<Label className="field-label">Code de connexion</Label>
				<Input
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
					inputMode="numeric"
					autoComplete="one-time-code"
					placeholder="6 chiffres"
					aria-describedby="otp-help"
				/>
				<p className="field-help" id="otp-help">Dans cette démo, le code est affiché ici et prérempli lorsqu'il est disponible.</p>
			</TextField>
			{hint && <p className="notice" role="status">{hint}</p>}
			{busy && <p className="field-help" role="status">{sending ? "Préparation du code…" : "Vérification du code…"}</p>}
			{error && <p className="form-error" role="alert">{error}</p>}
			<div className="action-row">
				<Button className="button-secondary" type="button" variant="secondary" onPress={onSend} isDisabled={busy}>
					{sending ? "Code en préparation…" : "Obtenir le code de démo"}
				</Button>
				<Button className="button-primary" type="submit" isDisabled={busy}>
					{verifying ? "Connexion en cours…" : "Se connecter"}
				</Button>
			</div>
		</form>
	);
}
