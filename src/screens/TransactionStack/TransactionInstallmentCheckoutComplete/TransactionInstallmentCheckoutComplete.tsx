import React, { useEffect } from 'react'
import useCountDown from '../../../../hooks/useCountdown'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ROUTE_NAME } from '../../../router'
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

interface ITransactionInstallmentCheckoutComplete {
    navigation?: any
    route?: any
}

const TransactionInstallmentCheckoutComplete: React.FC<ITransactionInstallmentCheckoutComplete> = (props: ITransactionInstallmentCheckoutComplete) => {
    const { navigation, route } = props
    const { transaction } = route?.params

    const { onCopy } = useClipboard()
    const { hours, minutes, seconds, start: startCountdown, isCountdown } = useCountDown()

    console.log({transaction})

    function handleGetPaymentScheme(data: any) {
        return data?.order?.payment?.scheme
    }

    function handleGetPaymentMethod(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        return data?.order?.payment[paymentScheme]?.method
    }

    function handleGetExpirationDate() {
        return format(new Date(transaction?.data?.virtual_account?.expiration_date), 'dd LLLL yyyy, HH:mm', { locale: id }) + ' WIB'
    }

    function handleGetFullPaymentMethod() {
        return `${transaction?.data?.virtual_account?.bank_code?.toUpperCase()}`
    }

    function handleGetExpectedAmount() {
        return transaction?.data?.virtual_account?.expected_amount
    }

    function handleGetAccountNumber() {
        return transaction?.data?.virtual_account?.account_number
    }

    useEffect(() => {
        startCountdown(transaction?.data?.virtual_account?.expiration_date)
    }, [])

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
                        <Stack width='full'>
                            <Text color='lancOutlineLight'>Batas Akhir Pembayaran</Text>
                            <Flex
                                direction='row'
                                alignItems='center'
                                justifyContent='space-between'
                            >
                                <Text fontFamily='Poppins-SemiBold'>
                                    {handleGetExpirationDate()}
                                </Text>
                                {
                                    isCountdown &&
                                    <Flex
                                        alignItems='center'
                                        justifyContent='center'
                                        paddingY='4px'
                                        paddingX='16px'
                                        backgroundColor='red.600'
                                        borderRadius='full'
                                    >
                                        <Text
                                            color='white'
                                            fontFamily='Poppins-SemiBold'
                                            fontSize='xs'
                                        >{hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                                    </Flex>
                                }
                            </Flex>
                        </Stack>
                        <Pressable>

                        </Pressable>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Stack>
                            <Text color='lancOutlineLight'>Metode Pembayaran</Text>
                            <Text fontFamily='Poppins-SemiBold'>
                                {handleGetFullPaymentMethod()}
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack 
                        alignItems='center' 
                        direction='row' 
                        justifyContent='space-between'
                    >
                        <Stack>
                            <Text color='lancOutlineLight'>Total Pembayaran</Text>
                            <Text fontFamily='Poppins-SemiBold'>
                                Rp. {handleGetExpectedAmount()?.toLocaleString('id')}
                            </Text>
                        </Stack>
                        <Pressable
                            onPress={() => onCopy(`${handleGetExpectedAmount()}`)}
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
                            <Text fontFamily='Poppins-SemiBold'>
                                {handleGetAccountNumber()}
                            </Text>
                        </Stack>
                        <Pressable
                            onPress={() => onCopy(`${handleGetAccountNumber()}`)}
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
                    variant='lancOutline'
                    onPress={() => navigation?.replace(ROUTE_NAME.MAIN_NAVIGATOR, { screen: ROUTE_NAME.MAIN_NAVIGATOR_HOME })}
                >
                    Kembali ke Beranda
                </Button>
            </Stack>
        </Flex>
    )
}

export default TransactionInstallmentCheckoutComplete