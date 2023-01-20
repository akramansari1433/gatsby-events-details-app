import React, { ChangeEvent, useContext, useEffect, useState } from "react";

type PropsType = {
    customerId: string;
    setShowCreateEndpoitModal: (value: boolean) => void;
};

export default function CreateEndpointModal({
    setShowCreateEndpoitModal,
    customerId,
}: PropsType) {
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
                        <div className="relative p-1 md:p-6 flex-auto w-96">
                            <div className="my-2 flex justify-between">
                                <label htmlFor="endpoint" className="text-xl">
                                    Endpoint
                                </label>
                                <input
                                    id="endpoint"
                                    className="ml-3 p-1 rounded-md border-2 border-accent bg-secondary"
                                />
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowCreateEndpoitModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-accent hover:bg-accent-secondary font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
