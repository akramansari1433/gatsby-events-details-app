import React, { ChangeEvent, useEffect, useState } from "react";
import Layout from "../components/Layout";

type THeaderType = {
    key: string;
    value: string;
};

type TRetryConfigType = {
    numberOfRetries: number;
    retryInterval: number;
    timeout: number;
};

export default function Modify() {
    const emptyHeaderData: THeaderType = {
        key: "",
        value: "",
    };

    const emptyRetryConfigData: TRetryConfigType = {
        numberOfRetries: 0,
        retryInterval: 0,
        timeout: 0,
    };

    const [headers, setHeaders] = useState<THeaderType[]>([emptyHeaderData]);
    const [retryConfig, setRetryConfig] =
        useState<TRetryConfigType>(emptyRetryConfigData);

    const [showHeaderForm, setShowHeaderForm] = useState<boolean>(false);
    const [showHeaderData, setShowHeaderData] = useState<boolean>(false);

    const [showRetryConfigForm, setShowRetryConfigForm] =
        useState<boolean>(false);

    const keySetter = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        const tempHeader = [...headers];
        tempHeader[i].key = e.target.value;
        setHeaders(tempHeader);
    };

    const valueSetter = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        const tempHeader = [...headers];
        tempHeader[i].value = e.target.value;
        setHeaders(tempHeader);
    };

    const retryConfigChangeHandler = (
        e: ChangeEvent<HTMLInputElement>,
        type: string
    ) => {
        const tempRetryConfig = { ...retryConfig };
        switch (type) {
            case "retry":
                tempRetryConfig.numberOfRetries = Number(e.target.value);
                break;
            case "interval":
                tempRetryConfig.retryInterval = Number(e.target.value);
                break;
            case "timeout":
                tempRetryConfig.timeout = Number(e.target.value);
                break;
            default:
                break;
        }
        setRetryConfig(tempRetryConfig);
    };

    const getSavedHeaders = async () => {
        const data: any = await fetch(
            "https://workers-middleware.akramansari1433.workers.dev/headers"
        ).then((res) => res.json());
        if (data?.headers) {
            setHeaders(data?.headers);
        } else {
            setHeaders([emptyHeaderData]);
        }
    };

    const getSavedRetryConfig = async () => {
        const data: any = await fetch(
            "https://workers-middleware.akramansari1433.workers.dev/retryconfig"
        ).then((res) => res.json());
        if (data?.retryconfig) {
            setRetryConfig(data?.retryconfig);
        } else {
            setRetryConfig(emptyRetryConfigData);
        }
    };

    const onSaveHeaders = async () => {
        try {
            // TODO: Need to change the the type of data
            const data: any = await fetch(
                "https://workers-middleware.akramansari1433.workers.dev/headers",
                {
                    method: "POST",
                    body: JSON.stringify(headers.splice(0, headers.length - 1)),
                }
            ).then((res) => res.json());

            setHeaders(data?.headers);
        } catch (error) {
            console.log("Error: ", error);
        }
        setShowHeaderForm(false);
    };

    const onCloseHeaders = () => {
        getSavedHeaders();
        setShowHeaderForm(false);
    };

    const onSaveRetryConfig = async () => {
        try {
            // TODO: Need to change the the type of data
            const data: any = await fetch(
                "https://workers-middleware.akramansari1433.workers.dev/retryconfig",
                {
                    method: "POST",
                    body: JSON.stringify(retryConfig),
                }
            ).then((res) => res.json());

            setRetryConfig(data?.retryconfig);
        } catch (error) {
            console.log("Error: ", error);
        }
        setShowRetryConfigForm(false);
    };

    const onCloseRetryConfig = () => {
        getSavedRetryConfig();
        setShowRetryConfigForm(false);
    };

    useEffect(() => {
        getSavedRetryConfig();
        getSavedHeaders();
    }, []);

    useEffect(() => {
        const lastHeaderKey = headers[headers.length - 1].key;
        const secondLastHeaderKey = headers[headers.length - 2]?.key;
        if (lastHeaderKey.length !== 0) {
            const tempHeader = [...headers];
            tempHeader.push(emptyHeaderData);
            setHeaders(tempHeader);
        }
        if (secondLastHeaderKey) {
            setShowHeaderData(true);
        }
    }, [headers]);

    return (
        <Layout>
            <div className="flex flex-col w-full">
                <div className="lg:w-1/2">
                    <div className="flex flex-row justify-between">
                        <h2 className="m-1 text-xl">Headers</h2>
                        {!showHeaderForm && (
                            <button
                                className="w-fit rounded-md text-violet-700"
                                onClick={() => setShowHeaderForm(true)}
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col overflow-auto">
                        {showHeaderForm && (
                            <>
                                {headers?.map((header, i) => {
                                    return (
                                        <div className="flex flex-row" key={i}>
                                            <input
                                                className="border-2 my-1 rounded-sm border-gray-500 mr-5 text-gray-500 p-2"
                                                type="text"
                                                value={header.key}
                                                onChange={(e) =>
                                                    keySetter(e, i)
                                                }
                                                placeholder="Key"
                                            />
                                            <input
                                                className="border-2 my-1 rounded-sm border-gray-500 text-gray-500 p-2"
                                                type="text"
                                                value={header.value}
                                                onChange={(e) =>
                                                    valueSetter(e, i)
                                                }
                                                placeholder="Value"
                                            />
                                        </div>
                                    );
                                })}
                                <div className="flex flex-row justify-start my-5">
                                    <button
                                        className="w-fit mr-5 bg-violet-600 rounded-md px-2 py-1 text-white"
                                        onClick={onSaveHeaders}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="w-fit px-2 rounded-md py-1 border-2"
                                        onClick={onCloseHeaders}
                                    >
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Show headers if it exists */}
                    {showHeaderData && !showHeaderForm && (
                        <div className="overflow overflow-x-auto mt-3 rounded-lg">
                            <table className="table-fixed min-w-full">
                                <thead className="bg-violet-400">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-2 px-3 text-left text-sm font-semibold "
                                        >
                                            Key
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-2 px-3 text-left text-sm font-semibold  "
                                        >
                                            Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {headers.map((header, i) => (
                                        <tr key={i}>
                                            <td className="whitespace-nowrap py-3 px-3 text-sm font-medium text-gray-900">
                                                {header.key}
                                            </td>
                                            <td className="whitespace-nowrap py-3 px-3 text-sm font-medium text-gray-900">
                                                {header.value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Retry Configuration */}
                <div className="lg:w-1/2">
                    <div className="flex flex-row justify-between">
                        <h1 className="m-1 text-xl">Retry Configuration</h1>
                        {!showRetryConfigForm && (
                            <>
                                {/* <label htmlFor="edit-retry-config">Edit your retry setting for event failures.</label> */}
                                <button
                                    className="w-fit rounded-md text-violet-700"
                                    onClick={() => setShowRetryConfigForm(true)}
                                    id="edit-retry-config"
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </div>
                    {showRetryConfigForm && (
                        <>
                            <div className="overflow-auto">
                                <div className="flex flex-row items-center justify-between p-2">
                                    <div>
                                        <h2>Number of Retries</h2>
                                    </div>
                                    <div>
                                        <input
                                            onChange={(e) =>
                                                retryConfigChangeHandler(
                                                    e,
                                                    "retry"
                                                )
                                            }
                                            className="border-2 p-1"
                                            type="number"
                                            value={retryConfig.numberOfRetries}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-between p-2">
                                    <div>
                                        <h2>Retry Interval (sec)</h2>
                                    </div>
                                    <div>
                                        <input
                                            onChange={(e) =>
                                                retryConfigChangeHandler(
                                                    e,
                                                    "interval"
                                                )
                                            }
                                            className="border-2 p-1"
                                            type="number"
                                            value={retryConfig.retryInterval}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-between p-2">
                                    <div>
                                        <h2>Timeout (sec)</h2>
                                    </div>
                                    <div>
                                        <input
                                            onChange={(e) =>
                                                retryConfigChangeHandler(
                                                    e,
                                                    "timeout"
                                                )
                                            }
                                            className="border-2 p-1"
                                            type="number"
                                            value={retryConfig.timeout}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-start my-5">
                                <button
                                    className="w-fit mr-5 bg-violet-600 rounded-md px-2 py-1 text-white"
                                    onClick={onSaveRetryConfig}
                                >
                                    Save
                                </button>
                                <button
                                    className="w-fit px-2 rounded-md py-1 border-2"
                                    onClick={onCloseRetryConfig}
                                >
                                    Close
                                </button>
                            </div>
                        </>
                    )}

                    {/* Show retry config data */}
                    {!showRetryConfigForm && (
                        <div className="overflow overflow-x-auto rounded-lg">
                            <div className="mt-3 mx-2">
                                <div className="flex flex-row justify-between border-x-2 border-t-2 p-2">
                                    <div>
                                        <h2>Number of Retries</h2>
                                    </div>
                                    <div>
                                        <h2>{retryConfig?.numberOfRetries}</h2>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between border-x-2 border-t-2 p-2">
                                    <div>
                                        <h2>Retry Interval (sec)</h2>
                                    </div>
                                    <div>
                                        <h2>{retryConfig?.retryInterval}</h2>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between border-x-2 border-t-2 border-b-2 p-2">
                                    <div>
                                        <h2>Timeout (sec)</h2>
                                    </div>
                                    <div>
                                        <h2>{retryConfig?.timeout}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
