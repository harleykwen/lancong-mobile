import { getAuthToken, xhr } from "./config"

interface ICreateTransactionTripApi {
    trip_id: string
    package_id: string
    group: string
    pax: number
    trip_start: number
}

interface IGetTransactionDetail {
    id?: string
}

interface IUpdateTransactionTripApi {
    id: string
    participants?: string[]
    special_requests?: any[]
}

export async function createTransactionTripApi(payload: ICreateTransactionTripApi) {
    try {
        const response = await xhr.post('/user/trip/transaction/create', payload, {
            headers: {
                'Authorization': 'Bearer ' + await getAuthToken(),
                'Accept': '*/*',
            }
        })
        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data?.message??'Error create transaction'
    }
}

export async function getTransactionListApi() {
    try {
        const response = await xhr.get('/user/transaction', {
            headers: {
                'Authorization': 'Bearer ' + await getAuthToken(),
                'Accept': '*/*',
            }
        })
        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data?.message??'Error get list transaction'
    }
}

export async function getTransactionDetailApi(payload: IGetTransactionDetail) {
    try {
        const response = await xhr.get(`/user/transaction/${payload?.id}`, {
            headers: {
                'Authorization': 'Bearer ' + await getAuthToken(),
                'Accept': '*/*',
            }
        })
        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data?.message??'Error get transaction detail'
    }
}

export async function updateTransactionTripApi(payload: IUpdateTransactionTripApi) {
    try {
        const response = await xhr.put(
            `/user/trip/transaction/${payload?.id}/update`, 
            {
                participants: payload?.participants,
                special_requests: payload?.special_requests,
            }, 
            {
                headers: {
                    'Authorization': 'Bearer ' + await getAuthToken(),
                    'Accept': '*/*',
                }
            },
        )
        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data?.message??'Error update trip transaction'
    }
}