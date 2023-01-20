import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useContext, useState } from "react";
import { CustomerContext, CustomerType } from "../contexts/customer-context";

interface ObjectKeyString {
    [key: string]: any;
}

type EndpointType = {
    endpoint: string;
    headers: ObjectKeyString[];
    retryConfig: ObjectKeyString;
};

type NewCustomerType = {
    customerName: string;
    host: string;
    endpoints: EndpointType[];
};

export default function AddCustomer() {
    const emptyHeader = {
        key: "",
        value: "",
    };
    const emptyEndpoint = {
        endpoint: "",
        headers: [{ key: "", value: "" }],
        retryConfig: {
            retryInterval: 0,
            timeout: 0,
            numberOfRetries: 0,
        },
    };

    const emptyCustomer: NewCustomerType = {
        customerName: "",
        host: "",
        endpoints: [
            {
                endpoint: "",
                headers: [{ key: "", value: "" }],
                retryConfig: {
                    retryInterval: 0,
                    timeout: 0,
                    numberOfRetries: 0,
                },
            },
        ],
    };
    const [customer, setCustomer] = useState<NewCustomerType>(emptyCustomer);
    const { customers, setCustomers } = useContext(CustomerContext);

    const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleEndpointChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        i: number
    ) => {
        const tempEndpoints: EndpointType[] = customer.endpoints;
        tempEndpoints[i].endpoint = e.target.value;
        setCustomer((prev) => ({ ...prev, endpoints: tempEndpoints }));
    };

    const handleRetryConfigChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        i: number
    ) => {
        const tempEndpoints: EndpointType[] = customer.endpoints;
        tempEndpoints[i].retryConfig[e.target.id] = Number(e.target.value);
        setCustomer((prev) => ({ ...prev, endpoints: tempEndpoints }));
    };

    const handleHeadersChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        endpointIndex: number,
        headerIndex: number
    ) => {
        const tempEndpoints: EndpointType[] = customer.endpoints;
        tempEndpoints[endpointIndex].headers[headerIndex][e.target.id] =
            e.target.value;
        setCustomer((prev) => ({ ...prev, endpoints: tempEndpoints }));
    };

    const addNewHeader = (i: number) => {
        let tempEndpoint: EndpointType[] = customer.endpoints;
        tempEndpoint[i].headers.push(emptyHeader);
        setCustomer((prev) => ({ ...prev, endpoints: tempEndpoint }));
    };

    const addEndpoint = () => {
        setCustomer((prev) => ({
            ...prev,
            endpoints: [...prev.endpoints].concat(emptyEndpoint),
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response: { customerData: CustomerType; message: string } =
                await fetch(
                    `https://workers-middleware.akramansari1433.workers.dev/createCustomer`,
                    {
                        method: "POST",
                        body: JSON.stringify(customer),
                    }
                ).then((res) => res.json());

            if (response) {
                setCustomers([...customers, response.customerData]);
                alert(response.message);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl">Add new customer</h1>
            <form onSubmit={handleSubmit} className="my-5 w-auto md:w-96">
                <div className="my-2 w-full flex justify-between">
                    <label
                        htmlFor="customerName"
                        className="text-lg font-semibold"
                    >
                        Name
                    </label>
                    <input
                        id="customerName"
                        className="ml-3 p-1 rounded-md border-2 border-accent bg-secondary"
                        onChange={(e) => handleCustomerChange(e)}
                    />
                </div>
                <div className="my-2 w-full flex justify-between">
                    <label htmlFor="host" className="text-lg font-semibold">
                        Hostname
                    </label>
                    <input
                        id="host"
                        className="ml-3 p-1 rounded-md border-2 border-accent bg-secondary"
                        onChange={(e) => handleCustomerChange(e)}
                    />
                </div>
                <div className=" w-full my-3">
                    <div className="flex justify-between">
                        <h1 className="text-lg font-semibold">Endpoints</h1>
                        <button
                            type="button"
                            className="text-accent"
                            onClick={addEndpoint}
                        >
                            Add Endpoint
                        </button>
                    </div>
                    {customer.endpoints?.map((endpoint, i) => (
                        <div key={i}>
                            {i > 0 && (
                                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                            )}
                            <div className="my-2 w-full flex justify-between">
                                <label htmlFor="endpoint" className="text-md">
                                    Endpoint
                                </label>
                                <input
                                    id="endpoint"
                                    className="ml-3 p-1 rounded-md border-2 border-accent bg-secondary"
                                    onChange={(e) => handleEndpointChange(e, i)}
                                />
                            </div>
                            <div className="my-2 w-full overflow-auto">
                                <div className="flex justify-between">
                                    <h1 className="text-md font-semibold">
                                        Headers
                                    </h1>
                                    <button
                                        type="button"
                                        onClick={() => addNewHeader(i)}
                                    >
                                        <PlusCircleIcon className="h-5 w-5 text-accent" />
                                    </button>
                                </div>
                                {endpoint.headers.map((header, j) => (
                                    <div key={j} className="flex flex-row">
                                        <input
                                            className="my-1 mr-1 p-1 rounded-md border-2 border-accent bg-secondary"
                                            type="text"
                                            id="key"
                                            value={header.key}
                                            onChange={(e) =>
                                                handleHeadersChange(e, i, j)
                                            }
                                            placeholder="key"
                                        />
                                        <input
                                            className="my-1 p-1 rounded-md border-2 border-accent bg-secondary"
                                            type="text"
                                            id="value"
                                            value={header.value}
                                            onChange={(e) =>
                                                handleHeadersChange(e, i, j)
                                            }
                                            placeholder="value"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="my-1">
                                <h1 className="text-md font-semibold">
                                    Retry Config
                                </h1>
                                <div className="m-1 flex justify-between items-center min-w-full">
                                    <label
                                        htmlFor="numberOfRetries"
                                        className="text-md"
                                    >
                                        Number of reties:
                                    </label>
                                    <input
                                        id="numberOfRetries"
                                        type="number"
                                        className="p-1 rounded-md border-2 border-accent bg-secondary"
                                        onChange={(e) =>
                                            handleRetryConfigChange(e, i)
                                        }
                                    />
                                </div>
                                <div className="m-1 flex justify-between items-center min-w-full">
                                    <label
                                        htmlFor="retryInterval"
                                        className="text-md"
                                    >
                                        Retry Interval (sec):
                                    </label>

                                    <input
                                        id="retryInterval"
                                        type="number"
                                        className="p-1 rounded-md border-2 border-accent bg-secondary"
                                        onChange={(e) =>
                                            handleRetryConfigChange(e, i)
                                        }
                                    />
                                </div>
                                <div className="m-1 flex justify-between items-center min-w-full">
                                    <label
                                        htmlFor="timeout"
                                        className="text-md"
                                    >
                                        Timeout (sec):{" "}
                                    </label>

                                    <input
                                        id="timeout"
                                        type="number"
                                        className="p-1 rounded-md border-2 border-accent bg-secondary"
                                        onChange={(e) =>
                                            handleRetryConfigChange(e, i)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="my-5 w-80 flex justify-center">
                    <button
                        type="submit"
                        className="bg-accent px-3 py-1 rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
