import React, { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Layout";
import { CustomerProvider } from "../contexts/customer-context";
import { ThemeProvider } from "../contexts/theme-context";

const queryClient = new QueryClient();

const RootElement = ({ children }: { children: ReactElement }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <CustomerProvider>
                    <Layout>{children}</Layout>
                </CustomerProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};
export default RootElement;
