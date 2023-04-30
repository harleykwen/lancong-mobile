import API_URL from './apiUrl'
import { http } from './http'
import { AxiosResponse } from 'axios'

interface IRequestOtpApi {
    email: string
}

interface IResendOtpApi {
    otp_id: string
}

interface IValidateOtpApi {
    otp_id: string
    otp: string
    user: {
        name: string
        address: string
        phone: string
        password: string
        avatar?: {
            filename?: string
            content?: string
        }
    }
    device_name: string
}

async function requestOtpApi(props: IRequestOtpApi) {
    try {
        const response: AxiosResponse = await http({ useAuth: false }).post(API_URL.REGISTER.REQUEST_OTP, props)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Request OTP error'
    }
}

async function resendOtpApi(props: IResendOtpApi) {
    try {
        const response: AxiosResponse = await http({ useAuth: false }).post(API_URL.REGISTER.RESEND_OTP, props)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Resend OTP error'
    }
}

async function validateOtpApi(props: IValidateOtpApi) {
    try {
        const response: AxiosResponse = await http({ useAuth: false }).post(API_URL.REGISTER.VALIDATE_OTP, props)
        if (response?.data?.error) throw response
        return response?.data
    } catch (error: any) {
        throw error?.data?.message??'Validate OTP error'
    }
}

export { requestOtpApi, resendOtpApi, validateOtpApi }