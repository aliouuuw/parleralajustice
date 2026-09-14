import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "quiet";

export function Arrow() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

type CommonProps = {
	variant?: ButtonVariant;
	arrow?: boolean;
	children: ReactNode;
};

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, AsButton | AsAnchor>(function Button(props, ref) {
	const { variant = "primary", arrow = false, children, className, ...rest } = props;
	const cls = `pv-button pv-button--${variant}${className ? ` ${className}` : ""}`;
	const content = (
		<>
			{children}
			{arrow && <Arrow />}
		</>
	);
	if ("href" in props && props.href !== undefined) {
		const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
		return (
			<a ref={ref as React.Ref<HTMLAnchorElement>} className={cls} href={href} {...anchorRest}>
				{content}
			</a>
		);
	}
	return (
		<button ref={ref as React.Ref<HTMLButtonElement>} className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
			{content}
		</button>
	);
});
