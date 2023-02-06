import { xhr } from "./config"

interface IRequestOtp {
    email: string
}

interface IValidateOtp {
    otp_id: string
    otp: string
    user: {
        name: string
        address: string
        phone: string
        avatar: string
        password: string
    },
    device_name: string
}

interface IResendOtp {
    otp_id: string
}

interface ILogin {
    email: string
    password: string
    device_name: string
}

export async function requestOtpApi(props: IRequestOtp) {
    try {
        const payload = {...props}
        const response = await xhr.post('/user/auth/register/request-otp', payload)

        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        throw error?.response?.data?.message??'Error request otp'
    }
}

export async function validateOtpApi(props: IValidateOtp) {
    try {
        const payload = {...props}
        const response = await xhr.post('/user/auth/register/validate-otp', payload)

        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data?.message??'Error validate otp'
    }
}

export async function resendOtpApi(props: IResendOtp) {
    try {
        const payload = {...props}
        const response = await xhr.post('/user/auth/register/resend-otp', payload)

        if (response.data.error) throw response.data.message
        console.log(response.data.data)
        return response.data.data
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data?.message??'Error resend otp'
    }
}

export async function loginApi(props: ILogin) {
    try {
        const payload = {...props}
        const response = await xhr.post('/user/auth/login', payload)

        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        throw error?.response?.data?.message??'Error login'
    }
}