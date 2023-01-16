import React from "react";

export default function EventsSkeleton() {
    return (
        <div className="mt-2 flex flex-col">
            <div className="overflow overflow-x-auto shadow md:rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-violet-400">
                        <tr>
                            <th colSpan={4} className="py-10 pl-4 pr-3"></th>
                            <th colSpan={4} className="py-10 pl-4 pr-3"></th>
                            <th colSpan={3} className="py-10 pl-4 pr-3"></th>
                            <th colSpan={1} className="py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                            <td className="py-4 pl-4 pr-3" colSpan={4}>
                                <p className="py-2 bg-gray-400 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3 " colSpan={4}>
                                <p className="py-2 bg-gray-400 w-4/12"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3 " colSpan={3}>
                                <p className="py-2 bg-gray-400 w-3/12"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3" colSpan={1}>
                                <p className="py-2 bg-gray-400 w-full"></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-4 pl-4 pr-3" colSpan={4}>
                                <p className="py-2 bg-gray-400 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3 " colSpan={4}>
                                <p className="py-2 bg-gray-400 w-4/12"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3 " colSpan={3}>
                                <p className="py-2 bg-gray-400 w-3/12"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3" colSpan={1}>
                                <p className="py-2 bg-gray-400 w-full"></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-4 pl-4 pr-3" colSpan={4}>
                                <p className="py-2 bg-gray-400 w-full"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3 " colSpan={4}>
                                <p className="py-2 bg-gray-400 w-4/12"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3 " colSpan={3}>
                                <p className="py-2 bg-gray-400 w-3/12"></p>
                            </td>
                            <td className="py-4 pl-4 pr-3" colSpan={1}>
                                <p className="py-2 bg-gray-400 w-full"></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
