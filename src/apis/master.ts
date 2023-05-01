import API_URL from "./apiUrl"
import { AxiosResponse } from "axios"
import { http } from "./http"

export async function getFacilitiesApi() {
    try {
        const response: AxiosResponse = await http({ useAuth: false }).get(API_URL.MASTER.FACILITIES)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'get facilities error'
    }
}