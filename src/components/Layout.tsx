import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <div className="flex flex-row">
                <Navigation />
                <div className="max-w-7xl w-4/5 px-5">{children}</div>
            </div>
        </>
    );
}
