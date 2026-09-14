import { useEffect, useRef, useState } from "react";
import { Waveform, type WaveSource } from "./Waveform";
import "./preview.css";

const MAX = 4000;
const MIN = 12;
const SAMPLE_CODE = "PALJ-7K4M-2QX9";
const TYPES = [
	["Information", "Comprendre une procédure"],
	["Réclamation", "Signaler un dysfonctionnement"],
	["Signalement", "Porter un fait à connaissance"],
	["Suggestion", "Proposer une amélioration"],
	["Observation", "Faire une remarque"],
	["Contestation", "Contester une décision"],
] as const;

const SLIDES = [
	["ecrire", "Écrire", "Un homme écrit sa demande sur un ordinateur portable, dans sa cuisine."],
	["parler", "Parler", "Une femme enregistre un message vocal sur une terrasse."],
	["noter", "Noter la référence", "Vue de dessus, une personne note une référence dans un carnet."],
] as const;

function HeroSlides() {
	const [active, setActive] = useState(0);
	const [paused, setPaused] = useState(false);

	return (
		<div className="pv-slides" role="region" aria-roledescription="carrousel" aria-label="Illustrations du service" data-paused={paused || undefined}>
			<div className="pv-slides__stage" aria-live={paused ? "polite" : "off"}>
				{SLIDES.map(([id, , alt], i) => (
					<img
						key={id}
						src={`/images/hero/${id}-1280.webp`}
						srcSet={`/images/hero/${id}-1280.webp 1280w, /images/hero/${id}-2560.webp 2560w`}
						sizes="(max-width: 1240px) 100vw, 1240px"
						width={2720}
						height={1536}
						alt={alt}
						decoding="async"
						fetchPriority={i === 0 ? "high" : undefined}
						data-active={i === active || undefined}
						aria-hidden={i !== active || undefined}
					/>
				))}
			</div>
			<div className="pv-frise">
				<ol>
					{SLIDES.map(([id, label], i) => (
						<li key={id} data-state={i < active ? "done" : i === active ? "current" : undefined}>
							<button type="button" aria-label={`Illustration ${i + 1} sur ${SLIDES.length} : ${label}`} aria-pressed={i === active} onClick={() => setActive(i)}>
								<span className="pv-frise__dot" />
								<span className="pv-frise__label">{label}</span>
							</button>
							<span className="pv-frise__track">
								{i === active && <span key={active} className="pv-frise__fill" onAnimationEnd={() => setActive((i + 1) % SLIDES.length)} />}
							</span>
						</li>
					))}
				</ol>
				<button className="pv-frise__pause" type="button" aria-label={paused ? "Reprendre le diaporama" : "Mettre le diaporama en pause"} onClick={() => setPaused((p) => !p)}>
					<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
						{paused
							? <path d="M4 2.8v8.4a.6.6 0 0 0 .9.5l6.6-4.2a.6.6 0 0 0 0-1L4.9 2.3a.6.6 0 0 0-.9.5Z" fill="currentColor" />
							: <><rect x="3" y="2" width="2.6" height="10" rx="1.3" fill="currentColor" /><rect x="8.4" y="2" width="2.6" height="10" rx="1.3" fill="currentColor" /></>}
					</svg>
				</button>
			</div>
		</div>
	);
}

function clock(seconds: number): string {
	return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function Arrow() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function useRecorder() {
	const [source, setSource] = useState<WaveSource>("idle");
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [note, setNote] = useState("Aucun son conservé dans cet aperçu.");
	const [elapsed, setElapsed] = useState(0);
	const [pending, setPending] = useState(false);
	const mounted = useRef(true);

	useEffect(() => {
		mounted.current = true;
		return () => { mounted.current = false; };
	}, []);
	useEffect(() => {
		if (source === "idle") return;
		const id = window.setInterval(() => setElapsed((n) => n + 1), 1000);
		return () => window.clearInterval(id);
	}, [source]);
	useEffect(() => () => { stream?.getTracks().forEach((track) => track.stop()); }, [stream]);

	async function toggle() {
		if (pending) return;
		if (source !== "idle") {
			stream?.getTracks().forEach((track) => track.stop());
			setStream(null);
			setSource("idle");
			setNote("Test terminé. Aucun son conservé.");
			return;
		}
		setPending(true);
		setElapsed(0);
		try {
			const live = await navigator.mediaDevices.getUserMedia({ audio: true });
			if (!mounted.current) { live.getTracks().forEach((track) => track.stop()); return; }
			setStream(live);
			setSource("live");
			setNote("Micro actif. Le signal est réel, aucun son n'est conservé.");
		} catch {
			if (mounted.current) setNote("Micro indisponible. Autorisez le microphone ou continuez avec le texte.");
		} finally {
			if (mounted.current) setPending(false);
		}
	}
	return { source, stream, note, elapsed, pending, toggle };
}

export function Preview() {
	const recorder = useRecorder();
	const [text, setText] = useState("");
	const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
	const [attempted, setAttempted] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const summaryRef = useRef<HTMLDivElement>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const codeRef = useRef<HTMLElement>(null);
	const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const count = text.trim().length;
	const ready = count >= MIN && count <= MAX;
	const busy = recorder.pending || recorder.source !== "idle";
	const error = count < MIN ? "Écrivez au moins 12 caractères." : "Raccourcissez le message à 4 000 caractères maximum.";
	const showError = attempted && !ready;
	const tone = count > MAX ? "over" : count > MAX * 0.9 ? "near" : ready ? "ok" : undefined;

	useEffect(() => () => clearTimeout(copyTimer.current), []);

	function proceed() {
		if (busy) return;
		setAttempted(true);
		if (ready) {
			setSubmitted(true);
			requestAnimationFrame(() => document.getElementById("receipt")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }));
		} else {
			requestAnimationFrame(() => summaryRef.current?.focus());
		}
	}

	async function copyCode() {
		clearTimeout(copyTimer.current);
		try {
			await navigator.clipboard.writeText(SAMPLE_CODE);
			setCopyState("copied");
			copyTimer.current = setTimeout(() => setCopyState("idle"), 3000);
		} catch {
			setCopyState("error");
			const range = document.createRange();
			if (codeRef.current) range.selectNodeContents(codeRef.current);
			window.getSelection()?.removeAllRanges();
			window.getSelection()?.addRange(range);
		}
	}

	return (
		<div className="pv">
			<a className="pv-skip" href="#main-content">Aller au contenu principal</a>
			<div className="pv-notice">
				<div className="pv-container pv-notice__inner">
					<strong>Prototype indépendant</strong>
					<span>Ce site ne dépend pas du Ministère de la Justice. Aucune demande n'est transmise.</span>
				</div>
			</div>
			<header className="pv-header">
				<div className="pv-container pv-header__inner">
					<a className="pv-brand" href="/preview" aria-label="Parler à la justice, accueil">
						<svg className="pv-brand__mark" width="34" height="30" viewBox="0 0 34 30" aria-hidden="true">
							<defs><clipPath id="pv-mark-bubble"><path d="M0 30V13a7 7 0 0 1 7-7h15a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7Z" /></clipPath></defs>
							<path d="M0 30V13a7 7 0 0 1 7-7h15a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7Z" fill="var(--color-brand)" />
							<circle cx="27" cy="7" r="7" fill="var(--color-gold)" />
							<circle cx="27" cy="7" r="7" fill="var(--color-brand-lit)" clipPath="url(#pv-mark-bubble)" />
						</svg>
						<span><strong>Parler à la justice</strong><small>Service de démonstration</small></span>
					</a>
					<nav className="pv-nav" aria-label="Navigation principale">
						<a href="/preview" aria-current="page">Déposer une demande</a>
						<a href="/suivre">Suivre un dossier</a>
					</nav>
				</div>
			</header>

			<main id="main-content">
				<section className="pv-hero" aria-labelledby="hero-title">
					<div className="pv-container pv-hero__copy">
						<h1 id="hero-title">Adressez une demande à la justice</h1>
						<p className="pv-lede">Essayez le parcours avec une situation fictive&nbsp;: écrivez, relisez, suivez votre demande.</p>
						<div className="pv-hero__action">
							<button className="pv-button pv-button--primary" type="button" onClick={() => messageRef.current?.focus()}>Commencer <Arrow /></button>
							<span>Deux étapes. Aucun compte requis.</span>
						</div>
					</div>
					<HeroSlides />
				</section>

				<section className="pv-type-band" aria-labelledby="types-title">
					<div className="pv-container pv-types">
						<div className="pv-types__heading">
							<h2 id="types-title">Six types de demandes</h2>
						</div>
						<ul>
							{TYPES.map(([name, description]) => <li key={name}><strong>{name}</strong><span>{description}</span></li>)}
						</ul>
					</div>
				</section>

				<section className="pv-workspace" aria-labelledby="form-title">
					<div className="pv-container pv-workspace__layout">
						<div className="pv-rail">
							<aside className="pv-progress" aria-label="Progression du dépôt">
								<p>Votre demande, en deux étapes</p>
								<ol>
									<li aria-current="step"><span>1</span><div><strong>Votre message</strong><small>En cours</small></div></li>
									<li data-complete={submitted ? "true" : undefined}><span>2</span><div><strong>Confirmation</strong><small>{submitted ? "Terminé" : "À venir"}</small></div></li>
								</ol>
							</aside>
							<aside className="pv-guidance" aria-labelledby="guidance-title">
								<h2 id="guidance-title">Avant de commencer</h2>
								<ul>
									<li>Utilisez uniquement des informations fictives.</li>
									<li>Ce prototype ne donne pas de conseil juridique.</li>
									<li>La référence illustre le suivi. Aucun dossier réel n'est créé.</li>
								</ul>
							</aside>
						</div>

						<div className="pv-form">
							<div className="pv-form__heading">
								<p>Étape 1 sur 2</p>
								<h2 id="form-title">Que souhaitez-vous nous dire ?</h2>
								<span>Décrivez une situation fictive, avec vos mots.</span>
							</div>
							{showError && (
								<div className="pv-error-summary" ref={summaryRef} id="message-errors" role="alert" tabIndex={-1}>
									<strong>Corrigez le message avant de continuer</strong>
									<ul><li><a href="#message" onClick={(event) => { event.preventDefault(); messageRef.current?.focus(); }}>{error}</a></li></ul>
								</div>
							)}
							<div className="pv-field">
								<label htmlFor="message">Votre message <span style={{ color: "var(--color-text-secondary)", fontWeight: 400 }}>(obligatoire)</span></label>
								<textarea id="message" ref={messageRef} value={text} maxLength={MAX + 200} required aria-invalid={showError || undefined} aria-describedby={showError ? "message-help message-errors" : "message-help"} placeholder="Exemple : je souhaite comprendre le déroulement d'une audience." onChange={(event) => setText(event.target.value)} />
								<div className="pv-field__meta" id="message-help">
									<span>{MIN} caractères minimum</span>
									<span data-tone={tone}>{count.toLocaleString("fr-FR")} / 4 000</span>
								</div>
							</div>
							<div className="pv-audio">
								<div>
									<strong>Message vocal</strong>
									<span>Aperçu du microphone. Le texte reste obligatoire.</span>
								</div>
								<button className="pv-button pv-button--secondary" type="button" onClick={recorder.toggle} disabled={recorder.pending} aria-pressed={recorder.source !== "idle"} data-recording={recorder.source !== "idle" ? "true" : undefined}>
									<span className="pv-record-dot" />
									{recorder.pending ? "Autorisation…" : recorder.source === "idle" ? "Tester le micro" : "Arrêter"}
								</button>
								{recorder.source !== "idle" && <Waveform source={recorder.source} stream={recorder.stream} height={40} />}
								<div className="pv-audio__status">
									<span role="status">{recorder.note}</span>
									<time>{clock(recorder.elapsed)}</time>
								</div>
							</div>
							<div className="pv-form__footer">
								<button className="pv-button pv-button--primary" type="button" disabled={busy} onClick={proceed}>Continuer <Arrow /></button>
								<p>{busy ? "Arrêtez le test du micro pour continuer." : "Rien n'est déposé à cette étape."}</p>
							</div>
						</div>
					</div>
				</section>

				{submitted && (
					<section className="pv-outcome-band" id="receipt">
						<div className="pv-container pv-outcome">
							<div className="pv-outcome__intro">
								<h2>Une référence à conserver.<br />Un suivi à retrouver.</h2>
								<span>Le récépissé rassemble la référence et les étapes du suivi. Cet exemple montre un parcours fictif.</span>
							</div>
							<article className="pv-receipt" aria-label="Exemple de récépissé de dépôt">
								<header>
									<div>
										<p>Exemple de confirmation</p>
										<time>Aucune demande transmise</time>
									</div>
									<span>Données fictives</span>
								</header>
								<div className="pv-receipt__reference">
									<span>Référence de suivi · Exemple</span>
									<strong ref={codeRef}>{SAMPLE_CODE}</strong>
									<p>La référence permet de retrouver le dossier dans un service réel.</p>
								</div>
								<div className="pv-receipt__actions">
									<button className="pv-button pv-button--secondary" type="button" onClick={copyCode}>{copyState === "copied" ? "Référence copiée" : "Copier la référence"}</button>
									<button className="pv-button pv-button--quiet" type="button" onClick={() => window.print()}>Imprimer</button>
								</div>
								<ol className="pv-history" aria-label="Exemple de suivi">
									<li data-status="complete"><span /><div><strong>Demande enregistrée</strong><time>Reçue · 13 sept. 05:42</time></div></li>
									<li data-status="active"><span /><div><strong>Orientation vers le service compétent</strong><time>En cours · 13 sept. 09:10</time></div></li>
									<li><span /><div><strong>Réponse</strong><time>En attente</time></div></li>
								</ol>
							</article>
						</div>
					</section>
				)}
			</main>
			<footer className="pv-footer">
				<div className="pv-container pv-footer__inner">
					<div>
						<strong>Parler à la justice</strong>
						<p>Prototype indépendant utilisant uniquement des données fictives.</p>
					</div>
					<nav aria-label="Liens de pied de page">
						<a href="https://justice.sec.gouv.sn/">Ministère de la Justice</a>
						<a href="https://public.e-service.sn/">e-Services Justice</a>
						<a href="https://e-senegal.sn/">e-Sénégal</a>
					</nav>
				</div>
			</footer>
		</div>
	);
}
