import React from 'react';
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

const Auth = observer(() => {
    let location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === '/login'
    const {user} = React.useContext(Context)
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const signIn = async (e) => {
        try {
            e.preventDefault();
            let response = isLogin ? await login(email,password) : await registration(email,password)
            user.setUser(response)
            user.setIsAuth(true)
            navigate('/')
        }
        catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                         alt="logo"/>
                        Flowbite
                </a>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form onSubmit={signIn} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    email</label>
                                <input onChange={
                                    e => setEmail(e.target.value)
                                } value={email} type="email" name="email" id="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@company.com" required=""/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={
                                    e => setPassword(e.target.value)
                                }  value={password}
                                       type="password" name="password" id="password" placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required=""/>
                            </div>

                            <button type="submit"
                                    className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                {isLogin ? 'Sign in' : 'Sign up'}
                            </button>
                            {isLogin ?
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <NavLink to={'/register'} className={'text-primary-600 dark:text-primary-400'}> Sign up</NavLink>
                            </p>
                                :
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?
                                    <NavLink to={'/login'} className={'text-primary-600 dark:text-primary-400'}> Sign in</NavLink>
                                </p>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Auth;