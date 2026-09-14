import { type ReactNode, type TextareaHTMLAttributes, type InputHTMLAttributes, forwardRef } from "react";

type FieldBase = {
	id: string;
	label: ReactNode;
	required?: boolean;
	hint?: ReactNode;
	className?: string;
};

type TextareaField = FieldBase & {
	kind: "textarea";
	meta?: ReactNode;
	metaId?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className">;

type InputField = FieldBase & {
	kind: "input";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">;

export const Field = forwardRef<HTMLTextAreaElement | HTMLInputElement, TextareaField | InputField>(function Field(props, ref) {
	const { id, label, required, hint, className, ...rest } = props;
	const cls = `pv-field${className ? ` ${className}` : ""}`;
	return (
		<div className={cls}>
			<label htmlFor={id}>
				{label} {required && <span className="pv-optional">(obligatoire)</span>}
			</label>
			{props.kind === "textarea" ? (
				<textarea id={id} ref={ref as React.Ref<HTMLTextAreaElement>} required={required} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
			) : (
				<input id={id} ref={ref as React.Ref<HTMLInputElement>} required={required} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
			)}
			{hint && <p className="pv-field__hint">{hint}</p>}
			{props.kind === "textarea" && props.meta && <div className="pv-field__meta" id={props.metaId}>{props.meta}</div>}
		</div>
	);
});
