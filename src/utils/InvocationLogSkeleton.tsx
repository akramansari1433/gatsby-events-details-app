import React from "react";

export default function InvocationLogSkeleton() {
    return (
        <div className="mt-2 flex flex-col">
            <div className="overflow overflow-x-auto shadow md:rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-violet-400">
                        <tr>
                            <th scope="col" className="py-10 pl-4 pr-3"></th>
                            <th scope="col" className="py-10 pl-4 pr-3"></th>
                            <th scope="col" className="py-10 pl-4 pr-3"></th>
                            <th scope="col" className="py-10 pl-4 pr-3"></th>
                            <th scope="col" className="py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 ">
                                <p className="py-2 bg-gray-100 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 ">
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 ">
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 ">
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 ">
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 ">
                                <p className="py-2 bg-gray-100 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 ">
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 ">
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 ">
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 ">
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                                <p className="py-2 my-1 bg-gray-100 w-80"></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
