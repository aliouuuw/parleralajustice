import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

function currentPath(): string {
	return location.pathname.replace(/\/+$/, "") || "/";
}

type RouterValue = {
	path: string;
	navigate: (href: string) => void;
};

const RouterContext = createContext<RouterValue | null>(null);

export function navigate(href: string): void {
	history.pushState({}, "", href);
	window.dispatchEvent(new PopStateEvent("popstate"));
}

export function RouterProvider({ children }: { children: ReactNode }) {
	const [path, setPath] = useState(currentPath());

	useEffect(() => {
		const onPopState = () => setPath(currentPath());
		window.addEventListener("popstate", onPopState);
		return () => window.removeEventListener("popstate", onPopState);
	}, []);

	useEffect(() => {
		const onClick = (event: MouseEvent) => {
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.defaultPrevented) return;
			const target = event.target;
			const link = target instanceof Element ? target.closest("a[href^='/']") : null;
			if (!link) return;
			const href = link.getAttribute("href");
			if (!href || href.startsWith("//")) return;
			event.preventDefault();
			navigate(href);
		};
		document.addEventListener("click", onClick);
		return () => document.removeEventListener("click", onClick);
	}, []);

	return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function useRoute(): RouterValue {
	const ctx = useContext(RouterContext);
	if (!ctx) throw new Error("useRoute must be used within a RouterProvider");
	return ctx;
}
