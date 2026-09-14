import { type ReactNode } from "react";
import { IconSignOut, IconUser } from "./icons";

export type NavItem = {
	href: string;
	label: string;
	shortLabel?: string;
	current?: boolean;
};

export type AccountAction = {
	label: string;
	shortLabel?: string;
	href?: string;
	current?: boolean;
	busy?: boolean;
	onClick?: () => void;
};

type ServiceHeaderProps = {
	brandHref: string;
	brandLabel: string;
	brandSublabel?: string;
	brandMark?: ReactNode;
	nav: NavItem[];
	navLabel?: string;
	account?: AccountAction;
};

function NavLabel({ label, shortLabel }: { label: string; shortLabel?: string }) {
	if (!shortLabel || shortLabel === label) return <>{label}</>;
	return (
		<>
			<span className="pv-nav__long">{label}</span>
			<span className="pv-nav__short">{shortLabel}</span>
		</>
	);
}

export function ServiceHeader({
	brandHref,
	brandLabel,
	brandSublabel,
	brandMark,
	nav,
	navLabel = "Navigation principale",
	account,
}: ServiceHeaderProps) {
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
				<div className="pv-header__tools">
					<nav className="pv-nav" aria-label={navLabel}>
						{nav.map((item) => (
							<a key={item.href} href={item.href} aria-current={item.current ? "page" : undefined}>
								<NavLabel label={item.label} shortLabel={item.shortLabel} />
							</a>
						))}
					</nav>
					{account && (
						account.href ? (
							<a
								className="pv-header__account"
								href={account.href}
								aria-label={account.label}
								aria-current={account.current ? "page" : undefined}
							>
								<IconUser className="pv-header__account-icon" size={20} />
								<span className="pv-header__account-label">
									<NavLabel label={account.label} shortLabel={account.shortLabel} />
								</span>
							</a>
						) : (
							<button
								className="pv-header__account"
								type="button"
								aria-label={account.label}
								disabled={account.busy}
								onClick={account.onClick}
							>
								<IconSignOut className="pv-header__account-icon" size={20} />
								<span className="pv-header__account-label">
									<NavLabel label={account.label} shortLabel={account.shortLabel} />
								</span>
							</button>
						)
					)}
				</div>
			</div>
		</header>
	);
}
