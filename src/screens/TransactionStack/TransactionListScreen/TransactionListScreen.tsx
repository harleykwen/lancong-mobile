import React from 'react'
import { Header } from '../../../components'
import { useMutation, useQuery } from 'react-query'
import { getTransactionDetailApi, getTransactionListApi } from '../../../apis/transaction.api'
import { add, format } from 'date-fns'
import { id } from 'date-fns/locale'
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

interface ITransactionListScreen {
    navigation?: any
}

const TransactionListScreen = (props: ITransactionListScreen) => {
    const { navigation } = props

    const transactions = useQuery('transaction-list', getTransactionListApi)
    const transactionDetail = useMutation(getTransactionDetailApi, {
        onSuccess: (resp: any) => {
            let pelancong: any = null
            if (resp?.order?.participants?.length > 0) {
                pelancong = resp?.order?.participants
                const pelancongLeft: number = resp?.order?.pax - resp?.order?.participants?.length
                for (let i = 1; i <= pelancongLeft; i++) {
                    pelancong?.push({})
                }
            }
            navigation.navigate('Beranda', { 
                screen: 'complete-data',
                params: {
                    data: {
                        ...resp?.order[resp?.order?.group],
                        special_requests: resp?.order?.special_requests,
                    },
                    group: resp?.order?.group,
                    trip: resp?.order?.trip,
                    checkoutData: {
                        totalPelancong: pelancong??resp?.order?.pax,
                        textSelectedDate: `${format(new Date(resp?.order[resp?.order?.group]?.trip_start), 'dd MMM')} - ${format(new Date(resp?.order[resp?.order?.group]?.trip_end), 'dd MMM')}`,
                    },
                    transaction: resp,
                },
            })
        }
    })

    // type status: 'INACTIVE' || 'ACTIVE' || 'PENDING'

    function generateStatusTransaction(data: any) {
        if (data?.order?.payment?.is_paid) {
            return 'Berhasil'
        } else if (!data?.order?.payment?.id_paid && data?.order?.payment?.status === 'INACTIVE') {
            return 'Kadaluarsa'
        } else if (!data?.order?.payment?.id_paid && data?.order?.payment?.status === 'ACTIVE') {
            return 'Menunggu Pembayaran'
        }
    }

    function generateBackgroundColorStatusTransaction(data: any) {
        if (data?.order?.payment?.is_paid) {
            return 'green.100'
        } else if (!data?.order?.payment?.is_paid && data?.order?.payment?.status === 'INACTIVE') {
            return 'red.100'
        } else if (!data?.order?.payment?.is_paid && data?.order?.payment?.status === 'ACTIVE') {
            return 'yellow.100'
        }
    }

    function generateTextColorStatusTransaction(data: any) {
        if (data?.order?.payment?.is_paid) {
            return 'green.600'
        } else if (!data?.order?.payment?.id_paid && data?.order?.payment?.status === 'INACTIVE') {
            return 'red.600'
        } else if (!data?.order?.payment?.id_paid && data?.order?.payment?.status === 'ACTIVE') {
            return 'yellow.600'
        }
    }

    return (
        <Flex flex='1' backgroundColor='gray.100'>
            <Header title='Daftar Transaksi'/>
            <ScrollView>
                <Stack padding='10px' space='10px'>
                    {transactions?.data?.map((transaction: any, index: number) => {
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