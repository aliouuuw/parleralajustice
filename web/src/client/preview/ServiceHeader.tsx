import { type ReactNode } from "react";

export type NavItem = {
	href: string;
	label: string;
	current?: boolean;
};

type ServiceHeaderProps = {
	brandHref: string;
	brandLabel: string;
	brandSublabel?: string;
	brandMark?: ReactNode;
	nav: NavItem[];
	navLabel?: string;
};

export function ServiceHeader({ brandHref, brandLabel, brandSublabel, brandMark, nav, navLabel = "Navigation principale" }: ServiceHeaderProps) {
	return (
		<header className="pv-header">
			<div className="pv-container pv-header__inner">
				<a className="pv-brand" href={brandHref} aria-label={`${brandLabel}, accueil`}>
					{brandMark && <span className="pv-brand__mark" aria-hidden="true">{brandMark}</span>}
					<span>
						<strong>{brandLabel}</strong>
						{brandSublabel && <small>{brandSublabel}</small>}
					</span>
				</a>
				<nav className="pv-nav" aria-label={navLabel}>
					{nav.map((item) => (
						<a key={item.href} href={item.href} aria-current={item.current ? "page" : undefined}>{item.label}</a>
					))}
				</nav>
			</div>
		</header>
	);
}
