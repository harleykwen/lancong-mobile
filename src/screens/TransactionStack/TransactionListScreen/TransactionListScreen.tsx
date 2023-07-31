import React from 'react'
import { RefreshControl } from 'react-native'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'
import { ROUTE_NAME } from '../../../router'
import { useQuery } from 'react-query'
import { IC_CHEVRON_RIGHT } from '../../../assets'
import { getTransactionDraftListApi, getTransactionListApi } from '../../../apis/transaction'
import { 
    Center,
    Divider,
    Flex, 
    Image, 
    Pressable, 
    ScrollView, 
    Skeleton, 
    Stack, 
    Text,
} from 'native-base'

interface ITransactionListScreen {
    navigation?: any
}

const TransactionListScreen: React.FC<ITransactionListScreen> = (props: ITransactionListScreen) => {
    const { navigation } = props

    const transactions = useQuery('transaction-list', getTransactionListApi)
    const transactionsDraft = useQuery('transaction-draft-list', getTransactionDraftListApi)

    function generateStatusTransaction(data: any) {
        if (data?.order?.status === 'DRAFT') {
            return 'Draft'
        } else if (data?.order?.status === 'CANCELED') {
            return 'Dibatalkan'
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
        } else if (data?.order?.status === 'CANCELED') {
            return 'red.300'
        } else if (data?.order?.status === 'PROCEED' && data?.order[data?.order?.payment_method]?.is_paid) {
            return 'green.300'
        } else if (data?.order?.status === 'PROCEED' && !data?.order[data?.order?.payment_method]?.is_paid && data?.order[data?.order?.payment_method]?.status === 'INACTIVE') {
            return 'orange.300'
        } else if (data?.order?.status === 'PROCEED' && !data?.order[data?.order?.payment_method]?.is_paid && data?.order[data?.order?.payment_method]?.status === 'ACTIVE') {
            return 'yellow.300'
        }
    }

    function generateTextColorStatusTransaction(data: any) {
        if (data?.order?.status === 'DRAFT') {
            return 'gray.600'
        } else if (data?.order?.status === 'CANCELED') {
            return 'red.600'
        } else if (data?.order?.status === 'PROCEED' && data?.order[data?.order?.payment_method]?.is_paid) {
            return 'green.600'
        } else if (data?.order?.status === 'PROCEED' && !data?.order[data?.order?.payment_method]?.is_paid && data?.order[data?.order?.payment_method]?.status === 'INACTIVE') {
            return 'orange.600'
        } else if (data?.order?.status === 'PROCEED' && !data?.order[data?.order?.payment_method]?.is_paid && data?.order[data?.order?.payment_method]?.status === 'ACTIVE') {
            return 'yellow.600'
        }
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
                <Text fontFamily='Poppins-SemiBold' fontSize='20px'>Daftar Transaksi</Text>
            </Stack>
            <ScrollView
                refreshControl={
                    <RefreshControl 
                        refreshing={transactions?.isFetching} 
                        onRefresh={() => {
                            transactions?.remove()
                            transactions?.refetch()
                            transactionsDraft?.remove()
                            transactionsDraft?.refetch()
                        }} 
                    />
                }
            >
                <Stack padding='24px' space='10px'>
                    {
                        transactionsDraft?.data?.data?.length !== 0 && 
                        !transactionsDraft?.isFetching &&
                        <Pressable 
                            onPress={() => {
                                navigation.navigate(ROUTE_NAME.TRANSACTION_NAVIGATOR, { 
                                    screen: ROUTE_NAME.TRANSACTION_NAVIGATOR_LIST_DRAFT,
                                })
                            }}
                        >
                            <Stack
                                backgroundColor='white' 
                                shadow='5' 
                                rounded='md'
                                padding='10px'
                                space='10px'
                                direction='row'
                                alignItems='center'
                            >
                                <Center backgroundColor='red.600' width='24px' height='24px' rounded='full'>
                                    <Text fontSize='10px' color='lancBackgroundLight' marginTop='2px'>
                                        {transactionsDraft?.data?.data?.length}
                                    </Text>
                                </Center>
                                <Text fontSize='12px'>Menunggu kelengkapan data</Text>
                                <Image
                                    alt='IC_CHEVRON_RIGHT'
                                    source={IC_CHEVRON_RIGHT}
                                    width='24px'
                                    height='24px'
                                    tintColor='lancOnBackgroundLight'
                                    marginLeft='auto'
                                />
                            </Stack>
                        </Pressable>
                    }

                    {
                        !transactions?.isLoading &&
                        transactions?.data?.data?.map((transaction: any, index: number) => {
                            return (
                                <Pressable 
                                    key={index}
                                    onPress={() => {
                                        if (transaction?.order?.status === 'DRAFT') {
                                            navigation.navigate(ROUTE_NAME.TRIP_NAVIGATOR, { 
                                                screen: ROUTE_NAME.TRIP_NAVIGATOR_COMPLETE_DATA,
                                                params: {
                                                    transactionId: transaction?.id,
                                                },
                                            })
                                        } else {
                                            navigation.navigate(ROUTE_NAME.TRANSACTION_NAVIGATOR, { 
                                                screen: ROUTE_NAME.TRANSACTION_NAVIGATOR_DETAIL,
                                                params: {
                                                    transactionId: transaction?.id,
                                                },
                                            })
                                        }
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

                    {
                        transactions?.isFetching &&
                        [...Array(3)]?.map((_, index: number) => {
                            return (
                                <Stack
                                    key={index}
                                    backgroundColor='white' 
                                    shadow='5' 
                                    rounded='md'
                                    padding='10px'
                                    space='10.5px'
                                >
                                    <Stack
                                        direction='row' 
                                        alignItems='center' 
                                        justifyContent='space-between'
                                    >
                                        <Stack space='4px'>
                                            <Skeleton height='17px' width='50px' />
                                            <Skeleton height='14px' width='30px' />
                                        </Stack>
                                        <Skeleton height='24px' width='50px' />
                                    </Stack>
                                    <Divider />
                                    <Stack direction='row' space='4px'>
                                        <Skeleton height='50px' width='50px' />
                                        <Stack space='4px'>
                                            <Skeleton height='17px' width='100px' />
                                            <Skeleton height='14px' width='60px' />
                                            <Skeleton height='14px' width='40px' />
                                        </Stack>
                                    </Stack>
                                </Stack>
                            )
                        })
                    }
                </Stack>
            </ScrollView>
        </Flex>
    )
}

export default TransactionListScreen