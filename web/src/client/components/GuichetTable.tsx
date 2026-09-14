import { Table } from "@heroui/react";
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
	if (!rows.length) return <p className="empty-state">Aucune demande dans le registre pour le moment.</p>;
	return (
		<div className="register-table">
			<Table>
				<Table.ScrollContainer>
					<Table.Content aria-label="Registre des demandes de démonstration">
						<Table.Header>
							<Table.Column isRowHeader>Code de suivi</Table.Column>
							<Table.Column>Type</Table.Column>
							<Table.Column>Voie</Table.Column>
							<Table.Column>État</Table.Column>
							<Table.Column>Déposé</Table.Column>
						</Table.Header>
						<Table.Body>
							{rows.map((row) => (
								<Table.Row key={row.id}>
									<Table.Cell>
										<a className="text-link ticket-code" href={`/d/${row.tracking_code}`}>
											{row.tracking_code}
										</a>
									</Table.Cell>
									<Table.Cell>{KIND_LABEL[row.kind] ?? row.kind}</Table.Cell>
									<Table.Cell>{row.channel === "identified" ? row.display_name || "Identifié" : "Anonyme"}</Table.Cell>
									<Table.Cell>
										<span className="status-label" data-status={row.status}>{STATUS_LABEL[row.status] ?? row.status}</span>
									</Table.Cell>
									<Table.Cell>{new Date(row.created_at).toLocaleDateString("fr-SN")}</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Content>
				</Table.ScrollContainer>
			</Table>
		</div>
	);
}
