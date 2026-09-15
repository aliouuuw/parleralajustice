import { useEffect, useState } from "react";
import {
	listDossiers,
	setDossierStatus,
	tabForStatus,
	NEXT_STATUS,
	MOCK_CHANGE,
	type MockDossier,
	type MockStatus,
	type MockTab,
} from "../lib/mock-store";
import { Button } from "../preview/Button";

const TABS: { id: MockTab; label: string }[] = [
	{ id: "file", label: "File" },
	{ id: "progress", label: "En cours" },
	{ id: "closed", label: "Clos" },
];

function formatDay(at: number): string {
	return new Date(at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export function Guichet() {
	const [tab, setTab] = useState<MockTab>("file");
	const [openCode, setOpenCode] = useState<string | null>(null);
	const [rows, setRows] = useState<MockDossier[]>(() => listDossiers());

	useEffect(() => {
		const refresh = () => setRows(listDossiers());
		window.addEventListener(MOCK_CHANGE, refresh);
		window.addEventListener("storage", refresh);
		return () => {
			window.removeEventListener(MOCK_CHANGE, refresh);
			window.removeEventListener("storage", refresh);
		};
	}, []);

	const visible = rows.filter((row) => tabForStatus(row.status) === tab);
	const open = openCode ? rows.find((row) => row.trackingCode === openCode) ?? null : null;

	function openRow(code: string) {
		if (openCode === code) {
			setOpenCode(null);
			return;
		}
		setOpenCode(code);
		const row = rows.find((item) => item.trackingCode === code);
		if (row) setTab(tabForStatus(row.status));
		requestAnimationFrame(() => document.getElementById("greffe-dossier")?.focus());
	}

	function applyStatus(status: MockStatus) {
		if (!open) return;
		const next = setDossierStatus(open.trackingCode, status);
		if (!next) return;
		setRows(listDossiers());
		setTab(tabForStatus(next.status));
	}

	return (
		<section className="pv-greffe" aria-labelledby="greffe-title">
			<div className="pv-container">
				<header className="pv-greffe__head">
					<p className="pv-greffe__kicker">Session ouverte</p>
					<h1 id="greffe-title">Demandes à traiter</h1>
					<p className="pv-lede">Sélectionnez une ligne. Un second clic referme le dossier.</p>
				</header>

				<div className="pv-tabs" role="tablist" aria-label="Files du greffe">
					{TABS.map((item) => {
						const count = rows.filter((row) => tabForStatus(row.status) === item.id).length;
						const selected = tab === item.id;
						return (
							<button
								key={item.id}
								type="button"
								role="tab"
								id={`greffe-tab-${item.id}`}
								aria-selected={selected}
								aria-controls={`greffe-panel-${item.id}`}
								tabIndex={selected ? 0 : -1}
								onClick={() => setTab(item.id)}
							>
								{item.label}
								<span className="pv-tabs__count">{count}</span>
							</button>
						);
					})}
				</div>

				<div className="pv-greffe__board">
				<div
					className="pv-file"
					role="tabpanel"
					id={`greffe-panel-${tab}`}
					aria-labelledby={`greffe-tab-${tab}`}
				>
					{visible.length === 0 ? (
						<p className="pv-empty">Aucune demande dans cette file.</p>
					) : (
						<ul className="pv-file__list">
							{visible.map((row) => {
								const current = row.trackingCode === openCode;
								return (
									<li key={row.trackingCode}>
										<button
											type="button"
											className="pv-file__row"
											aria-expanded={current}
											aria-controls={current ? "greffe-dossier" : undefined}
											onClick={() => openRow(row.trackingCode)}
										>
											<strong className="pv-code">{row.trackingCode}</strong>
											<span>{row.typeLabel}</span>
											<span>{row.status}</span>
											<time dateTime={new Date(row.createdAt).toISOString()}>{formatDay(row.createdAt)}</time>
										</button>
									</li>
								);
							})}
						</ul>
					)}
				</div>

				{open ? (
					<article className="pv-greffe__dossier" id="greffe-dossier" tabIndex={-1} aria-labelledby="greffe-dossier-title">
						<header>
							<p>Dossier</p>
							<h2 id="greffe-dossier-title" className="pv-code">{open.trackingCode}</h2>
							<dl className="pv-dossier__meta">
								<dt>Type</dt><dd>{open.typeLabel}</dd>
								<dt>Déposé le</dt><dd>{new Date(open.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}</dd>
								<dt>Voie</dt><dd>{open.channel === "identified" ? "Compte" : "Sans compte"}</dd>
							</dl>
						</header>
						<div className="pv-dossier__status" data-state={tabForStatus(open.status) === "progress" ? "progress" : "waiting"}>
							<p>Statut actuel</p>
							<h3>{open.status}</h3>
							<p className="pv-dossier__ask">{open.body}</p>
							{open.place ? <p className="pv-dossier__ask"><strong>Lieu</strong>{open.place}</p> : null}
							{open.hasVoice ? <p className="pv-dossier__ask">Message vocal joint sur l'appareil du déposant.</p> : null}
						</div>
						{NEXT_STATUS[open.status].length > 0 && (
							<div className="pv-greffe__actions">
								<p>Mettre à jour</p>
								<div>
									{NEXT_STATUS[open.status].map((status) => (
										<Button key={status} variant="secondary" type="button" onClick={() => applyStatus(status)}>
											{status}
										</Button>
									))}
								</div>
							</div>
						)}
						<ol className="pv-history" aria-label="Historique du dossier">
							{open.events.map((event, index) => (
								<li key={event.id} data-status={index === open.events.length - 1 ? "active" : "complete"}>
									<span />
									<div>
										<strong>{event.label}</strong>
										<time>{new Date(event.at).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</time>
									</div>
								</li>
							))}
						</ol>
					</article>
				) : (
					<p className="pv-greffe__idle">Sélectionnez une demande pour l'ouvrir.</p>
				)}
				</div>
			</div>
		</section>
	);
}
