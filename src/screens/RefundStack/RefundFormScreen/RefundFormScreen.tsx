import React from 'react'
import { IC_ARROW_BACK } from '../../../assets'
import { 
    Button,
    Center,
    Checkbox,
    Flex, 
    FormControl, 
    Image, 
    Input, 
    Pressable, 
    ScrollView, 
    Stack, 
    StatusBar, 
    Text,
    VStack,
    useDisclose, 
} from 'native-base'
import RequestVerification from './components/RequestVerification'
import SubmitVerification from './components/SubmitVerification'

interface IRefundFormScreen {
    navigation?: any
}

const RefundFormScreen: React.FC<IRefundFormScreen> = (props: IRefundFormScreen) => {
    const { navigation } = props

    const requestVerificationDisclosure = useDisclose()
    const submitVerificationDisclosure = useDisclose()

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
                >Refund Form</Text>
            </Stack>

            <ScrollView>
                <Flex padding='16px'>
                    <VStack space='8px'>
                        <Text fontSize='14px' fontFamily='Poppins-SemiBold'>Mohon lengkapi lampiran dibawah ini</Text> 
                        <FormControl isRequired marginTop='8px'>
                            <Stack>
                                <FormControl.Label _text={{ fontSize: '12px' }}>Nama Pemilik Rekening</FormControl.Label>
                                <Input size='lancSmall' />
                            </Stack>
                        </FormControl>
                        <FormControl isRequired>
                            <Stack>
                                <FormControl.Label _text={{ fontSize: '12px' }}>Nomor Rekening</FormControl.Label>
                                <Input size='lancSmall' />
                            </Stack>
                        </FormControl>
                        <FormControl isRequired>
                            <Stack>
                                <FormControl.Label _text={{ fontSize: '12px' }}>Bank</FormControl.Label>
                                <Input size='lancSmall' />
                            </Stack>
                        </FormControl>
                        <FormControl isRequired>
                            <Stack>
                                <FormControl.Label _text={{ fontSize: '12px' }}>Cabang</FormControl.Label>
                                <Input size='lancSmall' />
                            </Stack>
                        </FormControl>
                        <FormControl isRequired>
                            <Stack>
                                <FormControl.Label _text={{ fontSize: '12px' }}>Alasan Refund</FormControl.Label>
                                <Input multiline size='lancSmall' numberOfLines={3} />
                            </Stack>
                        </FormControl>

                        <VStack marginTop='8px' space='8px'>
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Dokumen Tambahan (Opsional) e.g Surat Perintah, Referensi Kesehatan, etc.</Text> 
                            <Button variant='lancOutline' size='lancSmall'>
                                Upload Additional Document
                            </Button>
                        </VStack>

                        <VStack marginTop='8px' space='8px'>
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Estimasi Jumlah Refund</Text> 
                            <Center backgroundColor='gray.300' padding='16px'>
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Rp. 125.000</Text> 
                            </Center>
                        </VStack>

                        <Checkbox 
                            value='aggreed' 
                            size='lancSmall'
                            marginTop='8px'
                        >
                            Saya telah membaca dan menyetujui Syarat & Ketentuan diatas
                        </Checkbox>

                        <Button marginTop='16px' onPress={requestVerificationDisclosure?.onOpen}>
                            Ajukan Refund
                        </Button>
                    </VStack>
                </Flex>

                <RequestVerification 
                    isOpen={requestVerificationDisclosure?.isOpen} 
                    onClose={requestVerificationDisclosure?.onClose} 
                    onSubmit={submitVerificationDisclosure?.onOpen}
                />

                <SubmitVerification 
                    isOpen={submitVerificationDisclosure?.isOpen} 
                    onClose={submitVerificationDisclosure?.onClose} 
                />
            </ScrollView>
        </Flex>
    )
}

export default RefundFormScreen