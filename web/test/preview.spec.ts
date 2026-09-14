import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Preview } from "../src/client/preview/Preview";

const html = () => renderToStaticMarkup(createElement(Preview));

describe("preview intake", () => {
	it("opens on the writing question, without a tracking code or acts door", () => {
		const markup = html();
		expect(markup).toContain("Que souhaitez");
		expect(markup).toContain("Continuer");
		expect(markup).toContain("Prototype indépendant");
		expect(markup).not.toContain("Obtenir un acte");
		expect(markup).not.toContain("Service aux citoyens");
		expect(markup).not.toContain("Exemple de confirmation");
		expect(markup).not.toMatch(/PALJ-[A-Z0-9]{4}-[A-Z0-9]{4}/);
		expect(markup).not.toContain("Simuler le dépôt");
	});

	it("runs the hero as three scenes with a pause control, first scene shown", () => {
		const markup = html();
		expect(markup.match(/<img[^>]*src="\/images\/hero\//g)).toHaveLength(3);
		expect(markup).not.toContain("atelier");
		expect(markup.match(/<img[^>]*data-active="true"/g)).toHaveLength(1);
		expect(markup).toContain("Mettre le diaporama en pause");
		expect(markup).toContain("Avant de commencer");
	});

	it("keeps text required and voice as a specimen on the writing stage", () => {
		const markup = html();
		expect(markup).toMatch(/<textarea[^>]*required=""/);
		expect(markup).toContain("Message vocal");
		expect(markup).toContain("Aperçu du microphone");
		expect(markup).toContain('aria-current="step"');
	});
});
