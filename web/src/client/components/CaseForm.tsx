import { Button } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { createCase } from "../lib/api";
import { navigate } from "../lib/router";
import { TurnstileField, type TurnstileHandle } from "./TurnstileField";
import { VoiceRecorder } from "./VoiceRecorder";

const KINDS: Array<[string, string]> = [
	["information", "Information"],
	["reclamation", "Réclamation"],
	["signalement", "Signalement"],
	["suggestion", "Suggestion"],
];

export function CaseForm({ identified, disabled = false }: { identified: boolean; disabled?: boolean }) {
	const [step, setStep] = useState<"write" | "review">("write");
	const [kind, setKind] = useState("information");
	const [body, setBody] = useState("");
	const [demoConfirmed, setDemoConfirmed] = useState(false);
	const [audioKey, setAudioKey] = useState<string | null>(null);
	const [voiceBusy, setVoiceBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const submittingRef = useRef(false);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const previousStep = useRef(step);
	const turnstileRef = useRef<TurnstileHandle>(null);
	const reviewing = step === "review";

	useEffect(() => {
		if (previousStep.current === step) return;
		previousStep.current = step;
		headingRef.current?.focus({ preventScroll: true });
		headingRef.current?.scrollIntoView({ block: "nearest" });
	}, [step]);

	function editMessage() {
		if (submittingRef.current) return;
		setError(null);
		setDemoConfirmed(false);
		setStep("write");
	}

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (disabled || voiceBusy || submittingRef.current) return;
		setError(null);
		if (body.trim().length < 12 || body.trim().length > 4000) {
			setError("Écrivez entre 12 et 4 000 caractères, hors espaces en début et fin.");
			messageRef.current?.focus();
			return;
		}
		if (reviewing && !demoConfirmed) {
			setError("Confirmez que votre demande contient uniquement des données fictives.");
			return;
		}
		if (!event.currentTarget.reportValidity()) return;
		if (!reviewing) {
			event.currentTarget.querySelector<HTMLAudioElement>("audio")?.pause();
			setStep("review");
			return;
		}
		const turnstileToken = turnstileRef.current?.getToken() ?? "";
		if (!turnstileToken) {
			setError("Terminez la vérification anti-robot avant le dépôt.");
			return;
		}
		submittingRef.current = true;
		setSubmitting(true);
		try {
			const result = await createCase({
				kind,
				channel: identified ? "identified" : "anonymous",
				body: body.trim(),
				demoConfirmed,
				audioKey,
				turnstileToken,
			});
			if (!result.ok) {
				setError(result.error);
				turnstileRef.current?.reset();
				return;
			}
			navigate(`/d/${result.trackingCode}`);
		} catch {
			setError("Connexion interrompue. Votre message est conservé sur cette page. Réessayez.");
			turnstileRef.current?.reset();
		} finally {
			submittingRef.current = false;
			setSubmitting(false);
		}
	}

	return (
		<div className="intake-layout">
			<aside className="intake-rail" aria-label="Étapes de la demande">
				<p className="rail-title">Nouvelle demande</p>
				<ol className="intake-steps">
					<li aria-current={!reviewing ? "step" : undefined} data-complete={reviewing}>
						<span className="step-number" aria-hidden="true">{reviewing ? "✓" : "1"}</span>
						<span>Votre message</span>
					</li>
					<li aria-current={reviewing ? "step" : undefined}>
						<span className="step-number" aria-hidden="true">2</span>
						<span>Vérification et dépôt</span>
					</li>
				</ol>
				<div className="rail-links">
					<a href="/suivre">Vous avez déjà un code ?</a>
					<a href="/acte">Obtenir un acte officiel <span aria-hidden="true">↗</span></a>
				</div>
			</aside>

			<section className="intake-workspace" aria-labelledby="intake-title">
				<header className="step-heading" key={step}>
					<p className="step-caption">Étape {reviewing ? "2" : "1"} sur 2</p>
					<h1 id="intake-title" ref={headingRef} tabIndex={-1}>{reviewing ? "Tout est prêt ?" : "Que souhaitez-vous nous dire ?"}</h1>
					<p>{reviewing ? "Relisez votre message avant de recevoir votre code de suivi." : "Décrivez une situation fictive, avec vos mots."}</p>
				</header>

				<form className="case-form form-stack" onSubmit={onSubmit} noValidate aria-busy={submitting}>
					<fieldset className="write-stage form-stack" hidden={reviewing} disabled={reviewing || submitting}>
						<legend className="sr-only">Votre message</legend>
						<div className="message-field">
							<label className="field-label" htmlFor="case-message">Votre message</label>
							<textarea
								ref={messageRef}
								id="case-message"
								name="body"
								required
								minLength={12}
								maxLength={4000}
								value={body}
								onChange={(event) => { setBody(event.target.value); setError(null); }}
								placeholder="Par exemple : je souhaite comprendre le déroulement d'une audience."
								aria-describedby={!reviewing && error ? "message-help intake-error" : "message-help"}
								aria-invalid={!reviewing && Boolean(error)}
							/>
							<div className="field-meta">
								<p id="message-help">12 caractères minimum</p>
								<span>{body.length.toLocaleString("fr-SN")} / 4 000</span>
							</div>
						</div>
						<VoiceRecorder onAudioKey={setAudioKey} onBusyChange={setVoiceBusy} disabled={disabled || submitting} />
					</fieldset>

					{reviewing && (
						<div className="review-stage form-stack">
							<section className="message-review" aria-labelledby="review-title">
								<div className="review-heading">
									<h2 id="review-title">Votre message</h2>
									<button type="button" className="text-button" onClick={editMessage} disabled={submitting}>Modifier</button>
								</div>
								<p className="review-body">{body.trim()}</p>
								{audioKey && <audio aria-label="Écouter le message vocal joint" controls src={`/api/audio?key=${encodeURIComponent(audioKey)}`} />}
							</section>
							<label className="request-kind">
								<span className="field-label">Type de demande</span>
								<select name="kind" value={kind} disabled={submitting} onChange={(event) => { setKind(event.target.value); setDemoConfirmed(false); }}>
									{KINDS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
								</select>
							</label>
							<p className="review-identity">{identified ? "Dépôt avec votre compte de démonstration." : "Dépôt sans compte. Votre code permettra de retrouver la demande."}</p>
							<label className="demo-confirmation">
								<input type="checkbox" name="demo" required disabled={submitting} checked={demoConfirmed} onChange={(event) => setDemoConfirmed(event.target.checked)} />
								<span>J'utilise uniquement des données fictives. Ce dépôt n'est pas une démarche judiciaire.</span>
							</label>
							<TurnstileField ref={turnstileRef} />
						</div>
					)}

					{error && <p id="intake-error" className="form-error" role="alert">{error}</p>}
					<div className="intake-actions">
						{reviewing ? (
							<button type="button" className="text-button back-action" onClick={editMessage} disabled={submitting}><span aria-hidden="true">←</span> Retour</button>
						) : <span className="draft-status">Rien n'est déposé à cette étape.</span>}
						{reviewing ? (
							<Button type="submit" isDisabled={submitting || disabled} className="button-primary submit-request">
								{submitting ? "Dépôt en cours…" : "Déposer et recevoir mon code"}
							</Button>
						) : (
							<button type="submit" disabled={disabled || voiceBusy} className="button-primary">Continuer <span aria-hidden="true">→</span></button>
						)}
					</div>
				</form>
			</section>
		</div>
	);
}
