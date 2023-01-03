import {$authHost,$host} from "./index";
import jwt_decode from "jwt-decode";


export const createDevice = async (f) => {
    const {data} = await $authHost.post('api/device', f)
    return data
}

export const fetchDevices = async (query,page,limit) => {
    const {data} = await $authHost.get('api/device', {params: {
            query,page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $authHost.get('api/device/' + id)
    return data
}

export const createCategory = async (f) => {
    const {data} = await $authHost.post('api/type', f)
    return data
}
export const fetchCategories = async () => {
    const {data} = await $authHost.get('api/type')
    return data
}