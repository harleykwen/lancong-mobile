import API_URL from './apiUrl'
import { AxiosResponse } from 'axios'
import { http } from './http'

interface IBlueprintApi {
    transactionId: string
    term_plan: number | null
    payment_date: number | null
}

interface IInstallmentCreateApi {
    transaction_id: any
    term_plan: any
    payment_date: any
    bank_code: any
}

export async function bankListApi() {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.VA.BANK_LIST)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get bank list error'
    }
}

export async function blueprintApi(props: IBlueprintApi) {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.VA.BLUEPRINT?.replace(':transactionId', props?.transactionId), {
            params: {
                term_plan: props?.term_plan,
                payment_date: props?.payment_date,
            }
        })
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get blueprint error'
    }
}

export async function installmentCreateApi(props: IInstallmentCreateApi) {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).post(API_URL.VA.INSTALLMENT_CREATE?.replace(':transactionId', props?.transaction_id), {
            term_plan: props?.term_plan,
            payment_date: props?.payment_date,
            bank_code: props?.bank_code,
        })
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Create installment error'
    }
}