import React, { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Layout";
import { CustomerProvider } from "../context/customer-context";

const queryClient = new QueryClient();

const RootElement = ({ children }: { children: ReactElement }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <CustomerProvider>
                <Layout>{children}</Layout>
            </CustomerProvider>
        </QueryClientProvider>
    );
};
export default RootElement;
