import React, {useEffect, useState} from 'react';
import {boolean, string, z,} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {LoginDTO} from "./data_object/LoginDTO";
import {useNavigate} from "react-router-dom";
import {public_api} from "../../../core/api/Api";
import {IconXboxX} from "@tabler/icons-react";
import TToast from "../../../core/components/TToast";
import {useTranslation} from "react-i18next";
import {TFunction} from "i18next";
import {LocalStorageID} from "../../../core/enum/LocalStorageID";
import {Roles} from "../../../core/enum/Roles";
import useLocalStorage from "../../../core/hook/useLocalStorage";

const schema = (t: TFunction<"register", undefined>) => {
    return (z.object({
        email: string().email(t('common.error.invalid_email')),
        password: string().min(3, t('common.error.invalid_password'))
    }));
};

function LoginPage() {
    const {t} = useTranslation("common");
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);
    const {setUserData} = useLocalStorage();

    const {register, setValue, handleSubmit, reset, formState} = useForm<LoginDTO>({
        resolver: zodResolver(schema(t)),
    })

    const {errors} = formState;

    const onSubmit = async (data: LoginDTO): Promise<void> => {
        await public_api.post('/login', data)
            .then(response => {
                localStorage.setItem(LocalStorageID.TOKEN, response.data.token);
                localStorage.setItem(LocalStorageID.REFRESH_TOKEN, response.data.refresh_token);
                setUserData(data.email, [Roles.ROLE_USER]);
                // navigate("/", {replace: true});
                window.location.href = "/";
            })
            .catch(error => {
                console.error(error.message);
                setLoginError(true);
                // console.error(error.response.data); // If have connection
            })
    }

    useEffect((): void => {
        let registerEmail = localStorage.getItem('register_email')
        if (registerEmail != null) {
            setValue("email", registerEmail);
            localStorage.removeItem('register_email');
        }

        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [reset, formState]);

    function handleHide() {
        setLoginError(false);
    }

    // console.log(boolean(''))

    return (
        <>
            <div className="fixed mx-auto my-auto max-w-sm sm:max-w-md max-h-[20rem] inset-0 border border-gray-700 rounded-lg p-4 flex flex-col shadow-lg bg-[#222836] items-center">
                <div className="w-full mb-6 text-xl text-center">
                    {t('login.title')}
                </div>
                <div className="w-4/5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative z-0 w-full mb-9 group">
                            <input type="email" id="email"
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                   required {...register('email')}/>
                            <label htmlFor="email"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                {t('common.email')}
                            </label>
                            <p className="absolute mt-2 text-sm text-red-600 dark:text-red-500">{errors.email?.message?.toString()}</p>
                        </div>
                        <div className="relative z-0 w-full mb-10 group">
                            <input type="password" id="password"
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                   required {...register('password')}/>
                            <label htmlFor="password"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                {t('common.password')}
                            </label>
                            <p className="absolute mt-2 text-sm text-red-600 dark:text-red-500">{errors.password?.message?.toString()}</p>
                        </div>
                        <a href="/register" type="button" className="w-[45%] focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 text-center">{t('common.button.register')}</a>
                        <button type="submit" className="w-[45%] focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 float-right" onClick={handleSubmit(onSubmit)}>{t('common.button.login')}</button>
                    </form>
                </div>
            </div>

            <TToast timeout={3000} show={loginError} handleHide={handleHide}>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-700 dark:text-red-200">
                    <IconXboxX className="h-5 w-5"/>
                </div>
                <div className="ml-3 text-sm font-normal">Sikertelen bejelentkezés</div>
            </TToast>
        </>
    );
}

export default LoginPage;