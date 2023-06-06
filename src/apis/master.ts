import API_URL from "./apiUrl"
import { AxiosResponse } from "axios"
import { http } from "./http"

interface IPlaceAutoCompleteApi {
    search: string
}

export async function getFacilitiesApi() {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.MASTER.FACILITIES)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'get facilities error'
    }
}

export async function placeAutoCompleteApi(payload: IPlaceAutoCompleteApi) {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.MASTER.PLACE_AUTOCOMPLETE, {
            params: {
                input: payload.search,
            },
        })
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'get place auto complete error'
    }
}