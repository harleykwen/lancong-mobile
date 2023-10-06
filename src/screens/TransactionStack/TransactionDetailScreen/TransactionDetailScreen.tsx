import React, { useState } from 'react'
import ActionSheetCancelTransaction from './components/ActionSheetCancelTransaction'
import { useQuery } from 'react-query'
import { getTransactionDetailApi } from '../../../apis/transaction'
import { id } from 'date-fns/locale'
import { RefreshControl } from 'react-native-gesture-handler'
import { IC_ARROW_BACK, IC_CONTENT_COPY } from '../../../assets'
import { 
    format, 
    intervalToDuration, 
    isPast, 
} from 'date-fns'
import { 
    Button,
    Flex, 
    Image, 
    Pressable, 
    ScrollView, 
    Skeleton, 
    Stack, 
    Text,
    useClipboard,
    useDisclose, 
} from 'native-base'

interface ITransactionDetailScreen {
    navigation?: any
    route?: any
}

const TransactionDetailScreen: React.FC<ITransactionDetailScreen> = (props: ITransactionDetailScreen) => {
    const { navigation, route } = props
    const { transactionId } = route?.params
    const { onCopy } = useClipboard()
    const cancelTransactionDisclosure = useDisclose()

    const [paymentCountdown, setPaymentCountdown] = useState('')
    const [showCountdown, setShowCountdown] = useState(false)

    const transactionDetail = useQuery(`transaction-detail-${transactionId}`, () => getTransactionDetailApi({ id: transactionId }))

    function showButtonCancelVa() {
        if (!transactionDetail?.data) return false
        if (
            transactionDetail?.data?.data?.order?.payment_method === 'virtual_account' &&
            !isPast(new Date(transactionDetail?.data?.data.order.virtual_account.expiration_date))
        ) return true
        return false
    }

    function runIntervalPaymentCountdown() {
        if (!transactionDetail?.data?.data) return
        const paymentMethod = transactionDetail?.data?.data?.order?.payment_method
        const timestamp = transactionDetail?.data?.data?.order[paymentMethod]?.expiration_date
        const myPaymentCountdownInterval = setInterval(handleUpdatePaymentCountdownInterval, 1000)
        function handleUpdatePaymentCountdownInterval() {
            if (isPast(new Date(timestamp))) {
                clearInterval(myPaymentCountdownInterval)
                setShowCountdown(false)
            } else {
                setShowCountdown(true)
                const interval = intervalToDuration({
                    start: new Date(),
                    end: new Date(timestamp)
                })
                const generatedInterval = handleGenerateInterval(interval)
                setPaymentCountdown(generatedInterval)
            }
        }
    }

    function handleGenerateInterval(data: any) {
        const hourArg = data?.hours
        const minuteArg = data?.minutes
        const secondArg = data?.seconds

        let hour
        let minute
        let second

        if (hourArg > 9) {
            hour = `${hourArg}`
        } else if (hourArg < 9 && hourArg > 0) {
            hour = `0${hourArg}`
        } else {
            hour = '00'
        }

        if (minuteArg > 9) {
            minute = `${minuteArg}`
        } else if (minuteArg < 9 && minuteArg > 0) {
            minute = `0${minuteArg}`
        } else {
            minute = '00'
        }

        if (secondArg > 9) {
            second = `${secondArg}`
        } else if (secondArg < 9 && secondArg > 0) {
            second = `0${secondArg}`
        } else {
            second = '00'
        }

        return hour + ':' + minute + ':' + second
    }

    function handleGetPaymentScheme(data: any) {
        return data?.order?.payment?.scheme
    }

    function handleGetPaymentMethod(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        return data?.order?.payment[paymentScheme]?.method
    }

    function handleGetTransactionDate(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        switch(paymentScheme) {
            case 'full_payment':
                return ''
            case 'installment':
                return ''
            default:
                return ''
        }
    }

    function handleGetTransactionType(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        switch(paymentScheme) {
            case 'full_payment':
            case 'installment':
                return data?.transaction_type
            default:
                return ''
        }
    }

    function handleGetGroup(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        switch(paymentScheme) {
            case 'full_payment':
            case 'installment':
                return data?.order?.group
            default:
                return ''
        }
    }

    function handleGetTripName(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        switch(paymentScheme) {
            case 'full_payment':
            case 'installment':
                return data?.order[data?.transaction_type]?.name
            default:
                return ''
        }
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

    // useEffect(() => {
    //     runIntervalPaymentCountdown()
    // }, [transactionDetail?.data])
    
    return (
        <Flex flex='1' backgroundColor='gray.100'>
            <Stack 
                paddingY='16px'
                paddingX='24px'
                shadow='3' 
                backgroundColor='lancBackgroundLight'
                direction='row'
                alignItems='center'
                space='16px'
            >
                <Pressable onPress={() => navigation?.goBack()}>
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='24px'
                        height='24px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Text fontFamily='Poppins-SemiBold' fontSize='20px'>Detail Transaksi</Text>
            </Stack>

            <ScrollView
                refreshControl={
                    <RefreshControl 
                        refreshing={transactionDetail?.isFetching} 
                        onRefresh={() => {
                            transactionDetail?.remove()
                            transactionDetail?.refetch()
                        }} 
                    />
                }
            >
                <Stack space='10px'>
                    {
                        showCountdown &&
                        <Stack 
                            padding='16px' 
                            space='16px' 
                            backgroundColor='lancBackgroundLight'
                        >
                            <Stack direction='row' justifyContent='space-between'>
                                <Stack>
                                    <Text color='lancOutlineLight'>Selesaikan Pembayaran Dalam:</Text>
                                    {/* {
                                        transactionDetail?.isFetching
                                            ?   <Skeleton height='22px' width='150px' />
                                            :   <Center 
                                                    paddingY='4px' 
                                                    paddingX='8px' 
                                                    backgroundColor='orange.400' 
                                                    width='100px' 
                                                    rounded='full'
                                                >
                                                    <Text fontFamily='Poppins-SemiBold' color='white'>{paymentCountdown}</Text>
                                                </Center>
                                    } */}
                                </Stack>
                            </Stack>
                        </Stack>
                    }

                    <Stack 
                        padding='16px' 
                        space='16px' 
                        backgroundColor='lancBackgroundLight'
                    >
                        <Stack direction='row' justifyContent='space-between'>
                            <Stack>
                                <Text color='lancOutlineLight'>Tanggal Transaksi</Text>
                                {/* {
                                    transactionDetail?.isFetching
                                        ?   <Skeleton height='22px' width='150px' />
                                        :   <Text fontFamily='Poppins-SemiBold'>{format(new Date(transactionDetail?.data?.data?.created_at), 'EEEE, dd MMMM yyyy HH:mm', { locale: id })} WIB</Text>
                                } */}
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack 
                        padding='16px' 
                        space='16px' 
                        backgroundColor='lancBackgroundLight'
                    >
                        <Stack>
                            <Text>Tipe Transaksi</Text>
                            {
                                transactionDetail?.isFetching
                                    ?   <Skeleton height='22px' width='150px' />
                                    :   <Text fontFamily='Poppins-SemiBold' textTransform='uppercase'>
                                            {handleGetTransactionType(transactionDetail?.data?.data)}
                                        </Text>
                            }
                        </Stack>
                        <Stack>
                            <Text>Grup</Text>
                            {
                                transactionDetail?.isFetching
                                    ?   <Skeleton height='20.5px' width='150px' />
                                    :   <Text fontFamily='Poppins-SemiBold' textTransform='uppercase'>
                                            {handleGetGroup(transactionDetail?.data?.data)}
                                        </Text>
                            }
                        </Stack>
                        <Stack>
                            <Text>Nama Trip</Text>
                            {
                                transactionDetail?.isFetching
                                    ?   <Skeleton height='20.5px' width='150px' />
                                    :   <Text fontFamily='Poppins-SemiBold'>
                                            {handleGetTripName(transactionDetail?.data?.data)}
                                        </Text>
                            }
                        </Stack>
                    </Stack>

                    <Stack 
                        padding='16px' 
                        space='16px' 
                        backgroundColor='lancBackgroundLight'
                    >
                        <Stack direction='row' justifyContent='space-between'>
                            <Stack>
                                <Text color='lancOutlineLight'>Batas Akhir Pembayaran</Text>
                                {
                                    transactionDetail?.isFetching
                                        ?   <Skeleton height='21.5px' width='150px' />
                                        :   <Text fontFamily='Poppins-SemiBold'>
                                                {handleGetExpirationDate(transactionDetail?.data?.data)}
                                            </Text>
                                }
                            </Stack>
                            <Pressable>

                            </Pressable>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between'>
                            <Stack>
                                <Text color='lancOutlineLight'>Metode Pembayaran</Text>
                                {
                                    transactionDetail?.isFetching
                                        ?   <Skeleton height='21.5px' width='150px' />
                                        :   <Text fontFamily='Poppins-SemiBold'>
                                                {handleGetFullPaymentMethod(transactionDetail?.data?.data)}
                                            </Text>
                                }
                            </Stack>
                        </Stack>
                        <Stack
                            alignItems='center'
                            direction='row'
                            justifyContent='space-between'
                        >
                            <Stack>
                                <Text color='lancOutlineLight'>Total Pembayaran</Text>
                                {
                                    transactionDetail?.isFetching
                                        ?   <Skeleton height='21.5px' width='150px' />
                                        :   <Text fontFamily='Poppins-SemiBold'>
                                                Rp. {handleGetExpectedAmount(transactionDetail?.data?.data)?.toLocaleString('id')}
                                            </Text>
                                }
                            </Stack>
                            <Pressable
                                onPress={() => onCopy(`${handleGetExpectedAmount(transactionDetail?.data?.data)}`)}
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
                                {
                                    transactionDetail?.isFetching
                                        ?   <Skeleton height='22px' width='150px' />
                                        :   <Text fontFamily='Poppins-SemiBold'>
                                                {handleGetAccountNumber(transactionDetail?.data?.data)}
                                            </Text>
                                }
                            </Stack>
                            <Pressable
                                onPress={() => onCopy(`${handleGetAccountNumber(transactionDetail?.data?.data)}`)}
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
                </Stack>

                <Stack padding='16px'>
                    {showButtonCancelVa() && <Button colorScheme='lancError' onPress={cancelTransactionDisclosure?.onOpen}>Batalkan Pesanan</Button>}
                </Stack>
            </ScrollView>

            <ActionSheetCancelTransaction 
                isOpen={cancelTransactionDisclosure?.isOpen} 
                onClose={cancelTransactionDisclosure?.onClose} 
                navigation={navigation} 
                transactionId={transactionDetail?.data?.data?.id}
            />
        </Flex>
    )
}

export default TransactionDetailScreen