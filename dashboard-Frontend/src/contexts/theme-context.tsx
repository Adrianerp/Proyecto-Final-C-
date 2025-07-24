import { createContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}

const initialState: ThemeContextType = {
    theme: "system",
    setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeContextType>(initialState);

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: string;
    storageKey?: string;
}

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState(() => localStorage.getItem(storageKey) || defaultTheme);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
    }, [theme]);

    const value: ThemeContextType = {
        theme,
        setTheme: (newTheme: string) => {
            localStorage.setItem(storageKey, newTheme);
            setThemeState(newTheme);
        },
    };

    return (
        <ThemeProviderContext.Provider value={value} {...props}>
            {children}
        </ThemeProviderContext.Provider>
    );
}
