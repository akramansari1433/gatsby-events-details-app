import React, { useContext, useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    XMarkIcon,
    CalendarDaysIcon,
    ClipboardDocumentListIcon,
    UserGroupIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    SunIcon,
    MoonIcon,
} from "@heroicons/react/24/outline";
import { Link } from "gatsby";
import { CustomerContext } from "../contexts/customer-context";
import { ThemeContext } from "../contexts/theme-context";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showCustomers, setShowCustomers] = useState(false);
    const { customers } = useContext(CustomerContext);
    const { theme, setTheme } = useContext(ThemeContext);

    const onThemeChange = () => {
        const currentTheme = theme === "light" ? "dark" : "light";
        setTheme(currentTheme);
        window.localStorage.setItem("theme", currentTheme);
    };

    return (
        <div
            className={`theme-${theme} bg-primary text-main-text transition-all duration-300 m-0 p-0 min-h-screen`}
        >
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className={`theme-${theme} relative z-40 md:hidden`}
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
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-accent">
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
                                                className="h-6 w-6 "
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                    <div className="flex justify-between flex-shrink-0 items-center px-4">
                                        <h1 className="text-2xl font-semibold">
                                            Sync Machine
                                        </h1>
                                        <button
                                            className="border-2 p-1 rounded-full bg-main-text"
                                            onClick={onThemeChange}
                                        >
                                            {theme === "dark" ? (
                                                <SunIcon className="h-5 w-5 text-primary" />
                                            ) : (
                                                <MoonIcon className="h-5 w-5 text-primary" />
                                            )}
                                        </button>
                                    </div>
                                    <nav className="mt-5 space-y-1 px-2sss">
                                        <Link
                                            activeClassName="bg-accent-secondary"
                                            className="group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                            to="/events"
                                        >
                                            <CalendarDaysIcon
                                                className="mr-4 flex-shrink-0 h-6 w-6"
                                                aria-hidden="true"
                                            />
                                            Events
                                        </Link>
                                        <Link
                                            activeClassName="bg-accent-secondary"
                                            className="group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                            to="/invocationlog"
                                        >
                                            <ClipboardDocumentListIcon
                                                className="mr-4 flex-shrink-0 h-6 w-6"
                                                aria-hidden="true"
                                            />
                                            Invocation Log
                                        </Link>
                                        <button
                                            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                                            onClick={() =>
                                                setShowCustomers(!showCustomers)
                                            }
                                        >
                                            <UserGroupIcon
                                                className="mr-4 flex-shrink-0 h-6 w-6"
                                                aria-hidden="true"
                                            />
                                            Customers
                                            {showCustomers ? (
                                                <ChevronUpIcon
                                                    className="ml-auto mr-4 flex-shrink-0 h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <ChevronDownIcon
                                                    className="ml-auto mr-4 flex-shrink-0 h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </button>
                                        {showCustomers && (
                                            <ul className="ml-10">
                                                {customers.map((customer) => (
                                                    <li
                                                        className="my-1"
                                                        key={
                                                            customer.customerId
                                                        }
                                                    >
                                                        <Link
                                                            activeClassName="bg-accent-secondary"
                                                            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                                            to={`/customers/${customer.customerId}`}
                                                        >
                                                            {
                                                                customer.customerName
                                                            }
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
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
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col bg-accent">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex min-h-0 flex-1 flex-col border-r">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex justify-between flex-shrink-0 items-center px-4">
                            <h1 className="text-2xl font-semibold">
                                Sync Machine
                            </h1>
                            <button
                                className="border-2 p-1 rounded-full bg-main-text"
                                onClick={onThemeChange}
                            >
                                {theme === "dark" ? (
                                    <SunIcon className="h-5 w-5 text-primary" />
                                ) : (
                                    <MoonIcon className="h-5 w-5 text-primary" />
                                )}
                            </button>
                        </div>
                        <nav className="mt-5 flex-1 space-y-1 px-2">
                            <Link
                                activeClassName="bg-accent-secondary"
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                to="/events"
                            >
                                <CalendarDaysIcon
                                    className="mr-4 flex-shrink-0 h-6 w-6"
                                    aria-hidden="true"
                                />
                                Events
                            </Link>
                            <Link
                                activeClassName="bg-accent-secondary"
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                to="/invocationlog"
                            >
                                <ClipboardDocumentListIcon
                                    className="mr-4 flex-shrink-0 h-6 w-6"
                                    aria-hidden="true"
                                />
                                Invocation Log
                            </Link>
                            <button
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                                onClick={() => setShowCustomers(!showCustomers)}
                            >
                                <UserGroupIcon
                                    className="mr-4 flex-shrink-0 h-6 w-6"
                                    aria-hidden="true"
                                />
                                Customers
                                {showCustomers ? (
                                    <ChevronUpIcon
                                        className="ml-auto mr-4 flex-shrink-0 h-6 w-6"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <ChevronDownIcon
                                        className="ml-auto mr-4 flex-shrink-0 h-6 w-6"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                            {showCustomers && (
                                <ul className="ml-10">
                                    {customers.map((customer) => (
                                        <li
                                            className="my-1"
                                            key={customer.customerId}
                                        >
                                            <Link
                                                activeClassName="bg-accent-secondary"
                                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                                to={`/customers/${customer.customerId}`}
                                            >
                                                {customer.customerName}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col md:pl-64">
                <div className="sticky top-0 z-10  pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
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
    );
}
