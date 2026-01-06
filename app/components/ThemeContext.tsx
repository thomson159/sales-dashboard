import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "app-theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [theme, setThemeState] = useState<Theme>("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme | null;
		if (savedTheme) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setThemeState(savedTheme);
		} else {
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			setThemeState(prefersDark ? "dark" : "light");
		}
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem(LOCAL_STORAGE_KEY, theme);
	}, [theme]);

	const setTheme = (newTheme: Theme) => setThemeState(newTheme);
	const toggleTheme = () => setThemeState(prev => (prev === "light" ? "dark" : "light"));

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
};
