import { useFieldArray, useForm } from "react-hook-form";
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

export default function AddCustomer() {

    const { control, watch, register, handleSubmit } = useForm<NewCustomerType>({
        defaultValues: emptyCustomer
    })

    const { fields, append, update } = useFieldArray({
        control,
        name: "endpoints"
    });

    const emptyEndpoint = {
        endpoint: "",
        headers: [{ key: "", value: "" }],
        retryConfig: {
            retryInterval: 0,
            timeout: 0,
            numberOfRetries: 0,
        },
    };

    const { customers, setCustomers } = useContext(CustomerContext);

    const addNewHeader = (i: number) => {
        const endpoint = watch(`endpoints.${i}`);
        endpoint.headers = [...endpoint.headers, { key: '', value: '' }];
        update(i, endpoint)
    };

    const addEndpoint = () => {
        append(emptyEndpoint)
    };

    const submitHandler = async (data: NewCustomerType) => {
        try {
            const response: { customerData: CustomerType; message: string } =
                await fetch(
                    `https://workers-middleware.akramansari1433.workers.dev/createCustomer`,
                    {
                        method: "POST",
                        body: JSON.stringify(data),
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
            <form onSubmit={handleSubmit(submitHandler)}
                className="my-5 w-auto md:w-96"
            >
                <div className="my-2 w-full flex justify-between">
                    <label
                        htmlFor="customerName"
                        className="text-lg font-semibold"
                    >
                        Name
                    </label>
                    <input
                        {...register('customerName')}
                        className="ml-3 p-1 rounded-md border-2 border-accent bg-secondary"
                    />
                </div>
                <div className="my-2 w-full flex justify-between">
                    <label htmlFor="host" className="text-lg font-semibold">
                        Hostname
                    </label>
                    <input
                        {...register('host')}
                        className="ml-3 p-1 rounded-md border-2 border-accent bg-secondary"
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
                    {
                        watch("endpoints").map((endpoint, index) => (
                            <div key={index}>
                                <hr className="my-5" />
                                <div key={index} className="my-2 w-full flex justify-between">
                                    <label htmlFor="endpoint" className="text-md">
                                        Endpoint
                                    </label>
                                    <input
                                        {...register(`endpoints.${index}.endpoint`)}
                                        className="ml-3 p-1 rounded-md border-2 border-accent bg-secondary"
                                    />
                                </div>

                                <div className="my-2 w-full overflow-auto">
                                    <div className="flex justify-between">
                                        <h1 className="text-md font-semibold">
                                            Headers
                                        </h1>
                                        <button
                                            type="button"
                                            onClick={() => addNewHeader(index)}
                                        >
                                            <PlusCircleIcon className="h-5 w-5 text-accent" />
                                        </button>
                                    </div>

                                    {watch(`endpoints.${index}.headers`).map((header, i) => (
                                        <div key={i} className="flex flex-row">
                                            <input
                                                className="my-1 mr-1 p-1 rounded-md border-2 border-accent bg-secondary"
                                                {...register(`endpoints.${index}.headers.${i}.key`)}
                                                placeholder="key"
                                            />
                                            <input
                                                className="my-1 p-1 rounded-md border-2 border-accent bg-secondary"
                                                {...register(`endpoints.${index}.headers.${i}.value`)}
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
                                            {...register(`endpoints.${index}.retryConfig.numberOfRetries`)}
                                            type="number"
                                            className="p-1 rounded-md border-2 border-accent bg-secondary"
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
                                            {...register(`endpoints.${index}.retryConfig.retryInterval`)}
                                            type="number"
                                            className="p-1 rounded-md border-2 border-accent bg-secondary"
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
                                            {...register(`endpoints.${index}.retryConfig.timeout`)}
                                            type="number"
                                            className="p-1 rounded-md border-2 border-accent bg-secondary"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
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
