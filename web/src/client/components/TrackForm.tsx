import { Button, Input, Label, TextField } from "@heroui/react";
import { useState } from "react";
import { navigate } from "../lib/router";

export function TrackForm({ prefill = "" }: { prefill?: string }) {
	const [code, setCode] = useState(prefill);

	function onSubmit(event: React.FormEvent) {
		event.preventDefault();
		navigate(`/d/${code.trim().toUpperCase()}`);
	}

	return (
		<form className="form-stack" onSubmit={onSubmit}>
			<TextField name="code" isRequired>
				<Label className="field-label">Code de suivi</Label>
				<Input
					value={code}
					onChange={(e) => setCode(e.target.value)}
					placeholder="PALJ-XXXX"
					aria-describedby="tracking-code-help"
					autoComplete="off"
					autoCapitalize="characters"
					spellCheck={false}
				/>
				<p className="field-help" id="tracking-code-help">Saisissez le code reçu après le dépôt, par exemple PALJ-XXXX.</p>
			</TextField>
			<div className="action-row">
				<Button className="button-primary" type="submit">Consulter le dossier</Button>
			</div>
		</form>
	);
}
