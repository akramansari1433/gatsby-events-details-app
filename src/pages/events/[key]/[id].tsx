import { HeadFC } from "gatsby";
import React, { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Layout from "../../../components/Layout";

export type Event = {
    id: number;
    key: string;
    request: {
        url: string;
        method: string;
        header: any;
        body: any;
    };
    response: {
        status: number;
        response: any;
    };
};

export default function EventDetails(props: any) {
    const [event, setEvent] = useState<Event>();
    const [includeCustomerHeaders, setIncludeCustomerHeaders] = useState<boolean>(true)

    const getEvents = async () => {
        const res = await fetch(
            `https://workers-middleware.akramansari1433.workers.dev/events/${props.params.key}/${props.params.id}`
        ).then((response) => response.json());
        const data = await res;
        setEvent(data[0]);
        // console.log(data[0]);
        return data[0]
    };
    
    const resendRequest = async () => {
        const payload = {
            customerId: event?.key,
            requestId: event?.id,
            customHeader: includeCustomerHeaders
        }
        const res = await fetch(`https://workers-middleware.akramansari1433.workers.dev/request/resend`, {
                method: 'POST',
                body: JSON.stringify(payload)
            }
        ).then((response) => response.json());
        const data = await res;
        setEvent(data[0]);
        // console.log(data[0]);
        return data[0]
    };

    useEffect(() => {
        getEvents();
    }, []);

    const { isLoading, data, refetch } = useQuery(['response'], resendRequest, { enabled: false });

    console.log("onResendRequest", isLoading, data);

    const onResendRequest = () => {
        refetch()
    }


    return (
        <Layout>
            <h1 className="text-4xl text-center mt-3">Event Details</h1>
            <h3>Endpoint: </h3> {event?.request.url}
            <div className="flex flex-wrap w-full justify-center">
                <div className="p-2 w-full md:w-1/2">
                    <h1 className="text-3xl text-center">Request</h1>
                    <textarea
                        value={JSON.stringify(event?.request, null, 2)}
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
                        value={JSON.stringify(event?.response, null, 2)}
                        disabled
                    />
                </div>
                <button onClick={onResendRequest} className="rounded-md border bg-violet-600 py-2 px-4 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none">
                    Resend Request
                    {/* {isLoading ? 'Resending...' : 'Resend Request'} */}
                </button>
            </div>
            <label htmlFor="include-headers"></label>
            <input className="cursor-pointer mr-2" id="include-headers" type="checkbox" checked={includeCustomerHeaders} onChange={() => setIncludeCustomerHeaders(!includeCustomerHeaders)} />Include Custom Headers
        </Layout>
    );
}

export const Head: HeadFC = () => <title>Event Details</title>;
