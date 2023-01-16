import React from "react";

export default function TableSkeleton() {
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
                            <th scope="col" className="py-4">
                                <span className="sr-only">View Details</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <p className="py-1 bg-gray-400 w-80"></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
