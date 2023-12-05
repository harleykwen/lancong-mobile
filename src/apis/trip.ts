import API_URL from './apiUrl'
import { http } from './http'
import { AxiosResponse } from 'axios'

interface ITripSearchApi {
    type: string
    destination: string
    group: string
    trip_start: any
    participant: string
}

interface ITripCreateTransactionApi {
    trip_id: string
    package_id: string
    group: string
    pax: number
    trip_start: number | null
}

interface IUpdateTransactionTripApi {
    id: string
    participants?: string[]
    special_requests?: any[]
}

interface ITripCheckout {
    transaction_id: string
    bank_code: string
}

interface ITripDetailApi {
    id: string
    group: string
    packages: string
}

interface GetFullPaymentSummaryApiProps {
    transactionId: string
}

export async function tripTypesApi() {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.TRIP.TYPES)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get trip types error'
    }
}

export async function tripOptionsApi() {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.TRIP.OPTIONS)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get trip options error'
    }
}

export async function tripSearchApi(props: ITripSearchApi) {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.TRIP.SEARCH, { params: props })
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Search trip error'
    }
}

export async function tripCreateTransactionApi(props: ITripCreateTransactionApi) {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).post(API_URL.TRIP.CREATE_TRANSACTION, props)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Create trip transaction error'
    }
}

export async function updateTransactionTripApi(payload: IUpdateTransactionTripApi) {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).put(API_URL.TRIP.UPDATE_TRANSACTION?.replace(':transactionId', payload?.id), {
            participants: payload?.participants,
            special_requests: payload?.special_requests,
        })
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Update trip transaction error'
    }
}

export async function tripCheckoutApi(payload: ITripCheckout) {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).post(API_URL.TRIP.CHECKOUT, payload)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Checkout trip error'
    }
}

export async function tripDetailApi(payload: ITripDetailApi) {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.TRIP.DETAIL?.replace(':id', payload?.id), { 
            params: {
                group: payload?.group,
                packages: payload?.packages,
            } 
        })
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get trip detail error'
    }
}

export async function getFullPaymentSummaryApiProps(payload: GetFullPaymentSummaryApiProps) {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.TRIP.FULL_PAYMENT_SUMMARY?.replace(':transactionId', payload?.transactionId))
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get trip full payment summary'
    }
}