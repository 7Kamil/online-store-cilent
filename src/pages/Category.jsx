import React, {useEffect, useState} from 'react';
import {createCategory, createDevice, fetchCategories, fetchDevices} from "../http/deviceApi";
import {useNavigate} from "react-router-dom";

const Category = () => {
    const [name,setname] = useState('');
    const navigate = useNavigate();

    const addCategory = async (e) => {
        e.preventDefault();
        if(!name){

            return
        }
        createCategory({name}).then(data => {
            navigate('/')
        });
        // e.preventDefault();
        // const formData = new FormData()
        // formData.append('name', name)
        // formData.append('description', description)
        // formData.append('price', `${price}`)
        // formData.append('typeId', parseInt(e.target.type.value))
        // formData.append('img', file)
        // formData.append('info', JSON.stringify(info))
        // let res = await createDevice(formData)
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center">
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-5 text-3xl font-bold text-gray-900">
                        Create Category
                    </h2>
                </div>
                <form onSubmit={addCategory} className="mt-8 space-y-3" >
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Name</label>
                        <input onChange={
                            (e) => {
                                setname(e.target.value)
                            }
                        } value={name} className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="" placeholder="Name"/>
                    </div>



                    <div>
                        <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Category;