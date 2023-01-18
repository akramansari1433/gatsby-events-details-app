import React, { createContext, ReactElement, useState } from "react";

type CustomerType = {
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

const demoCustomer = {
    customerId: "e712cc75-967f-4ad8-bbd4-82eb1e426152",
    customerName: "Koons",
    host: "https://www.koons.com/",
    endpoints: [
        {
            endpointId: "ce0534f4-c2aa-4a16-bcfc-d8c2d43b8529",
            endpoint:
                "https://lingering-haze-67b1.star-lord.workers.dev/api/users",
            headers: [
                { key: "Authorization", value: "ABC" },
                { key: "Agent", value: "XYZ" },
            ],
            retryConfig: {
                numberOfRetries: 3,
                retryInterval: 10000,
                timeout: 20000,
            },
        },
        {
            endpointId: "5450ac1c-2946-4d27-b4a5-784b0f26cead",
            endpoint: "https://data.sync-machine.workers.dev/api/users",
            headers: [
                { key: "Authorization", value: "ABC" },
                { key: "Agent", value: "XYZ" },
                { key: "Allow-Access-Control-Origin", value: "*" },
            ],
            retryConfig: {
                numberOfRetries: 3,
                retryInterval: 10000,
                timeout: 20000,
            },
        },
    ],
};

export const CustomerContext = createContext<CustomerType[]>([]);

export const CustomerProvider = ({ children }: { children: ReactElement }) => {
    const [customers, setCustomers] = useState<CustomerType[]>([demoCustomer]);
    return (
        <CustomerContext.Provider value={customers}>
            {children}
        </CustomerContext.Provider>
    );
};
