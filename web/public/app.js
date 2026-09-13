const app = document.getElementById("app");

const TURNSTILE_SITE_KEY = "0x4AAAAAAEx8oeIJp9nOIoG0";

const KINDS = [
	["information", "Demande d'information"],
	["reclamation", "Reclamation"],
	["signalement", "Signalement"],
	["suggestion", "Suggestion"],
];

function path() {
	return location.pathname.replace(/\/+$/, "") || "/";
}

function go(href) {
	history.pushState({}, "", href);
	void render();
}

function html(strings, ...values) {
	return strings.reduce((out, chunk, i) => out + chunk + (values[i] ?? ""), "");
}

function esc(value) {
	return String(value ?? "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

document.addEventListener("click", (event) => {
	const link = event.target instanceof Element ? event.target.closest("a[href^='/']") : null;
	if (!link) return;
	const href = link.getAttribute("href");
	if (!href || href.startsWith("//")) return;
	if (event.metaKey || event.ctrlKey || event.shiftKey) return;
	event.preventDefault();
	go(href);
});

async function session() {
	const res = await fetch("/api/auth/get-session", { credentials: "include" });
	if (!res.ok) return null;
	try {
		const data = await res.json();
		if (!data || typeof data !== "object" || !("user" in data)) return null;
		return data.user ?? null;
	} catch {
		return null;
	}
}

function home() {
	return html`
		<p class="kicker">Prototype citoyen — Dakar, 2026</p>
		<h1>Deux portes. Une seule question.</h1>
		<p class="lede">
			Vous voulez parler à la justice, ou obtenir un acte ? Les actes restent sur e-Sénégal.
			Ici, on démontre un accueil lisible, pas un ministère.
		</p>
		<div class="sheet">
			<a href="/parler">
				<span class="n">Porte 1</span>
				<h2>Parler</h2>
				<p>Information, réclamation, signalement, suggestion. Anonyme ou identifié.</p>
			</a>
			<hr class="perforation" />
			<a href="/acte">
				<span class="n">Porte 2</span>
				<h2>Obtenir un acte</h2>
				<p>Casier, nationalité, permis de communiquer — lien vers le guichet officiel.</p>
			</a>
		</div>
		<p class="actions">
			<a class="act" href="/suivre">J'ai déjà un code de suivi</a>
		</p>
	`;
}

function acte() {
	return html`
		<p class="kicker">Pas ici</p>
		<h1>Les actes ne passent pas par ce prototype.</h1>
		<p class="lede">
			Jokko Ak Yoon n'est pas non plus le guichet des actes. Les demandes de casier, de
			certificat de nationalité ou de permis de communiquer restent sur les plateformes
			d'e-Services.
		</p>
		<p class="actions">
			<a
				class="btn"
				href="https://e-senegal.sn/#/home/administrations/ministere-de-la-justice"
				target="_blank"
				rel="noopener noreferrer"
				>Ouvrir e-Sénégal</a
			>
			<a
				class="btn secondary"
				href="https://public.e-service.sn/#/public"
				target="_blank"
				rel="noopener noreferrer"
				>e-Services Justice</a
			>
		</p>
		<p class="muted">Ces liens quittent la démonstration.</p>
	`;
}

function parler(user) {
	const identified = Boolean(user);
	return html`
		<p class="kicker">${identified ? `Identifié : ${esc(user.email)}` : "Chemin anonyme par défaut"}</p>
		<h1>Parler</h1>
		<p class="lede">
			${identified
				? "Ce dossier portera votre nom et votre e-mail de démonstration."
				: "Sans compte, vous recevez un code de suivi. Personne n'est nommé."}
		</p>
		${identified
			? ""
			: `<p><a class="act" href="/connexion">Je veux un dossier identifié — connexion</a></p>`}
		<form id="case-form">
			<label>
				Type
				<select name="kind" required>
					${KINDS.map(([v, l]) => `<option value="${esc(v)}">${esc(l)}</option>`).join("")}
				</select>
			</label>
			<label>
				Votre message (démonstration)
				<textarea name="body" required minlength="12" maxlength="4000" placeholder="N'écrivez pas une vraie affaire."></textarea>
			</label>
			<div class="rec">
				<p>Voix (optionnel) — enregistrement dans le navigateur, pas un fichier à téléverser.</p>
				<button type="button" class="secondary" id="rec-btn">Enregistrer</button>
				<button type="button" class="secondary" id="stop-btn" hidden>Arrêter</button>
				<p class="muted" id="rec-status"></p>
				<audio id="rec-play" hidden controls></audio>
			</div>
			<label class="check">
				<input type="checkbox" name="demo" required />
				<span>Je confirme : ceci est une démonstration. Je n'envoie pas de vrai dossier judiciaire.</span>
			</label>
			<div class="cf-turnstile" data-sitekey="${TURNSTILE_SITE_KEY}"></div>
			<p class="err" id="form-err" hidden></p>
			<button type="submit">Déposer le dossier</button>
		</form>
	`;
}

function suivre(prefill = "") {
	return html`
		<p class="kicker">Souche</p>
		<h1>Suivre un dossier</h1>
		<form id="track-form">
			<label>
				Code
				<input name="code" value="${esc(prefill)}" placeholder="PALJ-XXXX" required />
			</label>
			<button type="submit">Voir le suivi</button>
		</form>
		<div id="track-out"></div>
	`;
}

function connexion() {
	return html`
		<p class="kicker">Compte de démonstration</p>
		<h1>Connexion par e-mail</h1>
		<p class="lede">
			L'envoi réel d'e-mail n'est pas branché. Le code s'affiche ici une fois, pour la démo.
			Utilisez un e-mail avec un domaine, par exemple demo@exemple.sn.
		</p>
		<form id="otp-form">
			<label>
				E-mail
				<input
					type="email"
					name="email"
					required
					autocomplete="email"
					placeholder="demo@exemple.sn"
					pattern="[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}"
					title="Utilisez un domaine, par exemple demo@exemple.sn"
				/>
			</label>
			<label>
				Code
				<input name="otp" inputmode="numeric" autocomplete="one-time-code" placeholder="6 chiffres" />
			</label>
			<p class="muted" id="otp-hint"></p>
			<p class="err" id="otp-err" hidden></p>
			<div class="actions">
				<button type="button" class="secondary" id="send-otp">Envoyer le code</button>
				<button type="submit">Se connecter</button>
			</div>
		</form>
	`;
}

function guichetTable(rows) {
	if (!rows.length) return `<p>Aucun dossier.</p>`;
	return html`
		<table>
			<thead>
				<tr>
					<th>Code</th>
					<th>Type</th>
					<th>Voie</th>
					<th>État</th>
				</tr>
			</thead>
			<tbody>
				${rows
					.map(
						(row) => `<tr>
						<td><a href="/d/${esc(row.tracking_code)}">${esc(row.tracking_code)}</a></td>
						<td>${esc(row.kind)}</td>
						<td>${row.channel === "identified" ? esc(row.display_name || "identifié") : "anonyme"}</td>
						<td>${esc(row.status)}</td>
					</tr>`,
					)
					.join("")}
			</tbody>
		</table>
	`;
}

function dossierView(data) {
	const events = (data.events || [])
		.map(
			(ev) =>
				`<li><strong>${esc(ev.label)}</strong><br /><span class="muted">${esc(new Date(ev.at).toLocaleString("fr-SN"))}</span></li>`,
		)
		.join("");
	const audio = data.audioKey
		? `<audio controls src="/api/audio?key=${encodeURIComponent(data.audioKey)}"></audio>`
		: "";
	return html`
		<p class="kicker">${data.channel === "anonymous" ? "Anonyme" : "Identifié"}</p>
		<p class="code">${esc(data.trackingCode)}</p>
		<p>Type : ${esc(data.kind)} · État : ${esc(data.status)}</p>
		${data.displayName ? `<p>Nom (démo) : ${esc(data.displayName)}</p>` : ""}
		<p>${esc(data.body)}</p>
		${audio}
		<ol class="timeline">${events}</ol>
		<p><a class="act" href="/suivre">Autre code</a></p>
	`;
}

let mediaRecorder = null;
let audioChunks = [];
let audioKey = null;

async function wireParler(user) {
	const recBtn = document.getElementById("rec-btn");
	const stopBtn = document.getElementById("stop-btn");
	const status = document.getElementById("rec-status");
	const player = document.getElementById("rec-play");
	recBtn?.addEventListener("click", async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			audioChunks = [];
			mediaRecorder = new MediaRecorder(stream);
			mediaRecorder.ondataavailable = (ev) => {
				if (ev.data.size) audioChunks.push(ev.data);
			};
			mediaRecorder.onstop = async () => {
				stream.getTracks().forEach((t) => t.stop());
				const blob = new Blob(audioChunks, { type: mediaRecorder?.mimeType || "audio/webm" });
				if (player instanceof HTMLAudioElement) {
					player.src = URL.createObjectURL(blob);
					player.hidden = false;
				}
				if (status) status.textContent = "Envoi de l'audio…";
				const up = await fetch("/api/audio", {
					method: "POST",
					headers: { "content-type": blob.type || "audio/webm" },
					body: blob,
				});
				const payload = await up.json().catch(() => ({}));
				if (!up.ok) {
					if (status) status.textContent = payload.error || "Audio refusé.";
					return;
				}
				audioKey = payload.key;
				if (status) status.textContent = "Voix enregistrée.";
			};
			mediaRecorder.start();
			if (recBtn) recBtn.hidden = true;
			if (stopBtn) stopBtn.hidden = false;
			if (status) status.textContent = "Enregistrement…";
		} catch {
			if (status) status.textContent = "Micro refusé. Continuez en texte.";
		}
	});
	stopBtn?.addEventListener("click", () => {
		mediaRecorder?.stop();
		stopBtn.hidden = true;
		if (recBtn) recBtn.hidden = false;
	});

	document.getElementById("case-form")?.addEventListener("submit", async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (!(form instanceof HTMLFormElement)) return;
		const err = document.getElementById("form-err");
		if (err) err.hidden = true;
		const kind = form.elements.namedItem("kind");
		const bodyField = form.elements.namedItem("body");
		const demo = form.elements.namedItem("demo");
		if (!(kind instanceof HTMLSelectElement) || !(bodyField instanceof HTMLTextAreaElement) || !(demo instanceof HTMLInputElement)) {
			return;
		}
		const turnstileToken = new FormData(form).get("cf-turnstile-response") || "";
		const body = {
			kind: kind.value,
			channel: user ? "identified" : "anonymous",
			body: bodyField.value,
			demoConfirmed: demo.checked,
			audioKey,
			turnstileToken,
		};
		const res = await fetch("/api/cases", {
			method: "POST",
			credentials: "include",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(body),
		});
		const data = await res.json().catch(() => ({}));
		if (!res.ok) {
			if (err) {
				err.hidden = false;
				err.textContent = data.error || "Dépôt impossible.";
			}
			window.turnstile?.reset();
			return;
		}
		go(`/d/${data.trackingCode}`);
	});
}

