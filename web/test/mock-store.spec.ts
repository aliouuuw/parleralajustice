import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { mintCode, tabForStatus, NEXT_STATUS, SAMPLE_CODE } from "../src/client/lib/mock-store";
import { Guichet } from "../src/client/pages/Guichet";
import { Connexion } from "../src/client/pages/Connexion";
import { SiteChrome } from "../src/client/preview/SiteChrome";

describe("mock store", () => {
	it("mints a PALJ reference", () => {
		expect(mintCode(() => 0)).toMatch(/^PALJ-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
	});

	it("buckets statuses into three files", () => {
		expect(tabForStatus("Reçue")).toBe("file");
		expect(tabForStatus("En cours de traitement")).toBe("progress");
		expect(tabForStatus("Clôturée")).toBe("closed");
	});

	it("only allows forward status moves", () => {
		expect(NEXT_STATUS.Reçue).toEqual(["Assignée"]);
		expect(NEXT_STATUS.Clôturée).toEqual([]);
	});
});

describe("greffe desk", () => {
	it("opens on horizontal files, without a sidebar", () => {
		const markup = renderToStaticMarkup(createElement(Guichet));
		expect(markup).toContain("Demandes à traiter");
		expect(markup).toContain("Session ouverte");
		expect(markup).toContain('role="tablist"');
		expect(markup).toContain("File");
		expect(markup).toContain("En cours");
		expect(markup).toContain("Clos");
		expect(markup).toContain(SAMPLE_CODE);
		expect(markup).toContain("pv-greffe__board");
		expect(markup).toContain('aria-expanded="false"');
		expect(markup).not.toContain("pv-rail");
		expect(markup).not.toContain("Registre des demandes");
	});

	it("offers a greffe tour from connexion", () => {
		const markup = renderToStaticMarkup(createElement(Connexion));
		expect(markup).toContain("Entrer au greffe");
		expect(markup).toContain('href="/guichet"');
	});

	it("shows a connected greffe session, not a citizen footer", () => {
		const markup = renderToStaticMarkup(createElement(SiteChrome, { current: "guichet" }, createElement("main", null, "desk")));
		expect(markup).toContain("Sunu Justice");
		expect(markup).toContain("Awa Ndiaye, agent");
		expect(markup).toContain("Session greffe");
		expect(markup).toContain("Quitter le greffe");
		expect(markup).toContain("Espace citoyen");
		expect(markup).not.toContain("Déposer une demande");
		expect(markup).not.toContain("Retour aux parcours");
	});
});
