import React, {useEffect} from 'react';
import {string, z} from "zod";
import {public_api} from "../../../api/Api";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterDTO} from "../../../data_object/RegisterDTO";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const schema = () => {
    return (z.object({
        email: string().email("Érvénytelen email"),
        password: string().min(3, "Érvénytelen jelszó"),
        repassword: string().min(3, "Érvénytelen jelszó")
    }).superRefine(({repassword, password}, ctx) => {
        if (repassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "A két jelszó nem egyezik",
                path: ["repassword"],
            })
        }
    }));
};

function RegisterPage() {
    const {t} = useTranslation("register");
    const navigate = useNavigate();

    const {register, handleSubmit, reset, formState} = useForm<RegisterDTO>({
        resolver: zodResolver(schema()),
    })

    const {errors} = formState;

    const onSubmit = async (data: RegisterDTO): Promise<void> => {
        await public_api.post('/register', {
            'email': data.email,
            'password': data.password
        })
            .then(response => {
                localStorage.setItem('register_email', data.email);
                navigate("/login");
            })
            .catch(error => {
                console.error(error.response.data);
            });
    }

    useEffect((): void => {
        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [reset, formState]);


    return (
        <div className="fixed mx-auto my-auto max-w-sm sm:max-w-md max-h-[26rem] inset-0 border border-gray-700 rounded-lg p-4 flex flex-col shadow-lg bg-[#222836] items-center">
            <div className="w-full mb-6 text-xl text-center">
                {t('title')}
            </div>
            <div className="w-4/5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative z-0 w-full mb-9 group">
                        <input type="email" id="email"
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                               required {...register('email')}/>
                        <label htmlFor="email"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {t('email')}
                        </label>
                        <p className="absolute mt-2 text-sm text-red-600 dark:text-red-500">{errors.email?.message?.toString()}</p>
                    </div>
                    <div className="relative z-0 w-full mb-10 group">
                        <input type="password" id="password"
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                               required {...register('password')}/>
                        <label htmlFor="password"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {t('password')}
                        </label>
                        <p className="absolute mt-2 text-sm text-red-600 dark:text-red-500">{errors.password?.message?.toString()}</p>
                    </div>
                    <div className="relative z-0 w-full mb-10 group">
                        <input type="password" id="repassword"
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                               required {...register('repassword')}/>
                        <label htmlFor="repassword"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            {t('repassword')}
                        </label>
                        <p className="absolute mt-2 text-sm text-red-600 dark:text-red-500">{errors.repassword?.message?.toString()}</p>
                    </div>
                    <a href="/login" type="button" className="w-[45%] focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 text-center">{t('button.login')}</a>
                    <button type="submit" className="w-[45%] focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 float-right" onClick={handleSubmit(onSubmit)}>{t('button.register')}</button>
                </form>
            </div>
        </div>
        //     Toast for email is already exist
    );
}

export default RegisterPage;