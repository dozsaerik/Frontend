import React, {useEffect, useState} from 'react';
import {string, z} from "zod";
import {public_api} from "../../../api/Api";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterDTO} from "../../../data_object/RegisterDTO";
import {useNavigate} from "react-router-dom";

const schema = () => {
    return (z.object({
        email: string().min(1, "Űres mező").email("Érvénytelen email"),
        password: string().min(1, "Űres mező"),
        repassword: string().min(1, "Űres mező")
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
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const {register, setValue, handleSubmit, reset, formState} = useForm<RegisterDTO>({
        resolver: zodResolver(schema()),
    })

    const {errors} = formState;

    const onSubmit = async (data: RegisterDTO): Promise<void> => {
        await public_api.post('/register', {
            'email': data.email,
            'password': data.password
        })
            .then(response => {
                setSuccess(true);
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
        <div className="h-screen flex items-center justify-center">
            <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className={"text-center text-[#00a000] " + (success ? 'block' : 'hidden')}>Sikeres regisztráció <a href="/login" className="underline">Belépés</a></div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email cim</label>
                    <input type="email" id="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Email cim" required {...register('email')} />
                    <div className="text-red-500">{errors.email?.message?.toString()}</div>
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jelszó</label>
                    <input type="password" id="password"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Jelszó" required {...register('password')}/>
                    <div className="text-red-500">{errors.password?.message?.toString()}</div>
                </div>
                <div className="mb-5">
                    <label htmlFor="repassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jelszó újra</label>
                    <input type="password" id="repassword"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Jelszó" required {...register('repassword')}/>
                    <div className="text-red-500">{errors.repassword?.message?.toString()}</div>
                </div>
                <a href="/login"
                   className="text-white inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Belépés</a>
                <button type="submit"
                        className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit(onSubmit)}>Regisztráció
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;