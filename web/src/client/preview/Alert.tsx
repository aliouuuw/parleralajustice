import { type ReactNode, forwardRef } from "react";

export type AlertItem = {
	href: string;
	label: string;
	onNavigate?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

type ErrorSummaryProps = {
	id: string;
	title: string;
	items: AlertItem[];
};

export const ErrorSummary = forwardRef<HTMLDivElement, ErrorSummaryProps>(function ErrorSummary({ id, title, items }, ref) {
	return (
		<div className="pv-error-summary" ref={ref} id={id} role="alert" tabIndex={-1}>
			<strong>{title}</strong>
			<ul>
				{items.map((item) => (
					<li key={item.href}>
						<a href={item.href} onClick={item.onNavigate}>{item.label}</a>
					</li>
				))}
			</ul>
		</div>
	);
});

type InlineErrorProps = {
	id: string;
	children: ReactNode;
	className?: string;
};

export function InlineError({ id, children, className }: InlineErrorProps) {
	const cls = `pv-lookup__error${className ? ` ${className}` : ""}`;
	return (
		<p className={cls} id={id} role="alert">{children}</p>
	);
}
