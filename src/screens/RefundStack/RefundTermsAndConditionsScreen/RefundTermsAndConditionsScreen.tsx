import React, { useState } from 'react'
import { IC_ARROW_BACK } from '../../../assets'
import { 
    Alert,
    Button,
    Center,
    Checkbox,
    Flex, 
    HStack, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack, 
    StatusBar, 
    Text,
    VStack, 
} from 'native-base'
import { ROUTE_NAME } from '../../../router'

interface RefundTermsAndConditionsScreenInterface {
    navigation?: any
}

const RefundTermsAndConditionsScreen: React.FC<RefundTermsAndConditionsScreenInterface> = (props: RefundTermsAndConditionsScreenInterface) => {
    const { navigation } = props

    const [isAgreed, setIsAgreed] = useState(false)

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
                >Refund Terms and Conditions</Text>
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
                        shadow='3' 
                        backgroundColor='white'
                        marginTop='16px'
                    >   
                        <Text fontSize='12px' fontFamily='Poppins-Regular'>Jumlah refund tergantung pada alasan dan Tanggal Pengajuan refund, dihitung berdasarkan tarif dasar.</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular' marginTop='8px'>Sebagai informasi, refund dapat dikembalikan dalam bentuk uang tunai, Kupon Lancong, atau Lancong Poin.</Text>
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

                        <Alert w="100%" status='info' marginTop='16px'>
                            <VStack space={2} flexShrink={1} w="100%">
                                <HStack flexShrink={1} space={2} justifyContent="space-between">
                                    <HStack space={2} flexShrink={1}>
                                        <Alert.Icon />
                                        <Text fontSize='12px' fontFamily='Poppins-Regular'>
                                            Estimasi Jumlah refund sudah dikurangi biaya refund, diskon dan pajak berlaku.
                                        </Text>
                                    </HStack>
                                </HStack>
                            </VStack>
                        </Alert>

                        <Text fontSize='14px' fontFamily='Poppins-SemiBold' marginTop='16px'>Proses Refund</Text>
                        <Text fontSize='12px' fontFamily='Poppins-Regular' textAlign='justify'>Proses refund memerlukan hingga 30 hari atau bahkan lebih karena dibutuhkannya koordinasi menyeluruh antara Lancong dengan pihak penyedia trip.</Text>

                        <Checkbox 
                            value='aggreed' 
                            size='lancSmall'
                            isChecked={isAgreed}
                            onChange={() => setIsAgreed(!isAgreed)}
                        >
                            Saya menyetujui kebijakan refund
                        </Checkbox>
                    </Flex>
                </Flex>

                <Flex paddingX='16px' marginTop='16px' paddingBottom='16px'>
                    <Button 
                        variant='lancSolid' 
                        isDisabled={!isAgreed}
                        onPress={() => {
                            navigation?.push(ROUTE_NAME?.REFUND_NAVIGATOR_FORM)
                        }}
                    >Lanjutkan</Button>
                </Flex>
            </ScrollView>
        </Flex>
    )
}

export default RefundTermsAndConditionsScreen