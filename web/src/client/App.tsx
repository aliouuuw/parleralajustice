import { DisclaimerBanner } from "./components/DisclaimerBanner";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { RouterProvider, useRoute } from "./lib/router";
import { Acte } from "./pages/Acte";
import { Connexion } from "./pages/Connexion";
import { Guichet } from "./pages/Guichet";
import { NotFound } from "./pages/NotFound";
import { Preview, PreviewSuivre } from "./preview/Preview";

function Routes() {
	const { path } = useRoute();

	if (path === "/acte") return <Acte />;
	if (path === "/connexion") return <Connexion />;
	if (path === "/guichet") return <Guichet />;
	return <NotFound />;
}

function Layout() {
	return (
		<div className="app-shell flex min-h-dvh flex-col bg-background">
			<a
				className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-10 focus:bg-warning focus:px-3 focus:py-2"
				href="#app"
			>
				Aller au contenu
			</a>
			<DisclaimerBanner />
			<Header />
			<main id="app" tabIndex={-1} className="site-container main-content main-service">
				<Routes />
			</main>
			<Footer />
		</div>
	);
}

function Shell() {
	const { path } = useRoute();
	if (path === "/" || path === "/parler" || path === "/preview") return <Preview />;
	if (path === "/suivre" || path === "/preview/suivre" || path.startsWith("/d/")) return <PreviewSuivre />;
	return <Layout />;
}

export function App() {
	return (
		<RouterProvider>
			<Shell />
		</RouterProvider>
	);
}
