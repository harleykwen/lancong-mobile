import React from 'react'
import { IC_CONTENT_COPY, IMG_CHECKED } from '../../../assets'
import { 
    Button, 
    Flex, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack, 
    Text,
    useClipboard, 
} from 'native-base'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ROUTE_NAME } from '../../../router'

interface ITripCheckoutComplete {
    navigation?: any
    route?: any
}

const TripCheckoutComplete: React.FC<ITripCheckoutComplete> = (props: ITripCheckoutComplete) => {
    const { navigation, route } = props
    const { transaction } = route?.params
    const { value, onCopy } = useClipboard()

    return (
        <Flex flex='1' backgroundColor='lancBackgroundLight'>
            <Stack 
                justifyContent='center' 
                alignItems='center' 
                padding='16px' 
                shadow='3' 
                backgroundColor='lancBackgroundLight'
            >
                <Text fontFamily='Poppins-SemiBold'>Menunggu Pembayaran</Text>
            </Stack>
            <ScrollView>
                <Stack padding='16px' space='16px'>
                    <Image
                        alt='IMG_CHECKED'
                        source={IMG_CHECKED}
                        width='112px'
                        height='112px'
                        marginX='auto'
                        marginTop='16px'
                    />
                    <Stack 
                        direction='row' 
                        marginTop='16px' 
                        justifyContent='space-between'
                    >
                        <Stack>
                            <Text color='lancOutlineLight'>Batas Akhir Pembayaran</Text>
                            <Text fontFamily='Poppins-SemiBold'>{format(new Date(transaction?.data?.order[transaction?.data?.order?.payment_method]?.expiration_date), 'EEEE, dd MMMM yyyy HH:mm', { locale: id })} WIB</Text>
                        </Stack>
                        <Pressable>

                        </Pressable>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Stack>
                            <Text color='lancOutlineLight'>Metode Pembayaran</Text>
                            <Text fontFamily='Poppins-SemiBold'>{transaction?.data?.order[transaction?.data?.order?.payment_method]?.bank_code} {transaction?.data?.order?.payment_method?.replace('_', ' ')}</Text>
                        </Stack>
                    </Stack>
                    <Stack 
                        alignItems='center' 
                        direction='row' 
                        justifyContent='space-between'
                    >
                        <Stack>
                            <Text color='lancOutlineLight'>Total Pembayaran</Text>
                            <Text fontFamily='Poppins-SemiBold'>Rp. {transaction?.data?.order[transaction?.data?.order?.payment_method]?.expected_amount?.toLocaleString('id')}</Text>
                        </Stack>
                        <Pressable
                            onPress={() => onCopy(`${transaction?.data?.order[transaction?.data?.order?.payment_method]?.expected_amount}`)}
                        >
                            <Stack 
                                direction='row' 
                                alignItems='center' 
                                space='4px'
                            >
                                <Text 
                                    color='lancPrimaryLight' 
                                    fontSize='12px' 
                                    fontFamily='Poppins-SemiBold'
                                >Salin</Text>
                                <Image
                                    alt='IC_CONTENT_COPY'
                                    source={IC_CONTENT_COPY}
                                    width='24px'
                                    height='24px'
                                    tintColor='lancPrimaryLight'
                                />
                            </Stack>
                        </Pressable>
                    </Stack>
                    <Stack 
                        alignItems='center' 
                        direction='row' 
                        justifyContent='space-between'
                    >
                        <Stack>
                            <Text color='lancOutlineLight'>Nomor Virtual Account</Text>
                            <Text fontFamily='Poppins-SemiBold'>{transaction?.data?.order[transaction?.data?.order?.payment_method]?.account_number}</Text>
                        </Stack>
                        <Pressable
                            onPress={() => onCopy(`${transaction?.data?.order[transaction?.data?.order?.payment_method]?.account_number}`)}
                        >
                            <Stack 
                                direction='row' 
                                alignItems='center' 
                                space='4px'
                            >
                                <Text 
                                    color='lancPrimaryLight' 
                                    fontSize='12px' 
                                    fontFamily='Poppins-SemiBold'
                                >Salin</Text>
                                <Image
                                    alt='IC_CONTENT_COPY'
                                    source={IC_CONTENT_COPY}
                                    width='24px'
                                    height='24px'
                                    tintColor='lancPrimaryLight'
                                />
                            </Stack>
                        </Pressable>
                    </Stack>
                </Stack>
            </ScrollView>
            <Stack
                position='absolute'
                bottom='0'
                left='0'
                right='0'
                shadow='3'
                padding='16px'
                backgroundColor='lancBackgroundLight'
                space='8px'
            >
                <Button
                    onPress={() => {
                        navigation.replace(ROUTE_NAME.TRANSACTION_NAVIGATOR, { 
                            screen: ROUTE_NAME.TRANSACTION_NAVIGATOR_DETAIL,
                            params: {
                                transaction: transaction?.data,
                            },
                        })
                    }}
                >
                    Cek Status Pembayaran
                </Button>
                <Button 
                    variant='lancOutline'
                    onPress={() => navigation?.replace(ROUTE_NAME.MAIN_NAVIGATOR, { screen: ROUTE_NAME.MAIN_NAVIGATOR_HOME })}
                >
                    Kembali ke Beranda
                </Button>
            </Stack>
        </Flex>
    )
}

export default TripCheckoutComplete