import { getAuthToken, xhr } from "./config"

export async function getListVaApi() {
    try {
        const response = await xhr.get('/user/payment/virtual-account/banks', {
            headers: {
                'Authorization': 'Bearer ' + await getAuthToken(),
                'Accept': '*/*',
            }
        })
        if (response.data.error) throw response.data.message
        return response.data.data
    } catch (error: any) {
        console.log(error)
        throw error?.response?.data?.message??'Error get va list'
    }
}