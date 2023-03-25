import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { 
    Icon, 
    Pressable, 
    Stack, 
    Text, 
} from 'native-base'

interface IPickPelancongItem {
    data: any
    onSelectPelancong: any
    index: number
}

const PickPelancongItem = (props: IPickPelancongItem) => {
    const { 
        data, 
        onSelectPelancong, 
        index,
    } = props

    return (
        <Pressable
            onPress={() => onSelectPelancong(index, data)}
        >
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

export default PickPelancongItem