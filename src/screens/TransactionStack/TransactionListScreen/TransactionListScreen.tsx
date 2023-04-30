import React, { useEffect } from 'react'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'
import { ROUTE_NAME } from '../../../router'
import { useMutation, useQuery } from 'react-query'
import { getTransactionDetailApi, getTransactionListApi } from '../../../apis/transaction'
import { 
    Center,
    Divider,
    Flex, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack, 
    Text,
} from 'native-base'
import { useIsFocused } from '@react-navigation/native'

interface ITransactionListScreen {
    navigation?: any
}

const TransactionListScreen = (props: ITransactionListScreen) => {
    const { navigation } = props
    const isFocused = useIsFocused()

    const transactions = useQuery('transaction-list', getTransactionListApi)
    const transactionDetail = useMutation(getTransactionDetailApi, {
        onSuccess: (resp: any) => {
            if (resp?.data?.order?.status === 'DRAFT') {
                let pelancong: any = null
                if (resp?.data?.order?.participants?.length > 0) {
                    pelancong = resp?.data?.order?.participants
                    const pelancongLeft: number = resp?.data?.order?.pax - resp?.data?.order?.participants?.length
                    for (let i = 1; i <= pelancongLeft; i++) {
                        pelancong?.push({})
                    }
                }
                navigation.navigate(ROUTE_NAME.TRIP_NAVIGATOR, { 
                    screen: ROUTE_NAME.TRIP_NAVIGATOR_COMPLETE_DATA,
                    params: {
                        data: {
                            ...resp?.data?.order[resp?.data?.order?.group],
                            special_requests: resp?.data?.order?.special_requests?.length !== 0 ? resp?.data?.order?.special_requests : resp?.data?.order[resp?.data?.order?.group]?.special_requests,
                        },
                        group: resp?.data?.order?.group,
                        trip: resp?.data?.order?.trip,
                        checkoutData: {
                            totalPelancong: pelancong??resp?.data?.order?.pax,
                            textSelectedDate: `${format(new Date(resp?.data?.order[resp?.data?.order?.group]?.trip_start), 'dd MMM')} - ${format(new Date(resp?.data?.order[resp?.data?.order?.group]?.trip_end), 'dd MMM')}`,
                        },
                        transaction: resp?.data,
                    },
                })
            } else {
                navigation.navigate(ROUTE_NAME.TRANSACTION_NAVIGATOR, { 
                    screen: ROUTE_NAME.TRANSACTION_NAVIGATOR_DETAIL,
                    params: {
                        transaction: resp?.data,
                    },
                })
            }
        }
    })

    // type status: 'INACTIVE' || 'ACTIVE' || 'PENDING'

    function generateStatusTransaction(data: any) {
        if (data?.order?.status === 'DRAFT') {
            return 'Draft'
        } else if (data?.order?.status === 'PROCEED' && data?.order[data?.order?.payment_method]?.is_paid) {
            return 'Berhasil'
        } else if (data?.order?.status === 'PROCEED' && !data?.order[data?.order?.payment_method]?.id_paid && data?.order[data?.order?.payment_method]?.status === 'INACTIVE') {
            return 'Kadaluarsa'
        } else if (data?.order?.status === 'PROCEED' && !data?.order[data?.order?.payment_method]?.id_paid && data?.order[data?.order?.payment_method]?.status === 'ACTIVE') {
            return 'Menunggu Pembayaran'
        }
    }

    function generateBackgroundColorStatusTransaction(data: any) {
        if (data?.order?.status === 'DRAFT') {
            return 'gray.300'
        } else if (data?.order?.status === 'PROCEED' && data?.order[data?.order?.payment_method]?.is_paid) {
            return 'green.300'
        } else if (data?.order?.status === 'PROCEED' && !data?.order[data?.order?.payment_method]?.is_paid && data?.order[data?.order?.payment_method]?.status === 'INACTIVE') {
            return 'red.300'
        } else if (data?.order?.status === 'PROCEED' && !data?.order[data?.order?.payment_method]?.is_paid && data?.order[data?.order?.payment_method]?.status === 'ACTIVE') {
            return 'yellow.300'
        }
    }

    function generateTextColorStatusTransaction(data: any) {
        if (data?.order?.status === 'DRAFT') {
            return 'gray.600'
        } else if (data?.order?.status === 'PROCEED' && data?.order[data?.order?.payment_method]?.is_paid) {
            return 'green.600'
        } else if (data?.order?.status === 'PROCEED' && !data?.order[data?.order?.payment_method]?.is_paid && data?.order[data?.order?.payment_method]?.status === 'INACTIVE') {
            return 'red.600'
        } else if (data?.order?.status === 'PROCEED' && !data?.order[data?.order?.payment_method]?.is_paid && data?.order[data?.order?.payment_method]?.status === 'ACTIVE') {
            return 'yellow.600'
        }
    }

    useEffect(() => {
        transactions?.refetch()
    }, [isFocused])

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
                <Text fontFamily='Poppins-SemiBold' fontSize='20px'>Daftar Transaksi</Text>
            </Stack>
            <ScrollView>
                <Stack padding='24px' space='10px'>
                    {transactions?.data?.data?.map((transaction: any, index: number) => {
                        return (
                            <Pressable 
                                key={index}
                                onPress={() => {
                                    transactionDetail?.mutate({ id: transaction?.id })
                                    // navigation?.push('transaction-detail', { transaction })
                                }}
                            >
                                <Stack
                                    backgroundColor='white' 
                                    shadow='5' 
                                    rounded='md'
                                    padding='10px'
                                    space='10px'
                                >
                                    <Stack 
                                        direction='row' 
                                        alignItems='center' 
                                        justifyContent='space-between'
                                    >
                                        <Stack>
                                            <Text 
                                                fontSize='13px' 
                                                fontFamily='Poppins-SemiBold' 
                                                color='gray.900'
                                                textTransform='capitalize'
                                            >{transaction?.transaction_type}</Text>
                                            <Text 
                                                fontSize='11px' 
                                                fontFamily='Poppins-Regular' 
                                                color='gray.600'
                                            >{format(new Date(transaction?.created_at), 'dd MMM yyyy', { locale: id })}</Text>
                                        </Stack>
                                        <Center 
                                            rounded='lg' 
                                            backgroundColor={generateBackgroundColorStatusTransaction(transaction)}
                                            padding='5px'
                                        >
                                            <Text 
                                                fontSize='11px' 
                                                fontFamily='Poppins-Regular' 
                                                color={generateTextColorStatusTransaction(transaction)}
                                            >{generateStatusTransaction(transaction)}</Text>
                                        </Center>
                                    </Stack>
                                    <Divider />
                                    <Stack 
                                        direction='row' 
                                        alignItems='center' 
                                        space='5px'
                                    >
                                        <Image 
                                            source={{ uri: transaction?.order?.trip?.images[0]?.url }} 
                                            width='50px' 
                                            height='50px' 
                                            alt={transaction?.order?.trip?.images[0]?.name}
                                            rounded='md'
                                        />
                                        <Stack>
                                            <Text 
                                                fontSize='13px' 
                                                fontFamily='Poppins-SemiBold' 
                                                color='gray.900'
                                                textTransform='capitalize'
                                            >{transaction?.order?.trip?.name}</Text>
                                            <Text 
                                                fontSize='11px' 
                                                fontFamily='Poppins-Regular' 
                                                color='gray.600'
                                            >Total Harga</Text>
                                            <Text 
                                                fontSize='11px' 
                                                fontFamily='Poppins-SemiBold' 
                                                color='black'
                                            >Rp. {transaction?.order?.total_price?.toLocaleString('id')}</Text>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Pressable>
                        )
                    })}
                </Stack>
            </ScrollView>
        </Flex>
    )
}

export default TransactionListScreen