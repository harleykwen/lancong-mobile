import React, { useEffect } from 'react'
import { LOGO_GREEN } from '../../assets'
import { ROUTE_NAME } from '../../router'
import { ASYNC_STORAGE_NAME, asyncStorageGetitem } from '../../asyncStorage'
import { 
    Center, 
    Image, 
    View, 
    StatusBar, 
} from 'native-base'

interface ISplash {
    navigation?: any
}

const Splash: React.FC<ISplash> = (props: ISplash) => {
    const { navigation } = props

    async function handleRedirect() {
        const authToken = await asyncStorageGetitem(ASYNC_STORAGE_NAME.AUTH_TOKEN)
        if (authToken) {
            navigation.replace(ROUTE_NAME.MAIN_NAVIGATOR, { screen: ROUTE_NAME.MAIN_HOME })
        } else {
            navigation.replace(ROUTE_NAME.AUTH_NAVIGATOR, { screen: ROUTE_NAME.AUTH_SIGN_IN })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            handleRedirect()
        }, 3000)
    }, [])

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