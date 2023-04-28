import axios, { 
    AxiosResponse, 
    AxiosError, 
    CreateAxiosDefaults,
} from 'axios'
import { REACT_APP_BASE_API_URL, REACT_APP_API_URL_VERSION } from "@env"
import { ASYNC_STORAGE_NAME, asyncStorageGetitem } from '../asyncStorage'

interface IHttp {
    useAuth: boolean
}

const http = (props: IHttp) => {
    const { useAuth } = props

    let options: CreateAxiosDefaults = {
        baseURL: `${REACT_APP_BASE_API_URL}${REACT_APP_API_URL_VERSION}`
    }

    const network = axios.create(options)

    network.interceptors.request.use(
        async function (config) {
            // Do something before request is sent
            const authToken = await asyncStorageGetitem(ASYNC_STORAGE_NAME.AUTH_TOKEN)
            if (useAuth) {
                config.headers.Authorization = `Bearer ${authToken}`
            }
            return config
        }, 
        function (error) {
            // Do something with request error
            return Promise.reject(error)
        }
    )

    network.interceptors.response.use(
        function (response: AxiosResponse) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response
        }, 
        function (error: AxiosError) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error?.response)
        }
    )

    return network
}

export { http }