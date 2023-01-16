import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    XMarkIcon,
    CalendarDaysIcon,
    ClipboardDocumentListIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { Link } from "gatsby";

type LayoutProps = {
    children: React.ReactNode;
};

const navigation = [
    {
        name: "Events",
        href: "/events",
        icon: CalendarDaysIcon,
        current: true,
    },
    {
        name: "Invocation Log",
        href: "/invocationlog",
        icon: ClipboardDocumentListIcon,
        current: false,
    },
    {
        name: "Modify",
        href: "/modify",
        icon: AdjustmentsHorizontalIcon,
        current: false,
    },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 md:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-violet-700">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Close sidebar
                                                </span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                        <div className="flex flex-shrink-0 items-center px-4">
                                            <h1 className="text-2xl font-semibold text-white">
                                                Sync Machine
                                            </h1>
                                        </div>
                                        <nav className="mt-5 space-y-1 px-2">
                                            {navigation.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    activeStyle={{
                                                        background:
                                                            "rgb(91 33 182)",
                                                    }}
                                                    className=" text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                                    to={item.href}
                                                >
                                                    <item.icon
                                                        className="text-white mr-4 flex-shrink-0 h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="w-14 flex-shrink-0">
                                {/* Force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-violet-700">
                        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                            <div className="flex flex-shrink-0 items-center px-4">
                                <h1 className="text-2xl font-semibold text-white">
                                    Sync Machine
                                </h1>
                            </div>
                            <nav className="mt-5 flex-1 space-y-1 bg-violet-700 px-2">
                                {navigation.map((item, i) => (
                                    <Link
                                        key={i}
                                        activeStyle={{
                                            background: "rgb(91 33 182)",
                                        }}
                                        className="hover:bg-violet-800 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                        to={item.href}
                                    >
                                        <item.icon
                                            className="text-white mr-4 flex-shrink-0 h-6 w-6"
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col md:pl-64">
                    <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
                        <button
                            type="button"
                            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <main className="flex-1">
                        <div className="py-6 px-3">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
}
