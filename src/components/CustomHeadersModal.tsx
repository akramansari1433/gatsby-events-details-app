import React, { ChangeEvent, useEffect, useState } from "react";
import { EndpointType } from "../pages/customers/[id]";

type PropsType = {
    customerId: string;
    endpoint: EndpointType;
    setCustomHeadersShowModal: (value: boolean) => void;
};

type THeaderType = {
    key: string;
    value: string;
};

export default function CustomHeadersModal({
    setCustomHeadersShowModal,
    endpoint,
}: PropsType) {
    const emptyHeaderData: THeaderType = {
        key: "",
        value: "",
    };
    const [headers, setHeaders] = useState<THeaderType[]>([emptyHeaderData]);
    const [editMode, setEditMode] = useState(false);

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

    useEffect(() => {
        endpoint && setHeaders(endpoint.headers);
    }, []);

    useEffect(() => {
        const lastHeaderKey = headers[headers.length - 1].key;
        if (lastHeaderKey.length !== 0) {
            const tempHeader = [...headers];
            tempHeader.push(emptyHeaderData);
            setHeaders(tempHeader);
        }
    }, [headers]);

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-center justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-xl font-semibold">
                                Custom Headers
                            </h3>
                            <button
                                className="border-0 text-black leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setCustomHeadersShowModal(false)}
                            >
                                <span className="text-black text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-1 md:p-6 flex-auto">
                            {editMode ? (
                                headers?.map((header, i) => {
                                    return (
                                        <div
                                            className="flex flex-row w-full"
                                            key={i}
                                        >
                                            <input
                                                className="border-2 my-1 mr-1 rounded-md p-1.5"
                                                type="text"
                                                value={header.key}
                                                onChange={(e) =>
                                                    keySetter(e, i)
                                                }
                                                placeholder="Key"
                                            />
                                            <input
                                                className="border-2 my-1 rounded-md p-1.5"
                                                type="text"
                                                value={header.value}
                                                onChange={(e) =>
                                                    valueSetter(e, i)
                                                }
                                                placeholder="Value"
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="overflow overflow-x-auto mt-3 rounded-lg">
                                    <table className="table-fixed w-96">
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
                                            {endpoint.headers.map(
                                                (header, i) => (
                                                    <tr key={i}>
                                                        <td className="whitespace-nowrap py-3 px-3 text-sm font-medium text-gray-900">
                                                            {header.key}
                                                        </td>
                                                        <td className="whitespace-nowrap py-3 px-3 text-sm font-medium text-gray-900">
                                                            {header.value}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                            {editMode ? (
                                <>
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() =>
                                            setCustomHeadersShowModal(false)
                                        }
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() =>
                                            setCustomHeadersShowModal(false)
                                        }
                                    >
                                        Save
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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