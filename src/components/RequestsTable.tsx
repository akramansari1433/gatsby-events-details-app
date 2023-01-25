import React from "react";
import { dateTimeFormatter } from "../utils/helper";
import { EventType } from "../pages/events";
import { RequestType } from "../pages/events/[eventId]/[requestId]";

type PropType = {
    event: EventType;
};

export default function RequestsTable({ event }: PropType) {
    const [requests, setRequests] = React.useState<RequestType[]>([]);

    const handleCheck = (
        e: React.ChangeEvent<HTMLInputElement>,
        request: RequestType
    ) => {
        if (e.target.checked) {
            setRequests([...requests, request]);
        } else if (e.target.checked === false) {
            setRequests(
                requests.filter((r) => r.requestId !== request.requestId)
            );
        }
    };

    return (
        <div className="flex flex-col">
            <table>
                <thead className="bg-accent-secondary">
                    <tr>
                        <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                        >
                            <span className="sr-only">Check</span>
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
                            Request Id
                        </th>
                        <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                        >
                            Created At
                        </th>
                        <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                        >
                            Tries
                        </th>
                        <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                        >
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {event.requests.map((req) => (
                        <tr key={req.requestId}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleCheck(e, req)}
                                />
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                {req.eventId}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                {req.requestId}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                {dateTimeFormatter(req.createdAt)}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                {req.request.tries}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                {req.response.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Todo resend bulk requests */}
            <div className="flex justify-center my-3">
                <button className="rounded-md border bg-accent py-2 px-4 text-sm font-medium text-main-text hover:bg-accent-secondary focus:outline-none">
                    Resend Requests
                </button>
            </div>
        </div>
    );
}
