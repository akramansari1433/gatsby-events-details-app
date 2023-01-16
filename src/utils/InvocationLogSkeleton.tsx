import React from "react";

export default function InvocationLogSkeleton() {
    return (
        <div className="mt-2 flex flex-col">
            <div className="overflow overflow-x-auto shadow md:rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-violet-400 h-12">
                        <tr>
                            <th colSpan={3} className="py-10 pl-4 pr-3"></th>
                            <th colSpan={3} className="py-10 pl-4 pr-3"></th>
                            <th colSpan={3} className="py-10 pl-4 pr-3"></th>
                            <th colSpan={1} className="py-10 pl-4 pr-3"></th>
                            <th colSpan={2} className="py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                            <td className="py-4 pl-4 pr-3" colSpan={3}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3 " colSpan={3}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3 " colSpan={3}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3" colSpan={1}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3" colSpan={2}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-4 pl-4 pr-3" colSpan={3}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3 " colSpan={3}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3 " colSpan={3}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3" colSpan={1}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3" colSpan={2}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-4 pl-4 pr-3" colSpan={3}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3 " colSpan={3}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3 " colSpan={3}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3" colSpan={1}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3" colSpan={2}>
                                <p className="py-2 bg-gray-100 w-full"></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
