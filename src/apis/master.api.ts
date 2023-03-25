import { xhr } from "./config"

export async function getFacilitiesApi() {
    try {
        const response = await xhr.get('/master/trip/facilities')
        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        throw error?.response?.data?.message??'Error get facilities'
    }
}