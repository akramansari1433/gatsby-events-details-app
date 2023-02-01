import React, { useEffect, useState } from "react";
import { RequestType } from "./events/[eventId]/[requestId]";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import EventsSkeleton from "../utils/EventsSkeleton";
import { dateTimeFormatter } from "../utils/helper";
import RequestsTable from "../components/RequestsTable";

export type EventType = {
    eventId: string;
    customerId: string;
    requests: RequestType[];
    updatedAt: string;
    tries?: number;
};

export interface ISelectedRequest {
    customerId: string;
    eventId: string;
    requests?: RequestType[];
}
  

export default function EventList() {
    const [eventsList, setEventsList] = useState<EventType[]>([]);
    const [expandedRows, setExpandedRows] = useState<any[]>([]);
    const [expandState, setExpandState] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [selectRequests, setSelectRequests] = useState<ISelectedRequest | null>(null);

    const [socket, setSocket] = useState<WebSocket | null>(null);

    const handleExpandRow = (eventId: string) => {
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
        try {
            setLoading(true);
            const res: any = await fetch(
                "https://workers-middleware.akramansari1433.workers.dev/events"
            ).then((response) => response.json());

            if (!res.error) {
                setLoading(false);
                setEventsList(res);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleSendMessage = () => {
        socket?.send(JSON.stringify(selectRequests));
        setSelectRequests(null);
    };

    useEffect(() => {
        getEvents();
        const newSocket = new WebSocket('wss://workers-middleware.akramansari1433.workers.dev/ws/request/resendbulk');

        newSocket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        newSocket.onmessage = (event) => {
            // Write a funtion to handle the buffer and update all the requests coming in from the socket, below code won't work 100%
            // if(event.data) {
            //     const data = JSON.parse(event.data)
            //     const tempEventList = eventsList
            //     if("requestId" in data) {
            //         tempEventList.forEach(event => {
            //             if(event.eventId === data.requestId) {
            //                 event.requests.push(data)
            //             }
            //         })
            //     }
            //     console.log(tempEventList);
            //     setEventsList(tempEventList)
            // }
            console.log(JSON.parse(event.data))
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <>
            <div className="mt-3">
                <h1 className="font-semibold text-xl text-center">
                    Events List
                </h1>
                {loading ? (
                    <EventsSkeleton />
                ) : (
                    <div className="mt-2 flex flex-col">
                        <div className="overflow overflow-x-auto shadow md:rounded-lg text-main-text">
                            <table className="min-w-full">
                                <thead className="bg-accent">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                                        >
                                            Customer Id
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                                        >
                                            Event Id
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                                        >
                                            Updated At
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
                                <tbody className="divide-y divide-gray-200 bg-secondary">
                                    {eventsList?.map((event, i) => (
                                        <React.Fragment key={i}>
                                            <tr
                                                onClick={() => handleExpandRow(event.eventId)}
                                                className="cursor-pointer"
                                            >
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                                    {event.customerId}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                                    {event.eventId}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                                    {dateTimeFormatter(
                                                        event.updatedAt
                                                    )}
                                                </td>
                                                <td className=" flex flex-col whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <button
                                                        key={event.eventId}
                                                        onClick={(e) =>
                                                            handleExpandRow(
                                                                event.eventId
                                                            )
                                                        }
                                                    >
                                                        {expandState[
                                                            event.eventId
                                                        ] ? (
                                                            <ChevronUpIcon className="text-accent h-5 w-5" />
                                                        ) : (
                                                            <ChevronDownIcon className="text-accent h-5 w-5" />
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                            <>
                                                {expandedRows.includes(
                                                    event.eventId
                                                ) ? (
                                                    <tr>
                                                        <td colSpan={12}>
                                                            <div className="flex justify-center my-3 shadow">
                                                                <RequestsTable
                                                                    event={event}
                                                                    selectRequests={selectRequests}
                                                                    setSelectRequests={setSelectRequests}
                                                                    handleSendMessage={handleSendMessage}
                                                                />
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
        </>
    );
}
