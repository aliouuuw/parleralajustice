import { Button } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { uploadAudio } from "../lib/api";

export function VoiceRecorder({ onAudioKey, onBusyChange, disabled = false }: {
	onAudioKey: (key: string | null) => void;
	onBusyChange?: (busy: boolean) => void;
	disabled?: boolean;
}) {
	const [recording, setRecording] = useState(false);
	const [busy, setBusy] = useState(false);
	const [status, setStatus] = useState("");
	const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const playbackUrlRef = useRef<string | null>(null);
	const busyRef = useRef(false);
	const mountedRef = useRef(false);
	const callbacksRef = useRef({ onAudioKey, onBusyChange });

	useEffect(() => {
		callbacksRef.current = { onAudioKey, onBusyChange };
	}, [onAudioKey, onBusyChange]);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
			releaseRecorder();
			if (playbackUrlRef.current) URL.revokeObjectURL(playbackUrlRef.current);
			if (busyRef.current) callbacksRef.current.onBusyChange?.(false);
			busyRef.current = false;
		};
	}, []);

	function releaseRecorder() {
		const recorder = mediaRecorderRef.current;
		if (!recorder) return;
		mediaRecorderRef.current = null;
		recorder.onstop = null;
		recorder.ondataavailable = null;
		recorder.onerror = null;
		try {
			if (recorder.state !== "inactive") recorder.stop();
		} finally {
			recorder.stream.getTracks().forEach((track) => track.stop());
		}
	}

	function updateBusy(value: boolean) {
		busyRef.current = value;
		setBusy(value);
		callbacksRef.current.onBusyChange?.(value);
	}

	async function start() {
		if (disabled || busyRef.current || !mountedRef.current) return;
		updateBusy(true);
		setStatus("Autorisation du micro…");
		let stream: MediaStream | null = null;
		try {
			stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			if (!mountedRef.current) {
				stream.getTracks().forEach((track) => track.stop());
				return;
			}
			const chunks: Blob[] = [];
			const recorder = new MediaRecorder(stream);
			mediaRecorderRef.current = recorder;
			recorder.ondataavailable = (ev) => {
				if (ev.data.size) chunks.push(ev.data);
			};
			recorder.onerror = () => {
				releaseRecorder();
				if (!mountedRef.current) return;
				setRecording(false);
				setStatus("Enregistrement impossible. Continuez en texte.");
				updateBusy(false);
			};
			recorder.onstop = async () => {
				releaseRecorder();
				if (!mountedRef.current) return;
				setRecording(false);
				setStatus("Envoi de l'audio…");
				try {
					const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
					const result = await uploadAudio(blob);
					if (!mountedRef.current) return;
					if (!result.ok) {
						setStatus(result.error);
						return;
					}
					const url = URL.createObjectURL(blob);
					if (playbackUrlRef.current) URL.revokeObjectURL(playbackUrlRef.current);
					playbackUrlRef.current = url;
					setPlaybackUrl(url);
					callbacksRef.current.onAudioKey(result.key);
					setStatus("Voix enregistrée.");
				} catch {
					if (mountedRef.current) setStatus("Envoi impossible. Réessayez ou continuez en texte.");
				} finally {
					if (mountedRef.current) updateBusy(false);
				}
			};
			recorder.start();
			setRecording(true);
			setStatus("Enregistrement…");
		} catch {
			releaseRecorder();
			stream?.getTracks().forEach((track) => track.stop());
			if (!mountedRef.current) return;
			setRecording(false);
			setStatus("Micro indisponible ou refusé. Continuez en texte.");
			updateBusy(false);
		}
	}

	function stop() {
		const recorder = mediaRecorderRef.current;
		if (!recorder || recorder.state === "inactive") return;
		recorder.stop();
		setRecording(false);
	}

	return (
		<div className="voice-recorder" data-recording={recording}>
			<div className="voice-controls">
				<div><p className="field-label">Message vocal</p><p className="field-help">Facultatif, en complément du texte.</p></div>
				<Button variant="secondary" className="button-secondary" onPress={recording ? stop : start} isDisabled={!recording && (disabled || busy)} type="button">
					{recording ? "Arrêter" : "Enregistrer"}
				</Button>
			</div>
			<p className="field-help voice-status" role="status">{status}</p>
			{playbackUrl && <audio aria-label="Écouter votre enregistrement" controls src={playbackUrl} />}
		</div>
	);
}
