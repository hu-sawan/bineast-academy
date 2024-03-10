import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextData {
    theme: Theme;
    isSmallScreen: boolean;
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
    const [isSmallScreen, setIsSmall] = useState<boolean>(false);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", JSON.stringify(newTheme));
            return newTheme;
        });
    };

    useEffect(() => {
        const checkIfSmallScreen = () => {
            if (window.innerWidth <= 640) {
                setIsSmall(true);
            } else {
                setIsSmall(false);
            }
        };

        checkIfSmallScreen();

        window.addEventListener("resize", checkIfSmallScreen);

        return () => {
            window.removeEventListener("resize", checkIfSmallScreen);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, isSmallScreen, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
