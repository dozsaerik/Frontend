import React from 'react';
import Icon from "../../core/style/images/icon.svg";

function DashboardPage() {
    return (
        <nav className="bg-gray-900/50 shadow-md">
            <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Icon} className="h-8" alt="Dashboard Logo"/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dashboard</span>
                </a>
                <button data-collapse-toggle="navbar-multi-level" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-multi-level"
                        aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
        </nav>
    );
}

export default DashboardPage;