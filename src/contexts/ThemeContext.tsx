import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextData {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const storageValue = localStorage.getItem("theme");
        if (storageValue) {
            return JSON.parse(storageValue);
        }
        localStorage.setItem("theme", "dark");
        return "dark";
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", JSON.stringify(newTheme));
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
