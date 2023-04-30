import API_URL from './apiUrl'
import { http } from './http'
import { AxiosResponse } from 'axios'

interface ILoginApi {
    email: string
    password: string
    device_name: string
}

async function loginApi(props: ILoginApi) {
    try {
        const response: AxiosResponse = await http({ useAuth: false }).post(API_URL.AUTH.LOGIN, props)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Login error'
    }
}

async function logoutApi() {
    try {
        const response: AxiosResponse = await http({ useAuth: true }).get(API_URL.AUTH.LOGOUT)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Logout error'
    }
}

export { loginApi, logoutApi }