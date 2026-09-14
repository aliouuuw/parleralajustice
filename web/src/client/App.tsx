import { DisclaimerBanner } from "./components/DisclaimerBanner";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { RouterProvider, useRoute } from "./lib/router";
import { Acte } from "./pages/Acte";
import { Connexion } from "./pages/Connexion";
import { Dossier } from "./pages/Dossier";
import { Guichet } from "./pages/Guichet";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Suivre } from "./pages/Suivre";
import { Preview } from "./preview/Preview";

function Routes() {
	const { path } = useRoute();

	if (path === "/" || path === "/parler") return <Home />;
	if (path === "/acte") return <Acte />;
	if (path === "/suivre") return <Suivre />;
	if (path === "/connexion") return <Connexion />;
	if (path === "/guichet") return <Guichet />;
	if (path.startsWith("/d/")) return <Dossier code={path.slice(3).toUpperCase()} />;
	return <NotFound />;
}

function Layout() {
	const { path } = useRoute();
	const isHome = path === "/" || path === "/parler";

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
			<main id="app" tabIndex={-1} className={`site-container main-content ${isHome ? "main-intake" : "main-service"}`}>
				<Routes />
			</main>
			<Footer />
		</div>
	);
}

function Shell() {
	const { path } = useRoute();
	if (path === "/preview") return <Preview />;
	return <Layout />;
}

export function App() {
	return (
		<RouterProvider>
			<Shell />
		</RouterProvider>
	);
}
