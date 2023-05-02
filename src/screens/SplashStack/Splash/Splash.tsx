import React, { useEffect } from 'react'
import { LOGO_GREEN } from '../../../assets'
import { ROUTE_NAME } from '../../../router'
import { ASYNC_STORAGE_NAME, asyncStorageDeleteitem, asyncStorageGetitem } from '../../../asyncStorage'
import { 
    Center, 
    Image, 
    View, 
    StatusBar, 
} from 'native-base'
import { useQuery } from 'react-query'
import { profileApi } from '../../../apis/user'

interface ISplash {
    navigation?: any
}

const Splash: React.FC<ISplash> = (props: ISplash) => {
    const { navigation } = props

    const user = useQuery('user', profileApi, {
        onSuccess: () => {
            navigation.replace(ROUTE_NAME.MAIN_NAVIGATOR, { 
                screen: ROUTE_NAME.MAIN_NAVIGATOR_HOME 
            })
        },
        onError: async () => {
            await asyncStorageDeleteitem(ASYNC_STORAGE_NAME.AUTH_TOKEN)
            await asyncStorageDeleteitem(ASYNC_STORAGE_NAME.AUTH_SECRET)
            navigation?.replace(ROUTE_NAME.AUTH_NAVIGATOR, {
                screen: ROUTE_NAME.AUTH_NAVIGATOR_SIGN_IN,
            })
        }
    })

    return (
        <View flex={1}>
            <StatusBar backgroundColor='white' />
            <Center flex={1} backgroundColor='white'>
                <Image
                    source={LOGO_GREEN}
                    width='150px'
                    height='150px'
                    alt='LOGO_GREEN'
                />
            </Center>
        </View>
    )
}

export default Splash