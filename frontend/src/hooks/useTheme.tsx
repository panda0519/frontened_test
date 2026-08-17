import { useEffect, useState } from "react";

export function useTheme() {
	const [theme, setTheme] = useState<"light" | "dark">(() => {
		return (
			(localStorage.getItem("aquasentinel-theme") as "light" | "dark") || "dark"
		);
	});

	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
		localStorage.setItem("aquasentinel-theme", theme);
	}, [theme]);

	return { theme, setTheme };
}
