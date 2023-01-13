import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ResquestType } from "./events/[eventId]/[requestId]";

type EventType = {
    eventId: string;
    customerId: string;
    requests: ResquestType[];
    updatedAt: string;
    tries?: number;
};

export default function InvocationLog() {
    const [eventsList, setEventsList] = useState<EventType[]>([]);

    const getEvents = async () => {
        const res = await fetch(
            "https://workers-middleware.akramansari1433.workers.dev/events"
        ).then((response) => response.json());
        const data = await res;
        setEventsList(data);
        // console.log(data);
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <Layout>
            <div className="mt-3">
                <h1 className="font-semibold text-xl text-center">
                    Invocation Log
                </h1>
                <div className="mt-2 flex flex-col">
                    <div className="overflow overflow-x-auto shadow md:rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-violet-400">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Event ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Request Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Created At
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                    >
                                        <span className="sr-only">
                                            View Details
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {eventsList?.map((event, i) => (
                                    <tr key={i}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {event.eventId}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {event.requests.map((req, i) => (
                                                <p key={i}>{req.requestId}</p>
                                            ))}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {event.requests.map((req, i) => (
                                                <p key={i}>
                                                    {req.response.status}
                                                </p>
                                            ))}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {event.requests.map((req, i) => (
                                                <p key={i}>{req.createdAt}</p>
                                            ))}
                                        </td>
                                        <td className=" flex flex-col whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            {event.requests.map((req, i) => (
                                                <Link
                                                    key={i}
                                                    to={`/events/${event.eventId}/${req.requestId}`}
                                                    className="text-indigo-600 hover:text-indigo-900 mb-2"
                                                >
                                                    View Details
                                                </Link>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
