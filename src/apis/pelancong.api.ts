import { getAuthToken, xhr } from "./config"

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
        const response = await xhr.get('/user/pelancong', {
            headers: {
                'Authorization': 'Bearer ' + await getAuthToken(),
                'Accept': '*/*',
            }
        })
        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data?.message??'Error get pelancong'
    }
}

export async function AddPelancongApi(payload: IAddPelancongApi) {
    try {
        const response = await xhr.post('/user/pelancong/create', payload, {
            headers: {
                'Authorization': 'Bearer ' + await getAuthToken(),
                'Accept': '*/*',
            },
        })
        if (response.data.error) throw response.data.message
        return response.data.message
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data?.message??'Error add pelancong'
    }
}