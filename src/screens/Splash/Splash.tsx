import { Center } from 'native-base'
import React, { useEffect } from 'react'
import { Image } from 'react-native'
import { getAuthToken, removeAuthToken } from '../../apis/config'
import { LOGO_GREEN } from '../../assets'

interface ISplash {
    navigation: any
}

const Splash = (props: ISplash) => {
    const { navigation } = props

    useEffect(() => {
        setTimeout( async () => {
            const token: any = await getAuthToken()
            if (token) {
                navigation.replace('main')
            } else {
                navigation.replace('login')
            }
        }, 3000)
    }, [])

    return (
        <Center backgroundColor={'white'} height={'100%'}>
            <Image source={LOGO_GREEN} style={{ width: 70, height: 91.32 }} />
        </Center>
    )
}

export default Splash