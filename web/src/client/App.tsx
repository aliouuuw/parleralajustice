import { RouterProvider, useRoute } from "./lib/router";
import { Acte } from "./pages/Acte";
import { Connexion } from "./pages/Connexion";
import { Guichet } from "./pages/Guichet";
import { NotFound } from "./pages/NotFound";
import { Preview, PreviewSuivre } from "./preview/Preview";
import { SiteChrome, type SiteSection } from "./preview/SiteChrome";

function Routes() {
	const { path } = useRoute();

	if (path === "/acte") return <Acte />;
	if (path === "/connexion") return <Connexion />;
	if (path === "/guichet") return <Guichet />;
	return <NotFound />;
}

function sectionFromPath(path: string): SiteSection {
	if (path === "/acte") return "acte";
	if (path === "/connexion") return "connexion";
	if (path === "/guichet") return "guichet";
	return "other";
}

function Layout() {
	const { path } = useRoute();
	return (
		<SiteChrome current={sectionFromPath(path)}>
			<main id="main-content" tabIndex={-1}>
				<Routes />
			</main>
		</SiteChrome>
	);
}

function Shell() {
	const { path } = useRoute();
	if (path === "/" || path === "/parler") return <Preview />;
	if (path === "/suivre" || path.startsWith("/d/")) return <PreviewSuivre />;
	return <Layout />;
}

export function App() {
	return (
		<RouterProvider>
			<Shell />
		</RouterProvider>
	);
}
