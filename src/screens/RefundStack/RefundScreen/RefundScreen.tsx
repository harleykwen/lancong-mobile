import React from 'react'
import { IC_ARROW_BACK } from '../../../assets'
import { 
    Button,
    Flex, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack, 
    StatusBar, 
    Text, 
} from 'native-base'
import { ROUTE_NAME } from '../../../router'

interface RefundScreenInterface {
    navigation?: any
}

const RefundScreen: React.FC<RefundScreenInterface> = (props: RefundScreenInterface) => {
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
                >Refund</Text>
            </Stack>

            <ScrollView>
                <Flex padding='16px'>
                    <Flex 
                        padding='16px' 
                        backgroundColor='white' 
                        shadow='3' 
                        // rounded='md'
                    >
                        <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Berjuang Bersama Semeru</Text>
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

                    <Flex 
                        padding='16px' 
                        shadow='3' 
                        backgroundColor='white'
                        marginTop='16px'
                    >
                        <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Kebijakan Refund</Text>
                        <Stack space='16px' marginTop='16px'>
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Refund mungkin tidak berlaku untuk alasan</Text>  
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Jumlah refund tergantung pada alasan dan tanggal pengajuan refund, dihitung berdasarkan tarif dasar.</Text>  
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Sebagai informasi, refund dapat dikembalikan dalam bentuk uang tunai, Kupon Lancong, atau Lancong Poin.</Text>  
                        </Stack>
                        <Flex 
                            borderColor='gray.300' 
                            borderWidth='1px' 
                            padding='16px' 
                            marginTop='16px'
                        > 
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Kurang dari 45 Hari S/d 30 hari sebelum Waktu keberangkatan.</Text>  
                            <Text fontSize='12px' fontFamily='Poppins-Regular'>Sebelum 22 November 2023 (15:30 waktu Jakarta)</Text>  
                            <Flex
                                alignItems='center'
                                justifyContent='space-between'
                                marginTop='16px'
                                direction='row'
                            >
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Adult</Text>  
                                <Text fontSize='12px' fontFamily='Poppins-Regular'>IDR 125.000 / pax</Text> 
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex paddingX='16px' marginTop='16px'>
                    <Button 
                        variant='lancSolid'
                        onPress={() => {
                            navigation?.push(ROUTE_NAME?.REFUND_NAVIGATOR_INFORMATION)
                        }}
                    >Mulai Refund</Button>
                </Flex>
            </ScrollView>
        </Flex>
    )
}

export default RefundScreen