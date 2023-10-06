import React from 'react'
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

interface ITripCheckoutComplete {
    navigation?: any
    route?: any
}

const TripCheckoutComplete: React.FC<ITripCheckoutComplete> = (props: ITripCheckoutComplete) => {
    const { navigation, route } = props
    const { transaction } = route?.params
    const { onCopy } = useClipboard()

    function handleGetPaymentScheme(data: any) {
        return data?.order?.payment?.scheme
    }

    function handleGetPaymentMethod(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        return data?.order?.payment[paymentScheme]?.method
    }

    function handleGetExpirationDate(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        const paymentMethod = handleGetPaymentMethod(data)
        const expirationDate = data?.order?.payment[paymentScheme][paymentMethod]?.expiration_date
        switch(paymentScheme) {
            case 'full_payment':
                return format(new Date(expirationDate), 'dd LLLL yyyy, HH:mm', { locale: id }) + ' WIB'
            case 'installment':
                const installment = data?.order?.payment[paymentScheme]
                const payableInstallment = installment?.find((x: any) => x?.method !== null && x?.payment_date === null)
                if (!payableInstallment) return 'lunas'
                return format(new Date(payableInstallment?.expected_payment_date), 'dd LLLL yyyy, HH:mm', { locale: id }) + ' WIB'
            default:
                return ''
        }
    }

    function handleGetFullPaymentMethod(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        const paymentMethod = handleGetPaymentMethod(data)
        const bankCode = data?.order?.payment[paymentScheme][paymentMethod]?.bank_code
        switch(paymentScheme) {
            case 'full_payment':
                return `${bankCode?.toUpperCase()} ${paymentMethod?.replace('_', ' ')?.toUpperCase()}`
            case 'installment':
                const installment = data?.order?.payment[paymentScheme]
                const payableInstallment = installment?.find((x: any) => x?.method !== null && x?.payment_date === null)
                if (!payableInstallment) return 'lunas'
                return `${payableInstallment[payableInstallment?.method]?.bank_code?.toUpperCase()} ${payableInstallment?.method?.replaceAll('_', ' ')?.toUpperCase()}`
            default:
                return ''
        }
    }

    function handleGetExpectedAmount(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        const paymentMethod = handleGetPaymentMethod(data)
        const expectedAmount = data?.order?.payment[paymentScheme][paymentMethod]?.expected_amount
        switch(paymentScheme) {
            case 'full_payment':
                return expectedAmount
            case 'installment':
                const installment = data?.order?.payment[paymentScheme]
                const payableInstallment = installment?.find((x: any) => x?.method !== null && x?.payment_date === null)
                if (!payableInstallment) return 'lunas'
                return payableInstallment[payableInstallment?.method]?.expected_amount
            default:
                return ''
        }
    }

    function handleGetAccountNumber(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        const paymentMethod = handleGetPaymentMethod(data)
        const accountNumber = data?.order?.payment[paymentScheme][paymentMethod]?.account_number
        switch(paymentScheme) {
            case 'full_payment':
                return accountNumber
            case 'installment':
                const installment = data?.order?.payment[paymentScheme]
                const payableInstallment = installment?.find((x: any) => x?.method !== null && x?.payment_date === null)
                if (!payableInstallment) return 'lunas'
                return payableInstallment[payableInstallment?.method]?.account_number
            default:
                return ''
        }
    }

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
                            <Text fontFamily='Poppins-SemiBold'>
                                {handleGetExpirationDate(transaction?.data)}
                            </Text>
                        </Stack>
                        <Pressable>

                        </Pressable>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Stack>
                            <Text color='lancOutlineLight'>Metode Pembayaran</Text>
                            <Text fontFamily='Poppins-SemiBold'>
                                {handleGetFullPaymentMethod(transaction?.data)}
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
                                {handleGetExpectedAmount(transaction?.data)}
                            </Text>
                        </Stack>
                        <Pressable
                            onPress={() => onCopy(`${handleGetExpectedAmount(transaction?.data)}`)}
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
                                {handleGetAccountNumber(transaction?.data)}
                            </Text>
                        </Stack>
                        <Pressable
                            onPress={() => onCopy(`${handleGetAccountNumber(transaction?.data)}`)}
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