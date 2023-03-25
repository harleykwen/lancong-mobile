import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { 
    Icon, 
    Stack, 
    Text, 
} from 'native-base'

interface IPelancongItem {
    data: any
}

const PelancongItem = (props: IPelancongItem) => {
    const { data } = props

    return (
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
    )
}

export default PelancongItem