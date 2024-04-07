import React, {useEffect} from 'react';
import {string, z,} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {LoginDTO} from "../../../data_object/LoginDTO";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const schema = () => {
    return (z.object({
        email: string().min(1, "Űres mező").email("Érvénytelen email"),
        password: string().min(1, "Űres mező")
    }));
};

function LoginPage() {
    const navigate = useNavigate();

    const {register, setValue, handleSubmit, reset, formState} = useForm<LoginDTO>({
        resolver: zodResolver(schema()),
    })

    const {errors} = formState;

    const onSubmit = async (data: LoginDTO): Promise<void> => {
        await axios.post('http://localhost:8080/api/login_check', data)
            .then(response => {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            })
            .catch(error => {
                console.error(error.response.data);
            })
    }

    useEffect((): void => {
        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [reset, formState]);

    return (
        <div className="h-screen flex items-center justify-center">
            <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Emlékezz rám</label>
                </div>
                <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit(onSubmit)}>Belépés
                </button>
            </form>
        </div>
    );
}

export default LoginPage;