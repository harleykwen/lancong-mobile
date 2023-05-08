import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ROUTE_NAME } from '../../../../router'
import { 
    Icon, 
    Pressable, 
    Stack, 
    Text, 
} from 'native-base'

interface IPelancongItem {
    data: any
    navigation?: any
}

const PelancongItem = (props: IPelancongItem) => {
    const { data, navigation } = props

    return (
        <Pressable onPress={() => {
            navigation?.push(ROUTE_NAME.PROFILE_NAVIGATOR_DETAIL_PELANCONG_DATA, { data })
        }}>
            <Stack 
                padding='16px' 
                rounded='md' 
                backgroundColor='white' 
                shadow='5'
                alignItems='center'
                justifyContent='space-between'
                direction='row'
            >
                <Text
                    fontFamily='Poppins-SemiBold' 
                    fontSize='15px'
                    color='black'
                    textAlign='center'
                >{data?.name}</Text>
                <Icon 
                    as={MaterialIcons} 
                    name='chevron-right' 
                    color='gray.600' 
                    size='md' 
                />
            </Stack>
        </Pressable>
    )
}

export default PelancongItem