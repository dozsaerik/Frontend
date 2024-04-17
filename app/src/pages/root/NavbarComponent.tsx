import Icon from "../../core/style/images/icon.svg";
import React from "react";
import {useTranslation} from "react-i18next";

function NavbarComponent() {
    const {t} = useTranslation("common");

    return (
        <nav className="bg-gray-900/50 shadow-md">
            <div className="max-w-screen flex flex-wrap items-center mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Icon} className="h-8" alt="Dashboard Logo"/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dashboard</span>
                </a>
                <div className="flex flex-1">
                    <div className="w-4/5 mx-auto flex flex-row items-center relative">
                        <a href="/test" className="block px-2 text-lg hover:text-gray-500">Test</a>

                        <button type="button" data-dropdown-toggle="user-quick-menu" className="ml-auto inline-flex items-center justify-center w-10 h-10 hover:bg-gray-500/40 rounded-lg">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>


                        <div id="user-quick-menu" className="z-10 hidden font-normal px-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded">{t('common.settings')}</a>
                                </li>
                            </ul>
                            <div className="py-2">
                                <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white rounded">{t('common.logout')}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarComponent;