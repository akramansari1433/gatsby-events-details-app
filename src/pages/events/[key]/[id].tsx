import { HeadFC } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";

export default function EventDetails(props: any) {
   const [event, setEvent] = useState<any[]>([]);

   const getEvents = async () => {
      const res = await fetch(
         `https://workers-middleware.akramansari1433.workers.dev/events/${props.params.key}/${props.params.id}`
      ).then((response) => response.json());
      const data = await res;
      setEvent(data);
   };

   useEffect(() => {
      getEvents();
   }, []);

   return (
      <Layout>
         <h1 className="text-4xl text-center mt-3">Event Details</h1>
         <div className="flex flex-wrap w-full justify-center">
            <div className="p-2 w-full md:w-1/2">
               <h1 className="text-3xl text-center">Request</h1>
               <textarea
                  value={JSON.stringify(event[0]?.request, null, 2)}
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
                  value={JSON.stringify(event[0]?.response, null, 2)}
                  disabled
               />
            </div>
            <button className="rounded-md border bg-violet-600 py-2 px-4 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none ">
               Resend Request
            </button>
         </div>
      </Layout>
   );
}

export const Head: HeadFC = () => <title>Event Details</title>;
