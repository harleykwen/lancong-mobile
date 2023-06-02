import API_URL from './apiUrl'
import { AxiosResponse } from 'axios'
import { http } from './http'

interface IGetTransactionDetail {
    id: string
}

interface IGetTransactionDraftDetail {
    id: string
}

export async function getTransactionListApi() {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.TRANSACTION.GET_ALL)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get transaction error'
    }
}

export async function getTransactionDetailApi(payload: IGetTransactionDetail) {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.TRANSACTION.DETAIL.replace(':transactionId', payload?.id))
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get transaction detail error'
    }
}

export async function getTransactionDraftListApi() {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.TRANSACTION.GET_ALL_DRAFT)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get transaction draft error'
    }
}

export async function getTransactionDraftDetailApi(payload: IGetTransactionDraftDetail) {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.TRANSACTION.DRAFT_DETAIL.replace(':transactionId', payload?.id))
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get transaction draft detail error'
    }
}