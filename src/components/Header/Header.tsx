import React from 'react'
import * as Unicons from 'react-native-unicons'
import { Center, Icon, Pressable, Text } from 'native-base'

interface IHeader {
    title?: string
    subtitle?: string
    onPressBack?: any
}

const Header = (props: IHeader) => {
    const { title, subtitle, onPressBack } = props

    return (
        <Center height='50px' width='100%' backgroundColor='#038103'>
            {title
                ?   <Text fontSize='16px' color='white' fontWeight='semibold'>{title}</Text>
                :   null
            }
            
            {subtitle
                ?   <Text fontSize='12px' color='white'>{subtitle}</Text>
                :   null
            }
            
            {onPressBack
                ?   <Pressable position='absolute' left='10px' onPress={onPressBack}>
                        <Icon as={Unicons.ArrowLeft} color='white' />
                    </Pressable>
                :   null
            }
        </Center>
    )
}

export default Header