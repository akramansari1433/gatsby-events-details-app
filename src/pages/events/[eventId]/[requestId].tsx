import { HeadFC, navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export type RequestType = {
    requestId: string;
    eventId: string;
    endpointId: string;
    request: {
        endpoint: string;
        method: string;
        headers: any;
        body?: any;
        tries?: number;
    };
    response: {
        status?: number;
        response: any;
    };
    createdAt: string;
};

export default function EventDetails(props: any) {
    const [requestDetail, setRequestDetail] = useState<RequestType>();
    const [includeCustomerHeaders, setIncludeCustomerHeaders] = useState<boolean>(true);
    const [customerId, setCustomerId] = useState<string>('');
    const [endpointId, setEndpointId] = useState<string>('');

    useEffect(() => {
        setCustomerId(props.location.state.customerId)
        setEndpointId(props.location.state.endpointId)
    }, [props]);

    const getEvents = async () => {
        const res: RequestType = await fetch(
            `https://workers-middleware.akramansari1433.workers.dev/events/${props.params.eventId}/${props.params.requestId}`
        ).then((response) => response.json());
        const data = await res;
        setRequestDetail(data);
        return data;
    };

    const resendRequest = async () => {
        const payload = {
            eventId: requestDetail?.eventId,
            requestId: requestDetail?.requestId,
            customHeader: includeCustomerHeaders,
        };
        const res: any = await fetch(
            `https://workers-middleware.akramansari1433.workers.dev/request/resend/${customerId}/${endpointId}`,
            {
                method: "POST",
                body: JSON.stringify(payload),
            }
        ).then((response) => response.json());
        
        if(!res.error) {
            navigate(`/events/${res.eventId}/${res.requestId}`, {
                state: {
                    customerId,
                    endpointId
                }
            })
        }

        setRequestDetail(res);
        return res;
    };

    useEffect(() => {
        getEvents();
    }, []);
    
    const { refetch, isRefetching } = useQuery(["response"], resendRequest, {
        enabled: false,
    });
    
    const onResendRequest = () => {
        refetch();
    };

    return (
        <>
            <h1 className="text-4xl text-center mt-3">Event Details</h1>
            <h3>Endpoint: </h3> {requestDetail?.request.endpoint}
            <div className="flex flex-wrap w-full justify-center">
                <div className="p-2 w-full md:w-1/2">
                    <h1 className="text-3xl text-center">Request</h1>
                    <textarea
                        value={JSON.stringify(requestDetail?.request, null, 2)}
                        className="border-2 p-1 w-full"
                        rows={15}
                        disabled
                    />
                </div>
                <div className="p-2 w-full md:w-1/2">
                    <h1 className="text-3xl text-center">Response</h1>
                    <textarea
                        className="border-2 p-1 w-full"
                        rows={15}
                        value={JSON.stringify(requestDetail?.response, null, 2)}
                        disabled
                    />
                </div>
                <button
                    onClick={onResendRequest}
                    className="rounded-md border bg-accent py-2 px-4 text-sm font-medium text-main-text hover:bg-accent-secondary focus:outline-none"
                >
                    {isRefetching ? 'Resending...' : 'Resend Request'}
                </button>
            </div>
            <label htmlFor="include-headers"></label>
            <input
                className="cursor-pointer mr-2"
                id="include-headers"
                type="checkbox"
                checked={includeCustomerHeaders}
                onChange={() =>
                    setIncludeCustomerHeaders(!includeCustomerHeaders)
                }
            />
            Include Custom Headers
        </>
    );
}

export const Head: HeadFC = () => <title>Event Details</title>;
