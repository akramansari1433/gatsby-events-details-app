import React, { useContext, useState } from "react";
import CustomHeadersModal from "../../components/CustomHeadersModal";
import RetryConfigModal from "../../components/RetryConfigModal";
import { CustomerContext } from "../../contexts/customer-context";

export type EndpointType = {
    endpointId: string;
    endpoint: string;
    headers: { key: string; value: string }[];
    retryConfig: {
        numberOfRetries: number;
        retryInterval: number;
        timeout: number;
    };
};

export default function EventList(props: any) {
    const [showCustomHeadersModal, setCustomHeadersShowModal] = useState(false);
    const [showRetryConfigModal, setRetryConfigShowModal] = useState(false);
    const [currentEndpoint, setCurrentEndpoint] = useState<EndpointType>();

    const { customers } = useContext(CustomerContext);
    const currentCustomer = customers.find(
        (customer) => customer.customerId === props.params.id
    );

    return (
        <>
            <div className="mt-3">
                <h1 className="font-semibold text-xl text-center">Enpoints</h1>
                <div className="mt-2 flex flex-col">
                    <div className="overflow overflow-x-auto shadow md:rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-accent">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                                    >
                                        Endpoint Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                                    >
                                        Endpoint
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                                    >
                                        Modify Settings
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-secondary">
                                {currentCustomer?.endpoints.map((endpoint) => (
                                    <tr key={endpoint.endpointId}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                            {endpoint.endpointId}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                            {endpoint.endpoint}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                            <button
                                                className="text-accent"
                                                onClick={() => {
                                                    setCustomHeadersShowModal(
                                                        true
                                                    );
                                                    setCurrentEndpoint(
                                                        endpoint
                                                    );
                                                }}
                                            >
                                                Custom Headers
                                            </button>
                                            <button
                                                className="ml-5 text-accent"
                                                onClick={() => {
                                                    setRetryConfigShowModal(
                                                        true
                                                    );
                                                    setCurrentEndpoint(
                                                        endpoint
                                                    );
                                                }}
                                            >
                                                Retry Config
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {showCustomHeadersModal ? (
                            <CustomHeadersModal
                                customerId={currentCustomer?.customerId!}
                                endpoint={currentEndpoint!}
                                setCustomHeadersShowModal={
                                    setCustomHeadersShowModal
                                }
                            />
                        ) : null}
                        {showRetryConfigModal ? (
                            <RetryConfigModal
                                customerId={currentCustomer?.customerId!}
                                endpoint={currentEndpoint!}
                                setRetryConfigShowModal={
                                    setRetryConfigShowModal
                                }
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}
