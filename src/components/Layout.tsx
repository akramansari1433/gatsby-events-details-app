import React from "react";
import Header from "./Header";

type LayoutProps = {
   children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
   return (
      <>
         <Header />
         <div className="max-w-7xl mx-auto">{children}</div>
      </>
   );
}
