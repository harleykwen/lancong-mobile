import API_URL from './apiUrl'
import { AxiosResponse } from 'axios'
import { http } from './http'

interface IAddPelancongApi {
    name: string
    birthdate: number | string
    email: string
    phone: string
    identity: {
        citizenship: string
        id_number: string
    }
    passport: {
        passport_number?: string
        publication_date?: number | string
        expiration_date?: number | string
    }
}

export async function getPelancongApi() {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.PELANCONG.GET_ALL)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Get all pelancong error'
    }
}

export async function AddPelancongApi(payload: IAddPelancongApi) {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).post(API_URL.PELANCONG.CREATE, payload)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Create pelancong error'
    }
}