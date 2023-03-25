import { getAuthToken, xhr } from "./config"

interface ICreateTransactionTripApi {
    trip_id: string
    package_id: string
    group: string
}

interface IGetTransactionDetail {
    id?: string
}

export async function createTransactionTripApi(payload: ICreateTransactionTripApi) {
    try {
        const response = await xhr.post('/user/trip/order/create-transaction', payload, {
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