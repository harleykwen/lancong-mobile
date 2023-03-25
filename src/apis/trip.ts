import { getAuthToken, xhr } from "./config"

interface IGetTripList {
    type: string
    destination: string
    group: string
    trip_start: number
    participant: string
}

interface IGetTripTypeList {
    id: any
}

export async function getTripListApi(props: IGetTripList) {
    try {
        const payload = {...props}
        const response = await xhr.get('/user/trip', {
            params: {
                ...payload,
            },
            headers: {
                'Authorization': 'Bearer ' + await getAuthToken(),
                'Accept': '*/*',
            }
        })

        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data?.message??'Error get trip list'
    }
}

export async function getTripTypeListApi(props: IGetTripTypeList) {
    try {
        const payload = {...props}
        const response = await xhr.get('/user/trip/get', {
            params: {
                ...payload,
            },
            headers: {
                'Authorization': 'Bearer ' + await getAuthToken(),
                'Accept': '*/*',
            }
        })

        console.log(response)
        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data?.message??'Error get trip type list'
    }
}

export async function getTripTypesApi() {
    try {
        const response = await xhr.get('/master/trip/types', {
            headers: {
                'Authorization': 'Bearer ' + await getAuthToken(),
                'Accept': '*/*',
            }
        })
        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data?.message??'Error get trip types'
    }
}