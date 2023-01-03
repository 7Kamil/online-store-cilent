import React, {useEffect, useState} from 'react';
import {createDevice, fetchCategories, fetchDevices} from "../http/deviceApi";

const Device = () => {
    const [device, setDevice] = useState({info: []});
    const [name,setname] = useState('');
    const [description,setDesctiption] = useState('');
    const [price,setprice] = useState('');
    const [info, setInfo] = useState([])
    const [file, setFile] = useState(null);
    const [cats,setCats] = useState([]);
    const selectFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    useEffect(() => {
        fetchCategories().then(data => {
            setCats(data);
        });
    }, []);


    const addDevice = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', `${price}`)
        formData.append('typeId', parseInt(e.target.type.value))
        formData.append('img', file)
        formData.append('info', JSON.stringify(info))
        let res = await createDevice(formData)
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center">
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-5 text-3xl font-bold text-gray-900">
                       Create Coin
                    </h2>
                </div>
                <form onSubmit={addDevice} className="mt-8 space-y-3" >
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Name</label>
                        <input onChange={
                            (e) => {
                                setname(e.target.value)
                            }
                        } value={name} className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="" placeholder="Name"/>
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Description</label>
                         <textarea onChange={
                             (e) => {
                                 setDesctiption(e.target.value)
                             }}
                             id="message" rows="4"
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Write description here..."></textarea>

                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Price</label>
                        <input type={"number"}  onChange={
                            (e) => {
                                setprice(e.target.value)
                            }
                        } value={price} className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" placeholder="Price"/>
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                            type</label>
                        <select id="type"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {cats.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                        <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image"/>
                                    </div>
                                    <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                </div>
                                <input type="file"  className="hidden" onChange={selectFile}/>
                            </label>
                        </div>
                    </div>
                    <p className="text-sm text-gray-300">
                        <span>File type: doc,pdf,types of images</span>
                    </p>

                    <p className="text-sm text-gray-300">
                        <span>Xarakteristiki:</span>
                        <button type={"button"} onClick={addInfo} className={"ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Add + </button>
                    </p>
                    {info.map((i,index) => (
                        <div key={index} className="grid grid-cols-3">
                            <input onChange={
                                (e) => {
                                    changeInfo('title',e.target.value,i.number)
                                }
                                }
                             value={i.title} className="text-base pl-2 mr-4 pt-2 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="" placeholder="Title"/>
                            <input onChange={
                                (e) => {
                                    changeInfo('description',e.target.value,i.number)
                                }
                            }
                                 value={i.description} className="text-base pl-2 pt-2 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="" placeholder="Description"/>
                            <button type={"button"} onClick={() => removeInfo(i.number)} className={"ml-3.5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}>Remove</button>
                        </div>
                    ))}



                    <div>
                        <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                            Create Coin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Device;