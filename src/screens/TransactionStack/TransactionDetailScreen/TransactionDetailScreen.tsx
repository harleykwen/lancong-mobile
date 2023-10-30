import React from 'react'
import ActionSheetCancelTransaction from './components/ActionSheetCancelTransaction'
import useCountDown from '../../../../hooks/useCountdown'
import { ROUTE_NAME } from '../../../router'
import { useQuery } from 'react-query'
import { getTransactionDetailApi } from '../../../apis/transaction'
import { id } from 'date-fns/locale'
import { RefreshControl } from 'react-native-gesture-handler'
import { format, isPast } from 'date-fns'
import { IC_ARROW_BACK, IC_CONTENT_COPY } from '../../../assets'
import { 
    Button,
    Flex, 
    HStack, 
    Image, 
    Pressable, 
    ScrollView, 
    Skeleton, 
    Stack, 
    Text,
    useClipboard,
    useDisclose, 
} from 'native-base'
import InstallmentCard from './components/InstallmentCard'

interface ITransactionDetailScreen {
    navigation?: any
    route?: any
}

const TransactionDetailScreen: React.FC<ITransactionDetailScreen> = (props: ITransactionDetailScreen) => {
    const { navigation, route } = props
    const { transactionId } = route?.params

    const { onCopy } = useClipboard()
    const cancelTransactionDisclosure = useDisclose()
    const { hours, minutes, seconds, start: startCountdown, isCountdown } = useCountDown()

    const transactionDetail = useQuery(`transaction-detail-${transactionId}`, () => getTransactionDetailApi({ id: transactionId }), {
        onSuccess: (resp: any) => {
            console.log(resp?.data?.order)
            if (resp?.data?.order?.payment?.scheme === 'installment') return
            startCountdown(handleGetCountdownExpirationDate(resp?.data))
        }
    })

    function showButtonCancelVa() {
        if (!transactionDetail?.data) return false
        if (
            transactionDetail?.data?.data?.order?.payment_method === 'virtual_account' &&
            !isPast(new Date(transactionDetail?.data?.data.order.virtual_account.expiration_date))
        ) return true
        return false
    }

    function handleGetPaymentScheme(data: any) {
        return data?.order?.payment?.scheme
    }

    function handleGetPaymentMethod(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        return data?.order?.payment[paymentScheme]?.method
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

    function handleGetCountdownExpirationDate(data: any) {
        const paymentScheme = handleGetPaymentScheme(data)
        const paymentMethod = handleGetPaymentMethod(data)

        switch(paymentScheme) {
            case 'installment':
                const expirationDateInstallment = data?.order?.payment?.installment[0]?.expected_payment_date
                return expirationDateInstallment
            case 'full_payment':
                if (data?.order?.payment?.full_payment?.status?.flag !== 'AWAITING_PAYMENT') return null
                const expirationDate = data?.order?.payment[paymentScheme][paymentMethod]?.expiration_date
                return expirationDate
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

    function handleGetTermPlan(data: any) {
        return data?.order?.payment?.installment?.filter((x: any) => x?.type !== 'down_payment')?.length
    }

    function handleGetPaidTermPlan(data: any) {
        return data?.order?.payment?.installment?.filter((x: any) => x?.payment_date !== null && x?.type !== 'down_payment')?.length
    }
    
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
                        isCountdown && 
                        <HStack 
                            padding='16px' 
                            space='16px' 
                            backgroundColor='lancBackgroundLight'
                            alignItems='center' 
                            justifyContent='space-between'
                        >
                            <Text color='lancOutlineLight'>Selesaikan Pembayaran Dalam</Text>
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
                        </HStack>
                    }

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

                    {
                        handleGetPaymentScheme(transactionDetail?.data?.data) === 'installment' &&
                        <Stack 
                            padding='16px' 
                            space='0px' 
                            backgroundColor='lancBackgroundLight'
                        >
                            <Text>Informasi Termin</Text>
                            <Text fontSize='xs' fontFamily='Poppins-SemiBold' textTransform='uppercase'>{handleGetTermPlan(transactionDetail?.data?.data)} Termin Total</Text>
                            {
                                handleGetTermPlan(transactionDetail?.data?.data) !== handleGetPaidTermPlan(transactionDetail?.data?.data)
                                    ?   <Text fontSize='xs' fontFamily='Poppins-SemiBold' textTransform='uppercase'>{handleGetPaidTermPlan(transactionDetail?.data?.data)} Termin Sudah Dibayarkan</Text>
                                    :   <Text fontSize='xs' fontFamily='Poppins-SemiBold' textTransform='uppercase'>Termin Sudah Dibayarkan Semua</Text>
                            }
                            {
                                handleGetTermPlan(transactionDetail?.data?.data) !== handleGetPaidTermPlan(transactionDetail?.data?.data) &&
                                <Button 
                                    size='xs' 
                                    width='150px' 
                                    marginTop='8px'
                                    onPress={() => {
                                        navigation.navigate(ROUTE_NAME.TRANSACTION_NAVIGATOR_INSTALLMENT_PAY, { 
                                            screen: ROUTE_NAME.TRANSACTION_NAVIGATOR_DETAIL,
                                            params: {
                                                data: transactionDetail?.data?.data,
                                            },
                                        })
                                    }}
                                >Bayar Sekarang</Button>
                            }

                            <Stack marginTop='16px' space='8px'>
                                <Text marginBottom='-8px'>Daftar Termin</Text>
                                {
                                    transactionDetail?.data?.data?.order?.payment?.installment?.map((v: any, i: number) => {
                                        return (
                                            <InstallmentCard 
                                                key={i} 
                                                data={v} 
                                                index={i} 
                                            />
                                        )
                                    })
                                }
                            </Stack>
                        </Stack>
                    }

                    {
                        handleGetPaymentScheme(transactionDetail?.data?.data) === 'full_payment' &&
                        <Stack 
                            padding='16px' 
                            space='16px' 
                            backgroundColor='lancBackgroundLight'
                        >
                            {
                                transactionDetail?.data?.data?.order?.status?.flag === 'AWAITING_PAYMENT' &&
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
                            }
                            {
                                transactionDetail?.data?.data?.order?.status?.flag === 'PAID' &&
                                <Stack direction='row' justifyContent='space-between'>
                                    <Stack>
                                        <Text color='lancOutlineLight'>Tanggal Transaksi</Text>
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
                            }
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
                    }
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