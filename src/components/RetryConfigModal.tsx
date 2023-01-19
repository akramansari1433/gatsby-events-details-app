import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { CustomerContext, CustomerType } from "../contexts/customer-context";
import { EndpointType } from "../pages/customers/[id]";

type PropsType = {
    customerId: string;
    endpoint: EndpointType;
    setRetryConfigShowModal: (value: boolean) => void;
};

type TRetryConfigType = {
    numberOfRetries: number;
    retryInterval: number;
    timeout: number;
};

export default function RetryConfigModal({
    setRetryConfigShowModal,
    endpoint,
    customerId,
}: PropsType) {
    const emptyRetryConfigData: TRetryConfigType = {
        numberOfRetries: 0,
        retryInterval: 0,
        timeout: 0,
    };
    const [editMode, setEditMode] = useState(false);
    const [retryConfig, setRetryConfig] =
        useState<TRetryConfigType>(emptyRetryConfigData);
    const { customers, setCustomers } = useContext(CustomerContext);

    const retryConfigChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRetryConfig((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const onSaveRetryConfig = async () => {
        try {
            const response: { data: CustomerType; message: string } =
                await fetch(
                    `https://workers-middleware.akramansari1433.workers.dev/retryconfig/${customerId}/${endpoint.endpointId}`,
                    {
                        method: "POST",
                        body: JSON.stringify({ retryConfig }),
                    }
                ).then((res) => res.json());

            let updatedCustomers = customers.map((customer) => {
                if (customer.customerId == customerId) {
                    return (customer = response.data);
                } else return customer;
            });

            setCustomers(updatedCustomers);
        } catch (error) {
            console.log("Error: ", error);
        }
        setRetryConfigShowModal(false);
    };

    useEffect(() => {
        endpoint.retryConfig && setRetryConfig(endpoint.retryConfig);
    }, []);

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="w-96 border-0 rounded-lg shadow-lg relative flex flex-col bg-secondary text-main-text outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-center justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-xl font-semibold">
                                Retry Config
                            </h3>
                            <button
                                className="border-0 leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setRetryConfigShowModal(false)}
                            >
                                <span className=" text-accent text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <div className="m-1 flex justify-between items-center min-w-full">
                                <label htmlFor="numberOfRetries">
                                    Number of reties:
                                </label>
                                {editMode ? (
                                    <input
                                        id="numberOfRetries"
                                        type="number"
                                        className="border-2 rounded-md p-1.5 text-black"
                                        value={retryConfig.numberOfRetries}
                                        onChange={(e) =>
                                            retryConfigChangeHandler(e)
                                        }
                                    />
                                ) : (
                                    <p>{retryConfig.numberOfRetries}</p>
                                )}
                            </div>
                            <div className="m-1 flex justify-between items-center min-w-full">
                                <label htmlFor="retryInterval">
                                    Retry Interval (sec):
                                </label>
                                {editMode ? (
                                    <input
                                        id="retryInterval"
                                        type="number"
                                        className="border-2 rounded-md p-1.5 text-black"
                                        value={retryConfig.retryInterval}
                                        onChange={(e) =>
                                            retryConfigChangeHandler(e)
                                        }
                                    />
                                ) : (
                                    <p>{retryConfig.retryInterval}</p>
                                )}
                            </div>
                            <div className="m-1 flex justify-between items-center min-w-full">
                                <label htmlFor="timeout">Timeout (sec): </label>
                                {editMode ? (
                                    <input
                                        id="timeout"
                                        type="number"
                                        className="border-2 rounded-md p-1.5 text-black"
                                        value={retryConfig.timeout}
                                        onChange={(e) =>
                                            retryConfigChangeHandler(e)
                                        }
                                    />
                                ) : (
                                    <p>{retryConfig.timeout}</p>
                                )}
                            </div>
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                            {editMode ? (
                                <>
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() =>
                                            setRetryConfigShowModal(false)
                                        }
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-accent hover:bg-accent-secondary font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={onSaveRetryConfig}
                                    >
                                        Save
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="bg-accent hover:bg-accent-secondary font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setEditMode(true)}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
