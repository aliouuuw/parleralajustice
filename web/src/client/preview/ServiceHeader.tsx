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
	leave?: boolean;
	onClick?: () => void;
};

export type SessionBadge = {
	label: string;
	shortLabel?: string;
};

type ServiceHeaderProps = {
	brandHref: string;
	brandLabel: string;
	brandSublabel?: string;
	brandMark?: ReactNode;
	nav: NavItem[];
	navLabel?: string;
	session?: SessionBadge;
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

function AccountControl({ account }: { account: AccountAction }) {
	const Icon = account.leave || !account.href ? IconSignOut : IconUser;
	const inner = (
		<>
			<Icon className="pv-header__account-icon" size={20} />
			<span className="pv-header__account-label">
				<NavLabel label={account.label} shortLabel={account.shortLabel} />
			</span>
		</>
	);
	if (account.href) {
		return (
			<a
				className="pv-header__account"
				href={account.href}
				aria-label={account.label}
				aria-current={account.current ? "page" : undefined}
			>
				{inner}
			</a>
		);
	}
	return (
		<button
			className="pv-header__account"
			type="button"
			aria-label={account.label}
			disabled={account.busy}
			onClick={account.onClick}
		>
			{inner}
		</button>
	);
}

export function ServiceHeader({
	brandHref,
	brandLabel,
	brandSublabel,
	brandMark,
	nav,
	navLabel = "Navigation principale",
	session,
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
					{session && (
						<span className="pv-header__account pv-header__account--session">
							<IconUser className="pv-header__account-icon" size={20} />
							<span className="pv-header__account-label">
								<NavLabel label={session.label} shortLabel={session.shortLabel} />
							</span>
						</span>
					)}
					{account && <AccountControl account={account} />}
				</div>
			</div>
		</header>
	);
}
