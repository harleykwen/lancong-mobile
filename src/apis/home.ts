import API_URL from './apiUrl'
import { AxiosResponse } from 'axios'
import { http } from './http'

export async function activePaymentApi() {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.HOME.ACTIVE_PAYMENT)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get active payment error'
    }
}

export async function tripSuggestionApi() {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.HOME.TRIP_SUGGESTION)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get trip suggestion error'
    }
}