import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const TURNSTILE_SITE_KEY = "0x4AAAAAAEx8oeIJp9nOIoG0";

declare global {
	interface Window {
		turnstile?: {
			ready: (callback: () => void) => void;
			render: (container: HTMLElement, options: {
				sitekey: string;
				theme: "light";
				size: "flexible";
				callback: (token: string) => void;
				"expired-callback": () => void;
				"error-callback": () => void;
			}) => string;
			reset: (widget: string) => void;
			remove: (widget: string) => void;
			getResponse: (widget: string) => string | undefined;
		};
	}
}

export type TurnstileHandle = { reset: () => void; getToken: () => string };

export const TurnstileField = forwardRef<TurnstileHandle>(function TurnstileField(_props, ref) {
	const divRef = useRef<HTMLDivElement>(null);
	const widgetRef = useRef<string | null>(null);
	const [status, setStatus] = useState("Chargement de la vérification anti-robot…");

	useEffect(() => {
		let active = true;
		const script = document.getElementById("turnstile-api");
		const render = () => window.turnstile?.ready(() => {
			if (!active || !divRef.current || widgetRef.current !== null || !window.turnstile) return;
			widgetRef.current = window.turnstile.render(divRef.current, {
				sitekey: TURNSTILE_SITE_KEY,
				theme: "light",
				size: "flexible",
				callback: () => { if (active) setStatus(""); },
				"expired-callback": () => { if (active) setStatus("Vérification expirée. Relancez-la ci-dessous."); },
				"error-callback": () => { if (active) setStatus("Vérification indisponible. Réessayez ci-dessous."); },
			});
			setStatus("");
		});
		const onError = () => setStatus("Vérification non chargée. Votre navigateur doit autoriser challenges.cloudflare.com.");
		script?.addEventListener("load", render);
		script?.addEventListener("error", onError);
		render();
		const timeout = window.setTimeout(() => {
			if (widgetRef.current === null) onError();
		}, 15000);
		return () => {
			active = false;
			window.clearTimeout(timeout);
			script?.removeEventListener("load", render);
			script?.removeEventListener("error", onError);
			if (widgetRef.current !== null) window.turnstile?.remove(widgetRef.current);
			widgetRef.current = null;
		};
	}, []);

	function reset() {
		if (widgetRef.current === null) return;
		setStatus("");
		window.turnstile?.reset(widgetRef.current);
	}

	useImperativeHandle(ref, () => ({
		reset,
		getToken: () => widgetRef.current === null ? "" : window.turnstile?.getResponse(widgetRef.current) ?? "",
	}));

	return (
		<div className="verification-field">
			<div ref={divRef} />
			{status && <p className="field-help" role="status">{status}</p>}
			{status && widgetRef.current !== null && <button type="button" className="text-button" onClick={reset}>Relancer la vérification</button>}
		</div>
	);
});