function wireSuivre() {
	document.getElementById("track-form")?.addEventListener("submit", (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (!(form instanceof HTMLFormElement)) return;
		const field = form.elements.namedItem("code");
		if (!(field instanceof HTMLInputElement)) return;
		const code = field.value.trim().toUpperCase();
		go(`/d/${code}`);
	});
}

function wireConnexion() {
	const form = document.getElementById("otp-form");
	if (!(form instanceof HTMLFormElement)) return;
	const hint = document.getElementById("otp-hint");
	const err = document.getElementById("otp-err");
	document.getElementById("send-otp")?.addEventListener("click", async () => {
		if (err) err.hidden = true;
		const emailField = form.elements.namedItem("email");
		const otpField = form.elements.namedItem("otp");
		if (!(emailField instanceof HTMLInputElement) || !(otpField instanceof HTMLInputElement)) return;
		if (!emailField.checkValidity()) {
			emailField.reportValidity();
			return;
		}
		const email = emailField.value.trim().toLowerCase();
		try {
			const send = await fetch("/api/auth/email-otp/send-verification-otp", {
				method: "POST",
				credentials: "include",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ email, type: "sign-in" }),
			});
			const sendBody = await send.json().catch(() => ({}));
			if (!send.ok) {
				if (err) {
					err.hidden = false;
					err.textContent =
						sendBody.code === "INVALID_EMAIL"
							? "E-mail invalide. Exemple : demo@exemple.sn."
							: "Envoi impossible.";
				}
				return;
			}
			const demo = await fetch("/api/demo/otp", {
				method: "POST",
				credentials: "include",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ email }),
			});
			const payload = await demo.json().catch(() => ({}));
			if (demo.ok) {
				otpField.value = payload.otp;
				if (hint) hint.textContent = `Code de démonstration (e-mail non branché) : ${payload.otp}`;
			} else if (hint) {
				hint.textContent = "Code envoyé dans le circuit de démo.";
			}
		} catch {
			if (err) {
				err.hidden = false;
				err.textContent = "Réseau indisponible.";
			}
		}
	});
	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		if (err) err.hidden = true;
		const emailField = form.elements.namedItem("email");
		const otpField = form.elements.namedItem("otp");
		if (!(emailField instanceof HTMLInputElement) || !(otpField instanceof HTMLInputElement)) return;
		const res = await fetch("/api/auth/sign-in/email-otp", {
			method: "POST",
			credentials: "include",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				email: emailField.value.trim(),
				otp: otpField.value.trim(),
				name: "Citoyen demo",
			}),
		});
		if (!res.ok) {
			if (err) {
				err.hidden = false;
				err.textContent = "Code invalide.";
			}
			return;
		}
		go("/parler");
	});
}

