import React, { createContext, ReactElement, useEffect, useState } from "react";

type ThemeContextType = {
    theme: string;
    setTheme: (theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: "",
    setTheme: () => null,
});

export const ThemeProvider = ({ children }: { children: ReactElement }) => {
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        function loadTheme() {
            const theme = localStorage.getItem("theme");
            return theme || "light";
        }
        setTheme(loadTheme());
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
