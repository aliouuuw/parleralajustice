import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CaseForm } from "../src/client/components/CaseForm";

const render = (disabled = false) => renderToStaticMarkup(createElement(CaseForm, { identified: false, disabled }));

describe("two-stage intake", () => {
	it("starts with the message, not the submission controls", () => {
		const html = render();
		expect(html).toContain("Que souhaitez-vous nous dire ?");
		expect(html).toContain("Continuer");
		expect(html).not.toContain('name="kind"');
		expect(html).not.toContain('name="demo"');
		expect(html).not.toContain("Déposer et recevoir mon code");
	});

	it("keeps text requirements and optional audio on the writing stage", () => {
		const html = render();
		expect(html).toMatch(/<textarea[^>]*required=""/);
		expect(html).toContain('minLength="12"');
		expect(html).toContain('maxLength="4000"');
		expect(html).toContain("Message vocal");
		expect(html).toContain('aria-current="step"');
	});

	it("blocks progression while the session is unresolved", () => {
		expect(render(true)).toMatch(/<button[^>]*disabled=""[^>]*>Continuer/);
	});
});
