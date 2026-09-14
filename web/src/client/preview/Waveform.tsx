import { useEffect, useRef } from "react";

export type WaveSource = "idle" | "live" | "sim";

const BAR = 3;
const GAP = 3;

// Speech has a syllable rate near 5Hz under a slower phrase envelope.
// Without a microphone the preview draws that shape instead of a sine.
function synthetic(t: number): number {
	const syllable = 0.2 + 0.8 * Math.abs(Math.sin(t * 5.5)) ** 1.4;
	const phrase = 0.55 + 0.45 * Math.sin(t * 0.47);
	const breath = Math.sin(t * 0.31) > 0.86 ? 0.08 : 1;
	return Math.min(1, syllable * phrase * breath * (0.72 + Math.random() * 0.28));
}

export function Waveform({
	source,
	stream,
	height = 64,
}: {
	source: WaveSource;
	stream: MediaStream | null;
	height?: number;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const levelsRef = useRef<number[]>([]);
	const liveRef = useRef(0);
	const sourceRef = useRef(source);
	sourceRef.current = source;

	useEffect(() => {
		if (source !== "live" || !stream) return;
		const Ctx = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
		if (!Ctx) return;
		const audio = new Ctx();
		const analyser = audio.createAnalyser();
		analyser.fftSize = 1024;
		analyser.smoothingTimeConstant = 0.72;
		audio.createMediaStreamSource(stream).connect(analyser);
		const bins = new Uint8Array(analyser.frequencyBinCount);
		let raf = 0;
		const read = () => {
			analyser.getByteTimeDomainData(bins);
			let peak = 0;
			for (const bin of bins) peak = Math.max(peak, Math.abs(bin - 128) / 128);
			liveRef.current = Math.min(1, peak * 2.4);
			raf = requestAnimationFrame(read);
		};
		raf = requestAnimationFrame(read);
		return () => {
			cancelAnimationFrame(raf);
			audio.close().catch(() => {});
			liveRef.current = 0;
		};
	}, [source, stream]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Canvas cannot resolve a custom property, so read the tokens off the
		// element: the palette stays the single source of truth for the waveform too.
		const style = getComputedStyle(canvas);
		const color = style.getPropertyValue("--proceed").trim() || "#0b6b3a";
		const quiet = style.getPropertyValue("--wave-quiet").trim() || "#aab5b0";

		let width = 0;
		let raf = 0;
		const observer = new ResizeObserver(() => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = canvas.clientWidth;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		});
		observer.observe(canvas);

		const start = performance.now();
		let lastPush = 0;

		const draw = (now: number) => {
			raf = requestAnimationFrame(draw);
			if (!width) return;
			const t = (now - start) / 1000;
			const slots = Math.max(1, Math.floor(width / (BAR + GAP)));

			const levels = levelsRef.current;
			// The ribbon fills the track from the first frame, so an idle recorder
			// reads as a quiet signal rather than an empty box.
			while (levels.length < slots) levels.unshift(0.14 + 0.09 * Math.sin(levels.length * 0.19));
			while (levels.length > slots) levels.shift();

			if (now - lastPush >= 34) {
				lastPush = now;
				const mode = sourceRef.current;
				const next =
					mode === "live" ? liveRef.current
					: mode === "sim" ? synthetic(t)
					: 0.14 + 0.09 * Math.sin(t * 2.2);
				levels.push(next);
				levels.shift();
			}

			ctx.clearRect(0, 0, width, height);
			const mid = height / 2;
			const active = sourceRef.current !== "idle";

			for (let i = 0; i < levels.length; i += 1) {
				const level = levels[i];
				const x = width - (levels.length - i) * (BAR + GAP);
				if (x < -BAR) continue;
				const h = Math.max(BAR, level * (height - 6));
				// The leading edge carries the live signal, so it reads brighter.
				const edge = i > levels.length - 5;
				ctx.fillStyle = active ? color : quiet;
				ctx.globalAlpha = active ? (edge ? 1 : 0.34 + level * 0.66) : 0.75;
				ctx.beginPath();
				ctx.roundRect(x, mid - h / 2, BAR, h, BAR / 2);
				ctx.fill();
			}
			ctx.globalAlpha = 1;
		};

		raf = requestAnimationFrame(draw);
		return () => {
			cancelAnimationFrame(raf);
			observer.disconnect();
		};
	}, [height]);

	return <canvas ref={canvasRef} className="pv-wave" style={{ height }} aria-hidden="true" />;
}
