import React, {useEffect, useState} from 'react';
import {string, z,} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {LoginDTO} from "../../../data_object/LoginDTO";
import {useNavigate} from "react-router-dom";
import {public_api} from "../../../api/Api";

const schema = () => {
    return (z.object({
        email: string().email("Érvénytelen email"),
        password: string().min(3, "Érvénytelen jelszó")
    }));
};

function LoginPage() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);

    const {register, setValue, handleSubmit, reset, formState} = useForm<LoginDTO>({
        resolver: zodResolver(schema()),
    })

    const {errors} = formState;

    const onSubmit = async (data: LoginDTO): Promise<void> => {
        await public_api.post('/login', data)
            .then(response => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("refresh_token", response.data.refresh_token);
                navigate("/");
            })
            .catch(error => {
                setLoginError(true);
                console.error(error.response.data);
            })
    }

    useEffect((): void => {
        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [reset, formState]);

    return (
        <>
            <div className="fixed mx-auto my-auto max-w-sm sm:max-w-md max-h-[20rem] inset-0 border border-gray-700 rounded-lg p-4 flex flex-col shadow-lg bg-[#222836] items-center">
                <div className="w-full mb-6 text-xl text-center">
                    Login
                </div>
                <div className="w-4/5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative z-0 w-full mb-9 group">
                            <input type="email" id="email"
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                   required {...register('email')}/>
                            <label htmlFor="email"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email cim
                            </label>
                            <p className="absolute mt-2 text-sm text-red-600 dark:text-red-500">{errors.email?.message?.toString()}</p>
                        </div>
                        <div className="relative z-0 w-full mb-10 group">
                            <input type="password" id="password"
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                   required {...register('password')}/>
                            <label htmlFor="password"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Password
                            </label>
                            <p className="absolute mt-2 text-sm text-red-600 dark:text-red-500">{errors.password?.message?.toString()}</p>
                        </div>
                        <button type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 float-right w-full" onClick={handleSubmit(onSubmit)}>Belépés</button>
                    </form>
                </div>
            </div>
            <button data-modal-target="popup-modal" data-modal-toggle="popup-modal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Toggle modal
            </button>

            <div id="popup-modal" tabIndex={-1} className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                            <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                            <button data-modal-hide="popup-modal" type="button"
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No,
                                cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;