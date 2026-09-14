import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Waveform, type WaveSource } from "./Waveform";
import { Button } from "./Button";
import { Field } from "./Field";
import { ErrorSummary, InlineError } from "./Alert";
import { ServiceHeader } from "./ServiceHeader";
import { RequestTypeSelect } from "./RequestTypeSelect";
import { TurnstileField, type TurnstileHandle } from "../components/TurnstileField";
import { createCase, getCase, getSession, uploadAudio, type CaseDossier } from "../lib/api";
import "./preview.css";

const MAX = 4000;
const MIN = 12;
const VOICE_LIMIT = 180;
export const SAMPLE_CODE = "PALJ-7K4M-2QX9";

// Categories as the live « Justice Accessible Sénégal » form lists them (research §J.3).
const TYPES = [
	["Demande d'information", "Comprendre une procédure ou un service"],
	["Réclamation", "Signaler un dysfonctionnement"],
	["Difficulté rencontrée", "Un obstacle pour accéder à la justice"],
	["Signalement", "Porter un fait à connaissance"],
	["Suggestion ou observation", "Proposer une amélioration"],
	["Autre", "Une situation qui n'entre dans aucun type"],
] as const;

const KIND_FROM_TYPE: Record<(typeof TYPES)[number][0], "information" | "reclamation" | "signalement" | "suggestion"> = {
	"Demande d'information": "information",
	"Réclamation": "reclamation",
	"Difficulté rencontrée": "reclamation",
	"Signalement": "signalement",
	"Suggestion ou observation": "suggestion",
	"Autre": "information",
};

const STATUS_FROM_CASE: Record<string, string> = {
	recu: "Reçue",
	en_cours: "En cours de traitement",
	repondu: "Résolue",
};

// Status model of the live platform (research §J.4), worded for citizens.
export const STATUSES = [
	["Reçue", "La demande est enregistrée. Elle attend d'être confiée à un agent."],
	["Assignée", "Un agent est chargé du dossier."],
	["En cours de traitement", "L'agent examine la demande."],
	["En attente d'informations", "L'agent a besoin d'une précision. Le dossier avance quand vous répondez."],
	["Résolue", "Une réponse est disponible."],
	["Rejetée", "La demande ne peut pas être traitée. La raison est indiquée."],
	["Clôturée", "Le dossier est fermé."],
] as const;

const SLIDES = [
	["ecrire", "Écrire", "Un homme écrit sa demande sur un ordinateur portable, dans sa cuisine."],
	["parler", "Parler", "Une femme enregistre un message vocal sur une terrasse."],
	["noter", "Noter la référence", "Vue de dessus, une personne note une référence dans un carnet."],
] as const;

const LIVE_CHANNELS = [
	["message", "write", "Écrire votre demande", "Décrivez une situation fictive avec vos mots. Vous pourrez relire votre texte avant de confirmer.", "Commencer à écrire"],
	["record", "voice", "Ajouter votre voix", "Complétez votre texte par un message vocal de 3 minutes au plus. L’enregistrement reste sur cet appareil.", "Essayer le vocal"],
] as const;

// Published codes from the live platform (research §J.2). Content only: never a control.
const ANNOUNCED_CHANNELS = [
	["Vidéo", "Message filmé avec preuve visuelle.", "", "video"],
	["SMS", "Envoi depuis un téléphone simple.", "3737", "sms"],
	["USSD", "Menu par code, sans connexion.", "*711#", "ussd"],
	["Téléphone", "Un agent vous répond, en français, wolof, pulaar ou sérère.", "", "phone"],
] as const;

