import API_URL from "./apiUrl"
import { xhr } from "./config"

export interface ILoginApi {
    email: string
    password: string
    device_name: string
}

export async function loginApi(payload: ILoginApi) {
    try {
        const response = await xhr.post(API_URL.LOGIN, payload)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}