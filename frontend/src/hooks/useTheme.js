import { useEffect, useState } from "react";
export function useTheme() {
    const [theme, setTheme] = useState(() => {
        return (localStorage.getItem("aquasentinel-theme") || "dark");
    });
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        }
        else {
            root.classList.remove("dark");
        }
        localStorage.setItem("aquasentinel-theme", theme);
    }, [theme]);
    return { theme, setTheme };
}
