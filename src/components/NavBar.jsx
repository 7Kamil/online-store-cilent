import React, {useContext, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const NavBar = observer(() => {
    const {user} = useContext(Context);

    const logout = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
    }

    useEffect(() => {
        //get user from user store
        console.log(user.user.role);
    }, []);
    return (
        <>

            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                    <NavLink to={"/"} className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9"
                             alt="Flowbite Logo"/>
                        <span
                            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Moneti</span>
                    </NavLink>
                    <div className="flex items-center">
                        {user.isAuth ?
                            <>
                                <a href="#"
                                   className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">
                                    {user.user.email}
                                </a>


                                {/*   logout button*/}

                                <button onClick={logout} type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Logout
                                </button>
                            </>:

                            <NavLink to={"/login"} className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">Login</NavLink>}
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-50 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
                    <div className="flex items-center">
                        <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                            {/*{user.isAuth && user.user.role === 'ADMIN' &&*/}
                           <>
                               <li>
                                   <NavLink to={"/device"} className="text-gray-900 dark:text-white hover:underline"
                                            aria-current="page">Create Coin</NavLink>
                               </li>
                               <li>
                                   <NavLink to={"/category"} className="text-gray-900 dark:text-white hover:underline"
                                            aria-current="page">Create Category</NavLink>
                               </li>
                           </>
                            {/*}*/}



                        </ul>
                    </div>
                </div>
            </nav>


        </>
    );
});

export default NavBar;