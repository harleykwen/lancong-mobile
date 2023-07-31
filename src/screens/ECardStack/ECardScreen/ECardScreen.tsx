import React from 'react'
import { IC_THREE_DOTS_VERTICAL } from '../../../assets'
import { 
    Actionsheet,
    Button, 
    Center, 
    Flex, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack, 
    StatusBar, 
    Text,
    useDisclose, 
} from 'native-base'
import { ROUTE_NAME } from '../../../router'

interface ECardScreenInterface {
    navigation?: any
}

const ECardScreen: React.FC<ECardScreenInterface> = (props: ECardScreenInterface) => {
    const { navigation } = props

    const disclosure = useDisclose()

    return (
        <Flex backgroundColor='white' flex={1}>
            <StatusBar barStyle='dark-content' backgroundColor='white' />
            <Stack 
                direction='row' 
                paddingX='16px'
                paddingY='8px' 
                shadow='3' 
                backgroundColor='white'
                space='8px'
                alignItems='center'
                justifyContent='center'
            >
                <Text 
                    textAlign='center' 
                    fontSize='16px' 
                    fontFamily='Poppins-SemiBold'
                >E - Card</Text>
            </Stack>
            <Stack 
                direction='row' 
                paddingX='16px' 
                paddingTop='16px' 
                space='4px'
            >
                <Center 
                    paddingY='4px' 
                    paddingX='16px' 
                    rounded='full' 
                    backgroundColor='lancPrimaryLight'
                >
                    <Text fontSize='12px' color='white'>Trip</Text>
                </Center>
                <Center 
                    paddingY='4px' 
                    paddingX='16px' 
                    rounded='full' 
                    borderColor='gray.300'
                    borderWidth='1px'
                >
                    <Text fontSize='12px' color='black'>Hotel</Text>
                </Center>
                <Center 
                    paddingY='4px' 
                    paddingX='16px' 
                    rounded='full' 
                    borderColor='gray.300'
                    borderWidth='1px'
                >
                    <Text fontSize='12px' color='black'>Pesawat</Text>
                </Center>
                <Center 
                    paddingY='4px' 
                    paddingX='16px' 
                    rounded='full' 
                    borderColor='gray.300'
                    borderWidth='1px'
                >
                    <Text fontSize='12px' color='black'>Kereta</Text>
                </Center>
            </Stack>
            <ScrollView>
                <Flex padding='16px'>
                    <Flex 
                        padding='16px' 
                        backgroundColor='white' 
                        shadow='3' 
                        rounded='md'
                    >
                        <Stack 
                            direction='row' 
                            alignItems='center' 
                            justifyContent='space-between' 
                        >
                            <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Berjuang Bersama Semeru</Text>
                            <Pressable onPress={disclosure.onOpen}>
                                <Image 
                                    alt='three-dots'
                                    source={IC_THREE_DOTS_VERTICAL}
                                    width='20px'
                                    height='20px'
                                />
                            </Pressable>
                        </Stack>
                        <Text fontSize='12px' fontFamily='Poppins-Regular' marginTop='8px'>Kamis, 22 Desember 2023</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular'>2 Pax</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular'>3 Hari 2 Malam</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular'>Gunung Semeru</Text>
                        <Button 
                            variant='lancSolid' 
                            size='sm'
                            marginTop='8px'
                            rounded='none'
                            _text={{ fontSize: '12px' }}
                        >E-Card has been issued</Button>
                    </Flex>
                </Flex>
            </ScrollView>

            <Actionsheet isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
                <Actionsheet.Content
                    padding='16px'
                    backgroundColor='lancBackgroundLight'
                    alignItems='flex-start'
                >
                    <Stack space='16px'>
                        <Pressable>
                            <Text color='black' fontSize='14px'>E-Card Detail</Text>
                        </Pressable>
                        <Pressable>
                            <Text color='black' fontSize='14px'>Reschedule</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                navigation?.navigate(ROUTE_NAME.REFUND_NAVIGATOR, {
                                    screen: ROUTE_NAME.REFUND_NAVIGATOR_REFUND,
                                })
                            }}
                        >
                            <Text color='black' fontSize='14px'>Refund</Text>
                        </Pressable>
                        <Pressable>
                            <Text color='black' fontSize='14px'>Send E-Card</Text>
                        </Pressable>
                    </Stack>
                </Actionsheet.Content>
            </Actionsheet>
        </Flex>
    )
}

export default ECardScreen