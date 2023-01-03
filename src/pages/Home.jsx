import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCategories, fetchDevices} from "../http/deviceApi";
import {baseURL} from "../http";
import {useSearchParams} from "react-router-dom";

const Home = observer(() => {

    const {device} = useContext(Context);
    const [deviceList, setDeviceList] = useState([]);
    const [filter,setFilter] = useState(false);
    const [filterData,setFilterData] = useState({});
    const [searchParams, setSearchParams] = useSearchParams()

    const queryParamsToObject = (queryParams) => {
        const result = {};
        for (const [key, value] of queryParams) {
            result[key] = value;
        }
        return result;
    }


    useEffect(() => {
        fetchDevices().then(data => {
            console.log(data);

            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setPage(1)
            device.setQuery(searchParams)
            setDeviceList(data.rows)
            device.setLimit(2);

        });
    }, [searchParams]);

    useEffect(() => {
        let q = queryParamsToObject(searchParams)
        fetchDevices(q,device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            setDeviceList(data.rows)
            device.setLimit(2);
        });
    }, [device.page,searchParams]);

    useEffect(() => {
        fetchCategories().then(data => {
            device.setTypes(data);
        });
    }, []);

    const pagesCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];
    for (let i = 0; i < pagesCount; i++) {
        pages.push(i + 1);
    }


    const filterCoins = (e) => {
        e.preventDefault();
        //get min price and max price
        console.log(filterData);
        setSearchParams(filterData);
    }


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div
                    className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {deviceList.map(device =>{
                    return(
                        <div key={device.id}>
                            <a href={`/device/${device.id}`}
                               className="group">
                                <div
                                    className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                    <img src={`${baseURL}/${device.img}`}
                                         alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                                         className="object-none h-48 w-96 md:object-scale-down h-full w-full object-cover object-center group-hover:opacity-75"/>
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{device.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">${device.price}</p>
                            </a>
                        </div>

                    )
                })}
                </div>


                <nav className={"flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5 mt-20 "} aria-label="Page navigation example">

                    <ul className="inline-flex items-center -space-x-px">
                        <li>
                            <a href="#"
                               className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </li>
                        {pages.map(page =>
                        <li key={page}>
                            <a onClick={()=>{
                                console.log('page',page)
                                device.setPage(page)}
                            } href="#"
                               className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</a>
                        </li>
                        )}
                        <li>
                            <a href="#"
                               className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>


            </div>


            <div className="2xl:container 2xl:mx-auto">
                <div className="md:py-12 lg:px-20 md:px-6 py-9 px-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="lg:text-4xl dark:text-white text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold"></h2>
                        <button onClick={()=>setFilter(!filter)}
                                className="cursor-pointer dark:bg-white dark:text-gray-800 text-white dark:hover:bg-gray-100 sm:flex hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center">
                            <img className="dark:hidden"
                                 src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg1.svg"/>
                            <img className="hidden dark:block"
                                 src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg1dark.svg"/>
                            Filters
                        </button>
                    </div>


                    <button onClick={()=>setFilter(!filter)}
                            className="cursor-pointer mt-6 block sm:hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2 w-full bg-gray-800 flex text-base leading-4 font-normal text-white dark:text-gray-800 dark:bg-white dark:hover:bg-gray-100 justify-center items-center">
                        <img className="dark:hidden"
                             src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg1.svg" alt="filter"/>
                        <img className="hidden dark:block"
                             src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg1dark.svg" alt="filter"/>
                        Filters
                    </button>
                </div>
                {filter?
                <div id="filterSection"
                     className="block relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 dark:bg-gray-800 w-full">
                    <div
                         className="cursor-pointer absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4">
                        <img className="dark:hidden"
                             src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg2.svg" alt="cross"/>
                        <img className="hidden dark:block"
                             src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg2dark.svg" alt="cross"/>
                    </div>






                    <div>
                        <div className="flex space-x-2 text-gray-800 dark:text-white">
                            <img className="dark:hidden"
                                 src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg5.svg" alt="size"/>
                            <img className="hidden dark:block"
                                 src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg5dark.svg" alt="size"/>
                            <p className="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">Categories</p>
                        </div>
                        <div className="md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
                            <select id="type"
                            onChange={(e)=>setFilterData({...filterData,type:e.target.value})}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {device.types.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <hr className="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8"/>


                    <div>
                        <div className="flex space-x-2 text-gray-800 dark:text-white ">
                            <img className="dark:hidden"
                                 src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg6.svg" alt="collection"/>
                            <img className="hidden dark:block"
                                 src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg6dark.svg"
                                 alt="collection"/>
                            <p className="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">Name</p>
                        </div>
                        <div className="flex mt-12 space-x-12">
                            <div className="flex justify-center items-center">
                                <input type="text" onChange={(e)=>
                                    setFilterData({...filterData, name: e.target.value})}
                                       name="name" id="name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name" />
                            </div>

                        </div>
                    </div>

                    <hr className="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8"/>


                    <div>
                        <div className="flex space-x-2 text-gray-800 dark:text-white ">
                            <img className="dark:hidden"
                                 src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg6.svg" alt="collection"/>
                            <img className="hidden dark:block"
                                 src="https://tuk-cdn.s3.amazonaws.com/can-uploader/filter1-svg6dark.svg"
                                 alt="collection"/>
                            <p className="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">Price</p>
                        </div>
                        <div className="flex mt-8 space-x-8">
                            <div className="flex justify-center items-center">
                                <input type="number" onChange={(e)=>
                                    setFilterData({...filterData, min: e.target.value})}
                                        name="min_price" id="min_price"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="0" />
                            </div>
                            <div className="flex justify-center items-center">
                                <input type="number" name="max_price" id="max_price"
                                        onChange={(e)=>
                                            setFilterData({...filterData, max: e.target.value})}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="10000" />
                            </div>
                        </div>
                    </div>


                    <div className="hidden md:block absolute right-0 bottom-0 md:py-10 lg:px-20 md:px-6 py-9 px-4">
                        <button onClick={filterCoins}
                                className="hover:bg-gray-700 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800">Apply
                            Filter
                        </button>
                    </div>


                </div>
                    :null}
                </div>




        </div>
    );
});

export default Home;