function SoonIcon({ kind }: { kind: (typeof ANNOUNCED_CHANNELS)[number][3] }) {
	const d =
		kind === "video" ? "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
		: kind === "sms" ? "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
		: kind === "ussd" ? "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
		: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z";
	return (
		<svg className="pv-soon__glyph" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

const IMPACT_STATS = [
	[128, "", "demandes suivies (fictif)"],
	[94, "", "citoyens accompagnés (fictif)"],
	[48, "h", "délai moyen de réponse (fictif)"],
	[91, "%", "taux de résolution (fictif)"],
] as const;

const REFERENCE = /^[A-Z]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

/** Accepts a reference typed with spaces, dashes or lowercase. */
export function normalizeReference(input: string): string {
	const raw = input.toUpperCase().replace(/[^A-Z0-9]/g, "");
	return raw.length === 12 ? `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8)}` : input.trim().toUpperCase();
}

function clock(seconds: number): string {
	return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const CHANNEL_SAMPLE = "Je souhaite comprendre le déroulement d’une audience.";

function ChannelActionIcon({ voice }: { voice: boolean }) {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d={
					voice
						? "M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
						: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
				}
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function LiveChannel({
	focus,
	channel,
	name,
	description,
	action,
	onStart,
}: {
	focus: "message" | "record";
	channel: "write" | "voice";
	name: string;
	description: string;
	action: string;
	onStart: (focus: "message" | "record") => void;
}) {
	const ref = useRef<HTMLElement>(null);
	const [play, setPlay] = useState(false);
	const [typed, setTyped] = useState(CHANNEL_SAMPLE);
	const voice = channel === "voice";

	useEffect(() => {
		const el = ref.current;
		if (!el || typeof IntersectionObserver === "undefined") return;
		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
		let visible = false;
		const onMotion = () => setPlay(visible && !motion.matches);
		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			onMotion();
		}, { threshold: 0.3 });
		io.observe(el);
		motion.addEventListener("change", onMotion);
		return () => {
			io.disconnect();
			motion.removeEventListener("change", onMotion);
		};
	}, []);

	useEffect(() => {
		if (voice) return;
		if (!play) {
			setTyped(CHANNEL_SAMPLE);
			return;
		}
		let i = 0;
		let hold = false;
		let id = 0;
		const step = () => {
			if (i < CHANNEL_SAMPLE.length) {
				i += 1;
				setTyped(CHANNEL_SAMPLE.slice(0, i));
				id = window.setTimeout(step, CHANNEL_SAMPLE[i - 1] === " " ? 90 : 36);
				return;
			}
			if (!hold) {
				hold = true;
				id = window.setTimeout(step, 2200);
				return;
			}
			i = 0;
			hold = false;
			setTyped("");
			id = window.setTimeout(step, 420);
		};
		setTyped("");
		id = window.setTimeout(step, 280);
		return () => window.clearTimeout(id);
	}, [play, voice]);

	return (
		<article ref={ref} className="pv-channel" data-channel={channel} aria-labelledby={`channel-${channel}`}>
			<h3 id={`channel-${channel}`}>{name}</h3>
			<p>{description}</p>
			<div className="pv-channel__visual">
				{voice ? (
					<figure className="pv-channel__voice">
						<Waveform source="sim" stream={null} height={96} running={play} />
						<figcaption>Animation illustrative, micro inactif.</figcaption>
					</figure>
				) : (
					<div className="pv-channel__text" aria-hidden="true">
						<span>Exemple</span>
						<p>
							{typed}
							{play ? <span className="pv-channel__caret" /> : null}
						</p>
					</div>
				)}
			</div>
			<Button variant="primary" type="button" aria-describedby="channels-note" onClick={() => onStart(focus)}>
				<ChannelActionIcon voice={voice} />
				{action}
			</Button>
		</article>
	);
}

function ImpactStats() {
	const ref = useRef<HTMLUListElement>(null);
	const [play, setPlay] = useState(false);
	const [fromZero, setFromZero] = useState(false);

	useEffect(() => {
		if (prefersReducedMotion()) return;
		setFromZero(true);
		const el = ref.current;
		if (!el || typeof IntersectionObserver === "undefined") return;
		const io = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			setPlay(true);
			io.disconnect();
		}, { threshold: 0.3 });
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<ul ref={ref} className="pv-impact__stats">
			{IMPACT_STATS.map(([value, suffix, label]) => (
				<li key={label} className="pv-impact__stat">
					<ImpactNumber value={value} suffix={suffix} play={play} fromZero={fromZero} />
					<span>{label}</span>
				</li>
			))}
		</ul>
	);
}

function ImpactNumber({ value, suffix, play, fromZero }: { value: number; suffix: string; play: boolean; fromZero: boolean }) {
	const [n, setN] = useState(value);

	useEffect(() => {
		if (!fromZero || play) return;
		setN(0);
	}, [fromZero, play]);

	useEffect(() => {
		if (!play) return;
		const start = performance.now();
		const dur = 820;
		let raf = 0;
		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / dur);
			setN(Math.round(value * (1 - (1 - t) ** 3)));
			if (t < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [play, value]);

	return <strong>{n.toLocaleString("fr-FR")}{suffix}</strong>;
}

function Frame({ current, children, taskMode }: { current: "deposer" | "suivre"; children: ReactNode; taskMode?: boolean }) {
	useEffect(() => { window.scrollTo(0, 0); }, [current]);

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
				brandLabel="Parler à la justice"
				brandSublabel="Démo"
				brandMark={
					<svg width="34" height="30" viewBox="0 0 34 30">
						<defs><clipPath id="pv-mark-bubble"><path d="M0 30V13a7 7 0 0 1 7-7h15a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7Z" /></clipPath></defs>
						<path d="M0 30V13a7 7 0 0 1 7-7h15a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7Z" fill="var(--color-brand)" />
						<circle cx="27" cy="7" r="7" fill="var(--color-gold)" />
						<circle cx="27" cy="7" r="7" fill="var(--color-brand-lit)" clipPath="url(#pv-mark-bubble)" />
					</svg>
				}
				nav={[
					{ href: "/", label: "Déposer une demande", current: current === "deposer" },
					{ href: "/suivre", label: "Suivre un dossier", current: current === "suivre" },
				]}
			/>
			<main id="main-content">{children}</main>
			<footer className="pv-footer">
				<div className="pv-container pv-footer__inner">
					<div>
						<strong>Parler à la justice</strong>
						<p>Prototype indépendant utilisant uniquement des données fictives.</p>
					</div>
					<nav aria-label="Liens de pied de page">
						<a href="https://justice.sec.gouv.sn/">Ministère de la Justice</a>
						<a href="https://e-senegal.sn/">Obtenir un acte</a>
						<a href="https://public.e-service.sn/">e-Services Justice</a>
						<a href="https://e-senegal.sn/">e-Sénégal</a>
					</nav>
				</div>
			</footer>
		</div>
	);
}

function HeroSlides() {
	const [active, setActive] = useState(0);

	return (
		<div className="pv-slides" role="region" aria-roledescription="carrousel" aria-label="Illustrations du service">
			<div className="pv-slides__stage" aria-live="off">
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
					{SLIDES.map(([id, label], i) => {
						const last = i === SLIDES.length - 1;
						return (
							<li key={id} data-state={i < active ? "done" : i === active ? "current" : undefined}>
								<button type="button" aria-label={`Illustration ${i + 1} sur ${SLIDES.length} : ${label}`} aria-pressed={i === active} onClick={() => setActive(i)}>
									<span className="pv-frise__dot" />
									<span className="pv-frise__label">{label}</span>
								</button>
								<span className={last ? "pv-frise__track pv-frise__track--end" : "pv-frise__track"}>
									{i === active && <span key={active} className="pv-frise__fill" onAnimationEnd={() => setActive((i + 1) % SLIDES.length)} />}
								</span>
							</li>
						);
					})}
				</ol>
			</div>
		</div>
	);
}

const KEEP_NOTE = "Le vocal est facultatif. Il part avec le dépôt, comme le texte.";

/** Records a voice message in the browser. Upload happens at confirm. */
function useRecorder() {
	const [source, setSource] = useState<WaveSource>("idle");
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [clip, setClip] = useState<{ url: string; seconds: number; blob: Blob } | null>(null);
	const [note, setNote] = useState(KEEP_NOTE);
	const [elapsed, setElapsed] = useState(0);
	const [pending, setPending] = useState(false);
	const mounted = useRef(true);
	const recorderRef = useRef<MediaRecorder | null>(null);
	const elapsedRef = useRef(0);
	elapsedRef.current = elapsed;

	useEffect(() => {
		mounted.current = true;
		return () => { mounted.current = false; };
	}, []);
	useEffect(() => {
		if (source === "idle") return;
		const id = window.setInterval(() => setElapsed((n) => n + 1), 1000);
		return () => window.clearInterval(id);
	}, [source]);
	useEffect(() => { if (source !== "idle" && elapsed >= VOICE_LIMIT) stop(); });
	useEffect(() => () => { stream?.getTracks().forEach((track) => track.stop()); }, [stream]);
	useEffect(() => () => { if (clip) URL.revokeObjectURL(clip.url); }, [clip]);

	function stop() {
		if (recorderRef.current?.state === "recording") recorderRef.current.stop();
		stream?.getTracks().forEach((track) => track.stop());
		setStream(null);
		setSource("idle");
	}

	async function toggle() {
		if (pending) return;
		if (source !== "idle") return stop();
		setPending(true);
		try {
			const live = await navigator.mediaDevices.getUserMedia({ audio: true });
			if (!mounted.current) { live.getTracks().forEach((track) => track.stop()); return; }
			if (typeof MediaRecorder === "undefined") {
				live.getTracks().forEach((track) => track.stop());
				setNote("Ce navigateur ne permet pas l'enregistrement. Continuez avec le texte.");
				return;
			}
			const chunks: Blob[] = [];
			const recorder = new MediaRecorder(live);
			recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
			recorder.onstop = () => {
				if (!mounted.current || !chunks.length) return;
				const blob = new Blob(chunks, { type: recorder.mimeType });
				setClip({ url: URL.createObjectURL(blob), seconds: elapsedRef.current, blob });
				setNote("Enregistrement prêt. Il partira avec le dépôt.");
			};
			recorderRef.current = recorder;
			setClip(null);
			setElapsed(0);
			recorder.start();
			setStream(live);
			setSource("live");
			setNote("Enregistrement en cours. Parlez normalement.");
		} catch {
			if (mounted.current) setNote("Micro indisponible. Autorisez le microphone ou continuez avec le texte.");
		} finally {
			if (mounted.current) setPending(false);
		}
	}

	function discard() {
		setClip(null);
		setElapsed(0);
		setNote(KEEP_NOTE);
	}

	return { source, stream, clip, note, elapsed, pending, toggle, discard };
}

type IntakeStage = "write" | "review" | "done";

export function Preview() {
	const recorder = useRecorder();
	const [text, setText] = useState("");
	const [stage, setStage] = useState<IntakeStage>("write");
	const [taskMode, setTaskMode] = useState(false);
	const [requestType, setRequestType] = useState<(typeof TYPES)[number][0] | null>(null);
	const [place, setPlace] = useState("");
	const [demoOk, setDemoOk] = useState(false);
	const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
	const [writeAttempted, setWriteAttempted] = useState(false);
	const [reviewAttempted, setReviewAttempted] = useState(false);
	const [identified, setIdentified] = useState(false);
	const [trackingCode, setTrackingCode] = useState(SAMPLE_CODE);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const summaryRef = useRef<HTMLDivElement>(null);
	const reviewSummaryRef = useRef<HTMLDivElement>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const recordRef = useRef<HTMLButtonElement>(null);
	const reviewTitleRef = useRef<HTMLHeadingElement>(null);
	const codeRef = useRef<HTMLElement>(null);
	const turnstileRef = useRef<TurnstileHandle>(null);
	const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const count = text.trim().length;
	const messageReady = count >= MIN && count <= MAX;
	const writeReady = messageReady && requestType !== null;
	const recording = recorder.pending || recorder.source !== "idle";
	const writeError = count < MIN ? "Écrivez au moins 12 caractères." : "Raccourcissez le message à 4 000 caractères maximum.";
	const showWriteError = writeAttempted && stage === "write" && !writeReady;
	const reviewReady = demoOk;
	const showReviewError = reviewAttempted && stage === "review" && !reviewReady;
	const tone = count > MAX ? "over" : count > MAX * 0.9 ? "near" : messageReady ? "ok" : undefined;

	useEffect(() => () => clearTimeout(copyTimer.current), []);
	useEffect(() => {
		getSession().then((user) => setIdentified(Boolean(user))).catch(() => setIdentified(false));
	}, []);

	function beginTask(focus: "message" | "record" = "message") {
		setTaskMode(true);
		requestAnimationFrame(() => {
			document.getElementById("workspace")?.scrollIntoView({ behavior: prefersReducedMotion() ? "instant" : "smooth", block: "start" });
			if (focus === "record") recordRef.current?.focus();
			else messageRef.current?.focus();
		});
	}

	function proceedWrite() {
		if (recording) return;
		setWriteAttempted(true);
		if (!writeReady) {
			requestAnimationFrame(() => summaryRef.current?.focus());
			return;
		}
		setTaskMode(true);
		setStage("review");
		setReviewAttempted(false);
		requestAnimationFrame(() => reviewTitleRef.current?.focus());
	}

	function backToWrite() {
		setStage("write");
		setReviewAttempted(false);
		requestAnimationFrame(() => messageRef.current?.focus());
	}

	async function confirmDeposit() {
		setReviewAttempted(true);
		setSubmitError(null);
		if (!reviewReady || !requestType || submitting) {
			requestAnimationFrame(() => reviewSummaryRef.current?.focus());
			return;
		}
		const turnstileToken = turnstileRef.current?.getToken() ?? "";
		if (!turnstileToken) {
			setSubmitError("Terminez la vérification anti-robot avant le dépôt.");
			return;
		}
		setSubmitting(true);
		try {
			let audioKey: string | null = null;
			if (recorder.clip) {
				const uploaded = await uploadAudio(recorder.clip.blob);
				if (!uploaded.ok) {
					setSubmitError(uploaded.error);
					turnstileRef.current?.reset();
					return;
				}
				audioKey = uploaded.key;
			}
			const body = place.trim() ? `${text.trim()}\n\nLieu : ${place.trim()}` : text.trim();
			const result = await createCase({
				kind: KIND_FROM_TYPE[requestType],
				channel: identified ? "identified" : "anonymous",
				body,
				demoConfirmed: demoOk,
				audioKey,
				turnstileToken,
			});
			if (!result.ok) {
				setSubmitError(result.error);
				turnstileRef.current?.reset();
				return;
			}
			setTrackingCode(result.trackingCode);
			setStage("done");
			requestAnimationFrame(() => document.getElementById("receipt")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }));
		} catch {
			setSubmitError("Connexion interrompue. Votre message est conservé sur cette page. Réessayez.");
			turnstileRef.current?.reset();
		} finally {
			setSubmitting(false);
		}
	}

	async function copyCode() {
		clearTimeout(copyTimer.current);
		try {
			await navigator.clipboard.writeText(trackingCode);
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

	const step1Current = stage === "write";
	const step2Current = stage === "review";
	const step2Done = stage === "done";

	return (
		<Frame current="deposer" taskMode={taskMode}>
			{!taskMode && (
				<>
					<section className="pv-hero" aria-labelledby="hero-title">
						<div className="pv-hero__flag" aria-hidden />
						<div className="pv-container pv-hero__copy">
							<h1 id="hero-title">Adressez une demande à la justice</h1>
							<p className="pv-lede">Essayez le parcours avec une situation fictive&nbsp;: écrivez, relisez, suivez votre demande.</p>
							<div className="pv-hero__action">
								<Button variant="primary" type="button" onClick={() => beginTask()} arrow>Commencer</Button>
							</div>
						</div>
						<HeroSlides />
					</section>

					<section className="pv-type-band" aria-label="Types de demandes">
						<div className="pv-container pv-types">
							<div className="pv-types__track">
								<ul>
									{TYPES.map(([name]) => <li key={name}>{name}</li>)}
								</ul>
								<ul className="pv-types__dup" aria-hidden="true">
									{TYPES.map(([name]) => <li key={name}>{name}</li>)}
								</ul>
							</div>
						</div>
					</section>

					<section className="pv-channels" aria-labelledby="channels-title">
						<div className="pv-channels__band">
							<div className="pv-container">
								<div className="pv-channels__head">
									<h2 id="channels-title">Votre message, avec vos mots.</h2>
									<p id="channels-note">Un texte reste nécessaire. La voix le complète. Rien n’est transmis.</p>
								</div>
								<div className="pv-channels__live">
									{LIVE_CHANNELS.map(([focus, channel, name, description, action]) => (
										<LiveChannel key={channel} focus={focus} channel={channel} name={name} description={description} action={action} onStart={beginTask} />
									))}
								</div>
							</div>
						</div>
						<div className="pv-container">
							<div className="pv-channels__soon">
								<div className="pv-channels__soon-head">
									<h3>Autres canaux annoncés</h3>
									<p>Annoncés par le service réel. Non disponibles dans cet aperçu.</p>
								</div>
								<ul className="pv-soon">
									{ANNOUNCED_CHANNELS.map(([name, description, code, kind]) => (
										<li key={name}>
											<span className="pv-soon__icon"><SoonIcon kind={kind} /></span>
											<strong>{name}</strong>
											{code ? <span className="pv-soon__code">{code}</span> : null}
											<p>{description}</p>
										</li>
									))}
								</ul>
							</div>
						</div>
					</section>

					<section className="pv-impact" aria-labelledby="impact-title">
						<div className="pv-impact__band">
							<div className="pv-container">
								<div className="pv-impact__head">
									<h2 id="impact-title">Notre impact</h2>
									<p>Chiffres fictifs, présentés pour montrer comment le service pourrait rendre compte de son activité.</p>
								</div>
								<ImpactStats />
							</div>
						</div>
					</section>
				</>
			)}

			{(stage === "write" || stage === "review") && (
			<section className="pv-workspace" id="workspace" aria-labelledby={stage === "review" ? "review-title" : "form-title"}>
				<div className="pv-container pv-workspace__layout">
					<div className="pv-rail">
						<aside className="pv-progress" aria-label="Progression du dépôt">
							<p>Votre demande, en deux étapes</p>
							<ol>
								<li aria-current={step1Current ? "step" : undefined} data-complete={!step1Current ? "true" : undefined}><span>1</span><div><strong>Votre message</strong><small>{step1Current ? "En cours" : "Terminé"}</small></div></li>
								<li aria-current={step2Current ? "step" : undefined} data-complete={step2Done ? "true" : undefined}><span>2</span><div><strong>Relire et confirmer</strong><small>{step2Done ? "Terminé" : step2Current ? "En cours" : "À venir"}</small></div></li>
							</ol>
						</aside>
						<aside className="pv-guidance" aria-labelledby="guidance-title">
							<h2 id="guidance-title">À retenir</h2>
							<ul>
								<li>Données fictives uniquement.</li>
								<li>Aucun conseil juridique.</li>
							</ul>
						</aside>
					</div>

					<div className="pv-form">
						{stage === "write" && (
							<>
								<div className="pv-form__heading">
									<p>Étape 1 sur 2</p>
									<h2 id="form-title">Que souhaitez-vous nous dire ?</h2>
									<span>Choisissez le type de demande, puis décrivez une situation fictive.</span>
								</div>
								{showWriteError && (
									<ErrorSummary ref={summaryRef} id="message-errors" title="Complétez les éléments avant de continuer" items={[
										...(!requestType ? [{ href: "#type-pick", label: "Choisissez un type de demande.", onNavigate: (event) => { event.preventDefault(); document.getElementById("type-pick")?.focus(); } }] : []),
										...(!messageReady ? [{ href: "#message", label: writeError, onNavigate: (event) => { event.preventDefault(); messageRef.current?.focus(); } }] : []),
									]} />
								)}
								<RequestTypeSelect
									id="type-pick"
									options={TYPES}
									value={requestType}
									onChange={setRequestType}
									invalid={showWriteError && !requestType}
								/>
								<Field
									id="message"
									kind="textarea"
									label="Votre message"
									required
									ref={messageRef}
									value={text}
									maxLength={MAX + 200}
									aria-invalid={showWriteError || undefined}
									aria-describedby={showWriteError ? "message-help message-errors" : "message-help"}
									placeholder="Exemple : je souhaite comprendre le déroulement d'une audience."
									onChange={(event) => setText(event.target.value)}
									metaId="message-help"
									meta={<>
										<span>{MIN} caractères minimum</span>
										<span data-tone={tone}>{count.toLocaleString("fr-FR")} / 4 000</span>
									</>}
								/>
								<div className="pv-audio" data-state={recorder.source !== "idle" ? "live" : recorder.clip ? "clip" : "idle"}>
									<div className="pv-audio__bar">
										<strong>Message vocal <span className="pv-optional">(facultatif)</span></strong>
										<Button ref={recordRef} variant="secondary" type="button" onClick={recorder.toggle} disabled={recorder.pending} aria-pressed={recorder.source !== "idle"} data-recording={recorder.source !== "idle" ? "true" : undefined}>
											<span className="pv-record-dot" />
											{recorder.pending ? "Autorisation…" : recorder.source !== "idle" ? "Arrêter" : recorder.clip ? "Réenregistrer" : "Enregistrer"}
										</Button>
									</div>
									{recorder.source !== "idle" && <Waveform source={recorder.source} stream={recorder.stream} height={40} />}
									{recorder.clip && recorder.source === "idle" && (
										<div className="pv-clip">
											<audio controls src={recorder.clip.url} aria-label="Réécouter le message vocal" />
											<Button variant="quiet" type="button" onClick={recorder.discard}>Supprimer</Button>
										</div>
									)}
									{(recorder.source !== "idle" || recorder.clip || recorder.note !== KEEP_NOTE) && (
										<div className="pv-audio__status">
											<span role="status">{recorder.note}</span>
											<time>{clock(recorder.source !== "idle" ? recorder.elapsed : recorder.clip?.seconds ?? 0)} / 03:00</time>
										</div>
									)}
								</div>
								<div className="pv-form__footer">
									<Button variant="primary" type="button" disabled={recording} onClick={proceedWrite} arrow>Continuer</Button>
									{recording && <p>Arrêtez l'enregistrement pour continuer.</p>}
								</div>
							</>
						)}

						{stage === "review" && (
							<>
								<div className="pv-form__heading">
									<p>Étape 2 sur 2</p>
									<h2 id="review-title" ref={reviewTitleRef} tabIndex={-1}>Relisez avant de confirmer</h2>
									<span>Vérifiez le message, puis confirmez la démonstration.</span>
								</div>
								{showReviewError && (
									<ErrorSummary ref={reviewSummaryRef} id="review-errors" title="Complétez les éléments manquants" items={[
										...(!demoOk ? [{ href: "#demo-confirm", label: "Cochez la confirmation de démonstration.", onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); document.getElementById("demo-confirm")?.focus(); } }] : []),
									]} />
								)}
								<div className="pv-review-block" aria-labelledby="review-message-label">
									{requestType && (
										<>
											<p className="pv-review-block__label" id="review-type-label">Type de demande</p>
											<p className="pv-review-block__body pv-review-block__type">{requestType}</p>
										</>
									)}
									<p className="pv-review-block__label" id="review-message-label">Votre message</p>
									<p className="pv-review-block__body">{text.trim()}</p>
									{recorder.clip && (
										<div className="pv-review-block__audio">
											<span>Message vocal joint</span>
											<audio controls src={recorder.clip.url} aria-label="Réécouter le message vocal" />
										</div>
									)}
									<Button variant="quiet" type="button" onClick={backToWrite}>Modifier le message</Button>
								</div>
								<Field
									id="place"
									kind="input"
									type="text"
									label="Lieu concerné"
									className="pv-field--compact"
									value={place}
									maxLength={120}
									placeholder="Exemple : tribunal d'instance de Pikine"
									onChange={(event) => setPlace(event.target.value)}
									hint="Tribunal, cour ou lieu des faits. Donnée fictive dans cet aperçu."
								/>
								<div className="pv-confirm">
									<input id="demo-confirm" type="checkbox" checked={demoOk} onChange={(event) => setDemoOk(event.target.checked)} />
									<label htmlFor="demo-confirm">Je comprends qu'aucune demande n'est transmise au Ministère ni à un service judiciaire. Ceci est une démonstration.</label>
								</div>
								<TurnstileField ref={turnstileRef} />
								{submitError && <InlineError id="submit-error">{submitError}</InlineError>}
								<div className="pv-form__footer">
									<Button variant="primary" type="button" disabled={submitting} onClick={confirmDeposit} arrow>{submitting ? "Dépôt en cours…" : "Confirmer le dépôt fictif"}</Button>
									<Button variant="secondary" type="button" disabled={submitting} onClick={backToWrite}>Retour</Button>
								</div>
							</>
						)}
					</div>
				</div>
			</section>
			)}

			{stage === "done" && (
				<section className="pv-outcome-band" id="receipt">
					<div className="pv-container pv-outcome">
						<div className="pv-outcome__intro">
							<h2>Une référence à conserver.<br />Un suivi à retrouver.</h2>
							<span>Le récépissé rassemble la référence et les étapes du suivi. Conservez-la pour retrouver le dossier.</span>
						</div>
						<article className="pv-receipt" aria-label="Récépissé de dépôt">
							<header>
								<div>
									<p>Confirmation de dépôt</p>
									<time>Démonstration. Rien n'est transmis au Ministère.</time>
								</div>
								<span>Données fictives</span>
							</header>
							<div className="pv-receipt__reference">
								<span>Référence de suivi</span>
								<strong ref={codeRef}>{trackingCode}</strong>
								<p>Ce n'est pas un numéro d'ordre&nbsp;: la référence ne permet pas de deviner d'autres dossiers.</p>
								{requestType && (
									<dl className="pv-receipt__meta">
										<div><dt>Type</dt><dd>{requestType}</dd></div>
										{place.trim() && <div><dt>Lieu</dt><dd>{place.trim()}</dd></div>}
									</dl>
								)}
								{recorder.clip && <p>Message vocal joint&nbsp;: {clock(recorder.clip.seconds)}.</p>}
							</div>
							<div className="pv-receipt__actions">
								<Button variant="primary" href={`/suivre?ref=${encodeURIComponent(trackingCode)}`} arrow>Suivre ce dossier</Button>
								<Button variant="secondary" type="button" onClick={copyCode} aria-describedby={copyState === "error" ? "copy-error" : undefined}>{copyState === "copied" ? "Référence copiée" : "Copier la référence"}</Button>
								<Button variant="quiet" type="button" onClick={() => window.print()}>Imprimer</Button>
								{copyState === "error" && <InlineError id="copy-error" className="pv-receipt__actions-error">Copie automatique impossible. La référence est sélectionnée&nbsp;: copiez-la avec Ctrl+C ou &#8984;C.</InlineError>}
							</div>
							<ol className="pv-history" aria-label="Étapes du suivi">
								<li data-status="complete"><span /><div><strong>Reçue</strong><time>À l'instant</time></div></li>
								<li data-status="active"><span /><div><strong>Assignée à un agent</strong><time>En cours</time></div></li>
								<li><span /><div><strong>En attente d'informations</strong><time>Si besoin</time></div></li>
								<li><span /><div><strong>Résolue ou rejetée</strong><time>À venir</time></div></li>
							</ol>
						</article>
					</div>
				</section>
			)}
		</Frame>
	);
}

export function PreviewSuivre() {
	const initial = (() => {
		if (typeof window === "undefined") return "";
		const fromQuery = new URLSearchParams(window.location.search).get("ref") ?? "";
		const path = window.location.pathname.replace(/\/+$/, "");
		if (path.startsWith("/d/")) return decodeURIComponent(path.slice(3));
		return fromQuery;
	})();
	const [query, setQuery] = useState(initial);
	const [error, setError] = useState<string | null>(null);
	const [dossier, setDossier] = useState<CaseDossier | null>(null);
	const [loading, setLoading] = useState(Boolean(initial.trim()));
	const inputRef = useRef<HTMLInputElement>(null);

	async function lookup(raw: string) {
		const code = raw.trim().toUpperCase();
		if (!code) {
			setError("Saisissez la référence reçue au dépôt.");
			setDossier(null);
			inputRef.current?.focus();
			return;
		}
		setLoading(true);
		setError(null);
		try {
			const result = await getCase(code);
			if (!result) {
				setDossier(null);
				setError("Aucun dossier ne correspond à cette référence.");
				inputRef.current?.focus();
				return;
			}
			setQuery(result.trackingCode);
			setDossier(result);
			requestAnimationFrame(() => document.getElementById("dossier")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }));
		} catch {
			setDossier(null);
			setError("Impossible de charger le dossier. Réessayez.");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (!initial.trim()) return;
		void lookup(initial);
	}, []);

	function search(event: FormEvent) {
		event.preventDefault();
		void lookup(query);
	}

	const statusName = dossier ? STATUS_FROM_CASE[dossier.status] ?? dossier.status : "";
	const typeName = dossier
		? TYPES.find(([name]) => KIND_FROM_TYPE[name] === dossier.kind)?.[0] ?? dossier.kind
		: "";

	return (
		<Frame current="suivre">
			<section className="pv-track" aria-labelledby="track-title">
				<div className="pv-container pv-track__layout">
					<div>
						<h1 id="track-title">Suivre un dossier</h1>
						<p className="pv-lede">Saisissez la référence reçue au dépôt. Aucun compte n'est nécessaire.</p>
						<form className="pv-lookup" onSubmit={search} noValidate>
							<label htmlFor="reference">Référence de suivi</label>
							<div className="pv-lookup__row">
								<input
									id="reference"
									ref={inputRef}
									value={query}
									onChange={(event) => setQuery(event.target.value)}
									placeholder="PALJ-XXXX"
									autoComplete="off"
									autoCapitalize="characters"
									spellCheck={false}
									aria-invalid={error ? true : undefined}
									aria-describedby={error ? "reference-help reference-error" : "reference-help"}
								/>
								<Button variant="primary" type="submit">{loading ? "Recherche…" : "Rechercher"}</Button>
							</div>
							<p className="pv-lookup__help" id="reference-help">
								La référence commence par PALJ-. Conservez-la après le dépôt.
							</p>
							{error && <InlineError id="reference-error">{error}</InlineError>}
						</form>
					</div>
					<img className="pv-track__art" src="/images/hero/noter-1280.webp" srcSet="/images/hero/noter-1280.webp 1280w, /images/hero/noter-2560.webp 2560w" sizes="(max-width: 1184px) 50vw, 560px" width={2720} height={1536} alt="Illustration décorative : une personne note une référence dans un carnet." decoding="async" />
				</div>
			</section>

			{!dossier && (
				<section className="pv-type-band" aria-label="Comment fonctionne le suivi">
					<div className="pv-container pv-track-help">
						<div className="pv-track-help__step"><span>1</span><div><strong>Vous recevez une référence</strong><p>À la fin d'un dépôt, une référence commençant par PALJ- est fournie.</p></div></div>
						<div className="pv-track-help__step"><span>2</span><div><strong>Vous la saisissez ici</strong><p>La référence retrouve votre dossier et son statut actuel. Aucun compte n'est nécessaire.</p></div></div>
						<div className="pv-track-help__step"><span>3</span><div><strong>Vous suivez le statut</strong><p>Les étapes du dossier s'affichent à mesure qu'un agent les avance.</p></div></div>
					</div>
				</section>
			)}

			{dossier && (
				<section className="pv-outcome-band" id="dossier" aria-labelledby="dossier-title">
					<div className="pv-container pv-dossier">
						<article className="pv-dossier__card">
							<header>
								<div>
									<p>Dossier de démonstration</p>
									<strong className="pv-code">{dossier.trackingCode}</strong>
								</div>
								<dl className="pv-dossier__meta">
									<dt>Type</dt><dd>{typeName}</dd>
									<dt>Déposé le</dt><dd>{new Date(dossier.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}</dd>
									<dt>Mode</dt><dd>{dossier.channel === "identified" ? "Compte démo" : "Sans compte"}</dd>
								</dl>
							</header>
							<div className="pv-dossier__status" data-state={dossier.status === "repondu" ? "progress" : "waiting"}>
								<p>Statut actuel</p>
								<h2 id="dossier-title">{statusName}</h2>
								<p className="pv-dossier__ask">{dossier.body}</p>
								{dossier.audioKey && <audio controls src={`/api/audio?key=${encodeURIComponent(dossier.audioKey)}`} aria-label="Réécouter le message vocal" />}
							</div>
							<ol className="pv-history" aria-label="Historique du dossier">
								{dossier.events.map((event, index) => (
									<li key={event.id} data-status={index === dossier.events.length - 1 ? "active" : "complete"}>
										<span />
										<div>
											<strong>{event.label}</strong>
											<time>{new Date(event.at).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</time>
										</div>
									</li>
								))}
							</ol>
						</article>
						<aside className="pv-statuses" aria-labelledby="statuses-title">
							<h2 id="statuses-title">Statuts</h2>
							<dl>
								{STATUSES.map(([name, meaning]) => {
									const current = name === statusName;
									const kind = name === "Rejetée" ? "stop" : name === "En attente d'informations" ? "wait" : undefined;
									return (
										<div key={name} data-current={current || undefined} data-kind={kind}>
											<dt>{name}</dt>
											<dd>{meaning}</dd>
										</div>
									);
								})}
							</dl>
						</aside>
					</div>
				</section>
			)}
		</Frame>
	);
}
