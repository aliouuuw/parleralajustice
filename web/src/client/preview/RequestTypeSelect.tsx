import { ListBox, Select } from "@heroui/react";

export type RequestTypeName = string;

type Option = readonly [name: RequestTypeName, description: string];

export function RequestTypeSelect({
	id,
	options,
	value,
	onChange,
	invalid,
}: {
	id: string;
	options: readonly Option[];
	value: RequestTypeName | null;
	onChange: (name: RequestTypeName) => void;
	invalid?: boolean;
}) {
	return (
		<div className="pv-field pv-field--select" id={id} tabIndex={-1}>
			<label id={`${id}-label`} htmlFor={`${id}-trigger`}>
				Type de demande <span className="pv-optional">(obligatoire)</span>
			</label>
			<Select
				aria-labelledby={`${id}-label`}
				className="pv-request-type-select"
				data-invalid={invalid || undefined}
				fullWidth
				isInvalid={invalid}
				isRequired
				placeholder="Choisir un type…"
				selectedKey={value ?? null}
				onSelectionChange={(key) => {
					if (key != null) onChange(String(key));
				}}
			>
				<Select.Trigger className="pv-request-type-trigger" id={`${id}-trigger`}>
					<Select.Value className="pv-request-type-value" />
					<Select.Indicator className="pv-request-type-indicator" />
				</Select.Trigger>
				<Select.Popover className="pv-request-type-popover">
					<ListBox className="pv-request-type-list">
						{options.map(([name, description]) => (
							<ListBox.Item key={name} className="pv-request-type-item" id={name} textValue={name}>
								<div className="pv-request-type-option">
									<strong>{name}</strong>
									<span>{description}</span>
								</div>
							</ListBox.Item>
						))}
					</ListBox>
				</Select.Popover>
			</Select>
		</div>
	);
}
