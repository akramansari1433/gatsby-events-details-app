import React, { createContext, ReactElement, useEffect, useState } from "react";

type ThemeContextType = {
    theme: string | null;
    setTheme: (theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: "",
    setTheme: () => null,
});

export const ThemeProvider = ({ children }: { children: ReactElement }) => {
    const [theme, setTheme] = useState<string | null>(
        window.localStorage.hasOwnProperty("theme")
            ? window.localStorage.getItem("theme")
            : "light"
    );

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
