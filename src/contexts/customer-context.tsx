import React, { createContext, ReactElement, useEffect, useState } from "react";

export type CustomerType = {
    customerId: string;
    customerName: string;
    host: string;
    endpoints: {
        endpointId: string;
        endpoint: string;
        headers: { key: string; value: string }[];
        retryConfig: {
            numberOfRetries: number;
            retryInterval: number;
            timeout: number;
        };
    }[];
};

type CustomerContextType = {
    customers: CustomerType[];
    setCustomers: (customers: CustomerType[]) => void;
};

export const CustomerContext = createContext<CustomerContextType>({
    customers: [],
    setCustomers: () => null,
});

export const CustomerProvider = ({ children }: { children: ReactElement }) => {
    const [customers, setCustomers] = useState<CustomerType[]>([]);

    const getCustomers = async () => {
        const response: CustomerType[] = await fetch(
            "https://workers-middleware.akramansari1433.workers.dev/customers"
        ).then((res) => res.json());
        if (response) setCustomers(response);
    };

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <CustomerContext.Provider value={{ customers, setCustomers }}>
            {children}
        </CustomerContext.Provider>
    );
};
