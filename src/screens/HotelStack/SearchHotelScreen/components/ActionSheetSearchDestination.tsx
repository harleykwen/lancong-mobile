import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Dimensions } from 'react-native'
import { 
    Actionsheet, 
    Icon, 
    Input, 
    Pressable, 
    ScrollView, 
    Select, 
    Stack, 
    Text 
} from 'native-base'

interface IActionSheetSearchDestination {
    isOpen: boolean
    onClose: () => void
}

const ActionSheetSearchDestination = (props: IActionSheetSearchDestination) => {
    const { isOpen, onClose } = props

    return (
        <Actionsheet 
            isOpen={isOpen} 
            onClose={onClose}
        >
            <Actionsheet.Content alignItems='flex-start' padding='0px'>
                <Stack 
                    direction='column' 
                    space='20px'
                    padding='16px' 
                    width='100%' 
                    height={Dimensions.get('window').height}
                >
                    <Stack 
                        direction='row' 
                        alignItems='center' 
                        space='10px'
                    >
                        <Icon 
                            as={MaterialIcons} 
                            name='close' 
                            size='xl' 
                            color='black' 
                            onPress={onClose} 
                        />
                        <Text 
                            marginTop='1px' 
                            fontSize='18px' 
                            fontFamily='Poppins-SemiBold'
                        >Mau nginep dimana nih?</Text>
                    </Stack>
                    <Input 
                        height='50px'
                        borderWidth='0px' 
                        backgroundColor='gray.200' 
                        rounded='full' 
                        fontSize='14px'
                        fontFamily='Poppins-Regular'
                        paddingY='8px'
                        placeholder='Cari destinasi ...'
                        InputLeftElement={<Icon as={MaterialIcons} name='search' color='gray.400' size='lg' marginLeft='16px' />}
                        InputRightElement={
                            <Pressable>
                                <Icon as={Ionicons} name='close-circle' color='gray.400' size='md' marginRight='16px' />
                            </Pressable>
                        }
                    />
                    {/* <Flex height={Dimensions.get('window').height - 301}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {[...Array(100)].map((_, index) => {
                                return <Text>halo {index}</Text>
                            })}
                        </ScrollView>
                    </Flex> */}
                </Stack>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default ActionSheetSearchDestination