async function render() {
	if (!app) return;
	const route = path();
	document.body.classList.toggle("guichet", route === "/guichet");
	if (route === "/") {
		app.innerHTML = home();
	} else if (route === "/acte") {
		app.innerHTML = acte();
	} else if (route === "/parler") {
		const user = await session();
		app.innerHTML = parler(user);
		await wireParler(user);
	} else if (route === "/suivre") {
		app.innerHTML = suivre();
		wireSuivre();
	} else if (route === "/connexion") {
		app.innerHTML = connexion();
		wireConnexion();
	} else if (route === "/guichet") {
		app.innerHTML = html`
			<p class="kicker">Vue greffe — données fictives</p>
			<h1>Guichet</h1>
			<p class="lede">Aucun contrôle d'accès. Cette file n'existe que pour la démonstration.</p>
			<div id="desk"></div>
		`;
		const res = await fetch("/api/guichet/cases");
		const data = await res.json().catch(() => ({ cases: [] }));
		const desk = document.getElementById("desk");
		if (desk) desk.innerHTML = guichetTable(data.cases || []);
	} else if (route.startsWith("/d/")) {
		const code = route.slice(3).toUpperCase();
		app.innerHTML = html`<p class="kicker">Dossier</p><p>Chargement…</p>`;
		const res = await fetch(`/api/cases/${encodeURIComponent(code)}`);
		const data = await res.json().catch(() => ({}));
		app.innerHTML = res.ok
			? dossierView(data)
			: html`<h1>Code inconnu</h1><p>${esc(data.error || "")}</p>${suivre(code)}`;
		if (!res.ok) wireSuivre();
	} else {
		app.innerHTML = html`<h1>Page introuvable</h1><p><a class="act" href="/">Retour</a></p>`;
	}
}

window.addEventListener("popstate", () => void render());
void render();
