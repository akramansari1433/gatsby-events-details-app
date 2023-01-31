import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CustomerContext, CustomerType } from "../contexts/customer-context";

type PropsType = {
    customerId: string;
    setShowCreateEndpoitModal: (value: boolean) => void;
};

interface ObjectKeyString {
    [key: string]: any;
}

type EndpointType = {
    endpoint: string;
    headers: ObjectKeyString[];
    retryConfig: ObjectKeyString;
};

export default function CreateEndpointModal({
    setShowCreateEndpoitModal,
    customerId,
}: PropsType) {
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

    const { control, watch, register, handleSubmit, reset } =
        useForm<EndpointType>({
            defaultValues: emptyEndpoint,
        });

    const { append } = useFieldArray({
        control,
        name: "headers",
    });

    const addNewHeader = () => {
        append({ key: "", value: "" });
    };

    const submitHandler = async (data: EndpointType) => {
        try {
            const response: { customerData: CustomerType; message: string } =
                await fetch(
                    `https://workers-middleware.akramansari1433.workers.dev/createEndpoint/${customerId}`,
                    {
                        method: "POST",
                        body: JSON.stringify(data),
                    }
                ).then((res) => res.json());

            if (response.customerData) {
                const updatedCustomers = customers.map((customer) => {
                    if (
                        customer.customerId === response.customerData.customerId
                    ) {
                        return response.customerData;
                    }
                    return customer;
                });
                setCustomers(updatedCustomers);
                reset();
                setShowCreateEndpoitModal(false);
                alert(response.message);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary text-main-text outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-center justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-xl font-semibold">
                                Add Endpoint
                            </h3>
                            <button
                                className="border-0 leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowCreateEndpoitModal(false)}
                            >
                                <span className="text-accent text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-1 md:p-3 flex-auto w-auto">
                            <div className="flex justify-between">
                                <form
                                    onSubmit={handleSubmit(submitHandler)}
                                    className="my-1 w-auto md:w-96"
                                >
                                    <div className="w-full my-1">
                                        <div>
                                            <div className="my-2 w-full flex justify-between">
                                                <label
                                                    htmlFor="endpoint"
                                                    className="text-md"
                                                >
                                                    Endpoint
                                                </label>
                                                <input
                                                    {...register("endpoint")}
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
                                                        onClick={() =>
                                                            addNewHeader()
                                                        }
                                                    >
                                                        <PlusCircleIcon className="h-5 w-5 text-accent" />
                                                    </button>
                                                </div>

                                                {watch("headers").map(
                                                    (header, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex flex-row"
                                                        >
                                                            <input
                                                                className="my-1 mr-1 p-1 rounded-md border-2 border-accent bg-secondary"
                                                                {...register(
                                                                    `headers.${i}.key`
                                                                )}
                                                                placeholder="key"
                                                            />
                                                            <input
                                                                className="my-1 p-1 rounded-md border-2 border-accent bg-secondary"
                                                                {...register(
                                                                    `headers.${i}.value`
                                                                )}
                                                                placeholder="value"
                                                            />
                                                        </div>
                                                    )
                                                )}
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
                                                        {...register(
                                                            "retryConfig.numberOfRetries"
                                                        )}
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
                                                        {...register(
                                                            "retryConfig.retryInterval"
                                                        )}
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
                                                        {...register(
                                                            `retryConfig.timeout`
                                                        )}
                                                        type="number"
                                                        className="p-1 rounded-md border-2 border-accent bg-secondary"
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
