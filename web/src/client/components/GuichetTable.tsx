import type { GuichetRow } from "../lib/api";

const KIND_LABEL: Record<string, string> = {
	information: "Information",
	reclamation: "Réclamation",
	signalement: "Signalement",
	suggestion: "Suggestion",
};

const STATUS_LABEL: Record<string, string> = {
	recu: "Reçu",
	en_cours: "En cours",
	repondu: "Répondu",
};

export function GuichetTable({ rows }: { rows: GuichetRow[] }) {
	if (!rows.length) {
		return <p className="pv-empty">Aucune demande dans le registre pour le moment.</p>;
	}
	return (
		<div className="pv-register">
			<table>
				<caption className="pv-register__caption">Demandes récentes</caption>
				<thead>
					<tr>
						<th scope="col">Code de suivi</th>
						<th scope="col">Type</th>
						<th scope="col">Voie</th>
						<th scope="col">État</th>
						<th scope="col">Déposé</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={row.id}>
							<td>
								<a className="pv-register__code" href={`/d/${row.tracking_code}`}>{row.tracking_code}</a>
							</td>
							<td>{KIND_LABEL[row.kind] ?? row.kind}</td>
							<td>{row.channel === "identified" ? row.display_name || "Identifié" : "Anonyme"}</td>
							<td>
								<span className="pv-status" data-status={row.status}>{STATUS_LABEL[row.status] ?? row.status}</span>
							</td>
							<td>{new Date(row.created_at).toLocaleDateString("fr-FR")}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
