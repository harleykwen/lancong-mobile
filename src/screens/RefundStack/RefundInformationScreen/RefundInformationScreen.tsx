import React from 'react'
import { IC_ARROW_BACK } from '../../../assets'
import { 
    Button,
    Center,
    Divider,
    Flex, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack, 
    StatusBar, 
    Text, 
} from 'native-base'
import { ROUTE_NAME } from '../../../router'

interface IRefundInformationScreen {
    navigation?: any
}

const RefundInformationScreen: React.FC<IRefundInformationScreen> = (props: IRefundInformationScreen) => {
    const { navigation } = props

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
            >
                <Pressable 
                    onPress={() => {
                        navigation?.goBack()
                    }}
                >
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='24px'
                        height='24px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Text
                    fontSize='16px' 
                    fontFamily='Poppins-SemiBold'
                >Refund Lancong Information</Text>
            </Stack>

            <ScrollView>
                <Flex padding='16px'>
                    <Flex 
                        padding='16px' 
                        backgroundColor='white' 
                        shadow='3' 
                        // rounded='md'
                    >
                        <Center 
                            paddingY='4px' 
                            paddingX='8px' 
                            backgroundColor='lancPrimaryLight'
                            rounded='full'
                            marginBottom='16px'
                            width='75px'
                            marginLeft='auto'
                        >
                            <Text fontSize='12px' fontFamily='Poppins-Regular' color='white'>Trip</Text>
                        </Center>
                        <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Berjuang Bersama Semeru</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular' marginTop='8px'>Kamis, 22 Desember 2023</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular'>2 Pax</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular'>3 Hari 2 Malam</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular'>Gunung Semeru</Text>
                    </Flex>

                    <Flex 
                        padding='16px' 
                        backgroundColor='white' 
                        shadow='3' 
                        marginTop='16px'
                        // rounded='md'
                    >
                        <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Lancong</Text>
                        <Divider marginTop='8px' />
                        <Flex direction='row' marginTop='8px'>
                            <Text 
                                fontSize='12px' 
                                fontFamily='Poppins-Regular' 
                                width='20px'
                            >1.</Text>
                            <Text fontSize='12px' fontFamily='Poppins-Regular' textAlign='justify'>Pengajuan refund tidak dapat dibatalkan  untuk alasan apa pun.</Text>
                        </Flex>
                        <Flex direction='row'>
                            <Text 
                                fontSize='12px' 
                                fontFamily='Poppins-Regular' 
                                width='20px'
                            >2.</Text>
                            <Text fontSize='12px' fontFamily='Poppins-Regular' textAlign='justify'>Refund untuk tiket pesawat bergantung pada kebijakan masing-masing maskapai. Mohon diingat bahwa refund dikenakan biaya Rp. 30.000 dari Lancong, per penumpang, per rute dan biaya pembatalan dari maskapai. Selain itu biaya lainnya dari masakapai juga berlaku.</Text>
                        </Flex>
                        <Flex direction='row'>
                            <Text 
                                fontSize='12px' 
                                fontFamily='Poppins-Regular' 
                                width='20px'
                            >3.</Text>
                            <Text fontSize='12px' fontFamily='Poppins-Regular' >Refund dapat dikembalikan dalam uang tunai, travel credits maskapai, kupon Lancong, atau Lancong   point.</Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex paddingX='16px' marginTop='16px'>
                    <Button 
                        variant='lancSolid'
                        onPress={() => {
                            navigation?.push(ROUTE_NAME?.REFUND_NAVIGATOR_TERMS_AND_CONDITIONS)
                        }}
                    >Lanjutkan</Button>
                </Flex>
            </ScrollView>
        </Flex>
    )
}

export default RefundInformationScreen