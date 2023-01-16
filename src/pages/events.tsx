import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { RequestType } from "./events/[eventId]/[requestId]";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import EventsSkeleton from "../utils/EventsSkeleton";

type EventType = {
    eventId: string;
    customerId: string;
    requests: RequestType[];
    updatedAt: string;
    tries?: number;
};

export default function EventList() {
    const [eventsList, setEventsList] = useState<EventType[]>([]);
    const [expandedRows, setExpandedRows] = useState<any[]>([]);
    const [expandState, setExpandState] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleEpandRow = (eventId: string) => {
        const currentExpandedRows = expandedRows;
        const isRowExpanded = currentExpandedRows.includes(eventId);

        let obj: any = {};
        isRowExpanded ? (obj[eventId] = false) : (obj[eventId] = true);
        setExpandState(obj);
        const newExpandedRows = isRowExpanded
            ? currentExpandedRows.filter((id) => id !== eventId)
            : currentExpandedRows.concat(eventId);
        setExpandedRows(newExpandedRows);
    };

    const getEvents = async () => {
        setLoading(true);
        const res = await fetch(
            "https://workers-middleware.akramansari1433.workers.dev/events"
        ).then((response) => response.json());
        const data = await res;
        if (data) {
            setLoading(false);
            setEventsList(data);
        }

        // console.log(data);
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <Layout>
            <div className="mt-3">
                <h1 className="font-semibold text-xl text-center">
                    Events List
                </h1>
                {loading ? (
                    <EventsSkeleton />
                ) : (
                    <div className="mt-2 flex flex-col">
                        <div className="overflow overflow-x-auto shadow md:rounded-lg">
                            <table className="min-w-full">
                                <thead className="bg-violet-400">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Customer Id
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Event Id
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Updated At
                                        </th>
                                        {/* <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Tries
                                    </th> */}
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
                                        <React.Fragment key={i}>
                                            <tr>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {event.customerId}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {event.eventId}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {event.updatedAt}
                                                </td>
                                                {/* <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {event.tries}
                                            </td> */}
                                                <td className=" flex flex-col whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <button
                                                        key={event.eventId}
                                                        onClick={(e) =>
                                                            handleEpandRow(
                                                                event.eventId
                                                            )
                                                        }
                                                    >
                                                        {expandState[
                                                            event.eventId
                                                        ] ? (
                                                            <ChevronUpIcon className="text-indigo-600 h-5 w-5" />
                                                        ) : (
                                                            <ChevronDownIcon className="text-indigo-600 h-5 w-5" />
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                            <>
                                                {expandedRows.includes(
                                                    event.eventId
                                                ) ? (
                                                    <tr>
                                                        <td colSpan={6}>
                                                            <div className="flex justify-center my-3 shadow">
                                                                <table>
                                                                    <thead className="bg-gray-400">
                                                                        <tr>
                                                                            <th
                                                                                scope="col"
                                                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                                            >
                                                                                Event
                                                                                Id
                                                                            </th>
                                                                            <th
                                                                                scope="col"
                                                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                                            >
                                                                                Request
                                                                                Id
                                                                            </th>
                                                                            <th
                                                                                scope="col"
                                                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                                            >
                                                                                Created
                                                                                At
                                                                            </th>
                                                                            <th
                                                                                scope="col"
                                                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                                            >
                                                                                Tries
                                                                            </th>
                                                                            <th
                                                                                scope="col"
                                                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                                            >
                                                                                Status
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {event.requests.map(
                                                                            (
                                                                                req,
                                                                                i
                                                                            ) => (
                                                                                <tr
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                >
                                                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                                        {
                                                                                            req.eventId
                                                                                        }
                                                                                    </td>
                                                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                                        {
                                                                                            req.requestId
                                                                                        }
                                                                                    </td>
                                                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                                        {
                                                                                            req.createdAt
                                                                                        }
                                                                                    </td>
                                                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                                        {
                                                                                            req
                                                                                                .request
                                                                                                .tries
                                                                                        }
                                                                                    </td>
                                                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                                        {
                                                                                            req
                                                                                                .response
                                                                                                .status
                                                                                        }
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        )}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : null}
                                            </>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
