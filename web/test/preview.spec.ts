import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Preview, PreviewSuivre, SAMPLE_CODE, normalizeReference } from "../src/client/preview/Preview";

const html = () => renderToStaticMarkup(createElement(Preview));

describe("preview intake", () => {
	it("opens on the writing question, without a tracking code or acts door", () => {
		const markup = html();
		expect(markup).toContain("Que souhaitez");
		expect(markup).toContain("Continuer");
		expect(markup).toContain("Prototype indépendant");
		expect(markup).toContain('href="/acte"');
		expect(markup).toContain("Obtenir un acte");
		expect(markup).toContain("Connexion démo");
		expect(markup).not.toContain("Service aux citoyens");
		expect(markup).not.toContain("Exemple de confirmation");
		expect(markup).not.toMatch(/PALJ-[A-Z0-9]{4}-[A-Z0-9]{4}/);
		expect(markup).not.toContain("Simuler le dépôt");
	});

	it("runs the hero as three scenes without reusing channel illustrations", () => {
		const markup = html();
		expect((markup.match(/src="\/images\/hero\/ecrire-1280.webp"/g) || []).length).toBe(1);
		expect((markup.match(/src="\/images\/hero\/parler-1280.webp"/g) || []).length).toBe(1);
		expect((markup.match(/src="\/images\/hero\/noter-1280.webp"/g) || []).length).toBe(1);
		expect(markup).not.toContain("atelier-1280.webp");
		expect(markup.match(/<img[^>]*data-active="true"/g)).toHaveLength(1);
		expect(markup).toContain("Noter la référence");
		expect(markup).not.toContain("Mettre le diaporama en pause");
		expect(markup).toContain("À retenir");
	});

	it("offers two live channels and lists the published codes without simulating them", () => {
		const markup = html();
		const channels = markup.match(/<section class="pv-channels"[\s\S]*?<\/section>/)?.[0] ?? "";
		expect(channels.match(/<button /g)).toHaveLength(2);
		expect(channels).toContain("Commencer à écrire");
		expect(channels).toContain("Essayer le vocal");
		expect(channels).toContain("Un texte reste nécessaire. La voix le complète. Rien n’est transmis.");
		expect(channels).toContain("Animation illustrative, micro inactif.");
		expect(channels).not.toMatch(/<img|pv-channel-map|pv-channel-tile|envoyer/);
		expect(markup).toContain("Autres canaux annoncés");
		expect(markup).toContain("3737");
		expect(markup).toContain("*711#");
		expect(markup).toContain("Un agent vous répond");
		expect(markup).toContain("wolof");
		expect(markup).toContain("demandes suivies (fictif)");
		expect(markup).not.toContain("Sécurité et confidentialité");
		expect(markup).not.toContain("Ce que montre cet aperçu");
		expect(markup).not.toContain("Anonymat possible");
		expect(markup).not.toContain("Chiffrement end-to-end");
		const soon = markup.slice(markup.indexOf("Autres canaux annoncés"), markup.indexOf("Notre impact"));
		expect(soon).not.toMatch(/<button/);
	});

	it("keeps text required and voice as a specimen on the writing stage", () => {
		const markup = html();
		expect(markup).toMatch(/<textarea[^>]*required=""/);
		expect(markup).toContain("Message vocal");
		expect(markup).toContain(">Enregistrer<");
		expect(markup).toContain('aria-current="step"');
		expect(markup).not.toContain("Le texte reste obligatoire");
	});

	it("lists the categories of the live platform", () => {
		const markup = html();
		expect(markup).toContain("Difficulté rencontrée");
		expect(markup).toContain("Autre");
		expect(markup).not.toContain("Contestation");
		expect(markup).toContain("Types de demandes");
		expect(markup).not.toContain("Six types");
	});

	it("starts on step 1 without the review or receipt UI", () => {
		const markup = html();
		expect(markup).toContain("Relire et confirmer");
		expect(markup).not.toContain("Confirmer le dépôt fictif");
		expect(markup).not.toContain("Exemple de confirmation");
	});
});

describe("preview tracking", () => {
	it("accepts the reference typed loosely and rejects other codes", () => {
		expect(normalizeReference(" palj 7k4m 2qx9 ")).toBe(SAMPLE_CODE);
		expect(normalizeReference("PALJ7K4M2QX9")).toBe(SAMPLE_CODE);
		expect(normalizeReference("ALJ-2025-0001")).not.toBe(SAMPLE_CODE);
	});

	it("opens on the lookup, with no dossier shown before a search", () => {
		const markup = renderToStaticMarkup(createElement(PreviewSuivre));
		expect(markup).toContain("Suivre un dossier");
		expect(markup).toContain("Référence de suivi");
		expect(markup).toContain('aria-current="page"');
		expect(markup).not.toContain("Dossier fictif");
	});
});
