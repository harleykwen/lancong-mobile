import { Center, Text } from 'native-base'
import React, { useEffect } from 'react'
import { Image } from 'react-native'
import { LOGO_GREEN } from '../../assets'

interface ISplash {
    navigation: any
}

const Splash = (props: ISplash) => {
    const { navigation } = props

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('login')
        }, 3000)
    }, [])

    return (
        <Center backgroundColor={'white'} height={'100%'}>
            <Image source={LOGO_GREEN} style={{ width: 70, height: 91.32 }} />
        </Center>
    )
}

export default Splash