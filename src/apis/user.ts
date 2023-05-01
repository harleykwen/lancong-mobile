import API_URL from './apiUrl'
import { AxiosResponse } from 'axios'
import { http } from './http'

export async function profileApi() {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.USER.PROFILE)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get profile error'
    }
}