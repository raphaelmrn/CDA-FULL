import axios from "axios"
import { Ad, Category, Tag } from "../types/Api"

const api = axios.create({
    baseURL:"http://localhost:3000/",
})

const searchAds = async (needle:string):Promise<Ad[]>=>{
    const {data} = await api.get(`/ads?needle=${needle}`)
    return data
}
const getCategories = async ():Promise<Category[]>=>{
    const {data} = await api.get(`/categories`)
    return data
}
const getTags = async ():Promise<Tag[]>=>{
    const {data} = await api.get(`/tags`)
    return data
}


export default {
    searchAds,
    getCategories,
    getTags
}
