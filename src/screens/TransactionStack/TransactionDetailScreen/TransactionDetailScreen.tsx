import React from 'react'
import { Flex, ScrollView, Stack, Text } from 'native-base'
import { Header } from '../../../components'
import { useQuery } from 'react-query'
import { getTransactionDetailApi } from '../../../apis/transaction.api'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface ITransactionDetailScreen {
    navigation?: any
    route?: any
}

const TransactionDetailScreen = (props: ITransactionDetailScreen) => {
    const { navigation, route } = props
    const { transaction } = route?.params

    const transactionData = useQuery(`transaction-${transaction?.id}`, () => getTransactionDetailApi({ id: transaction?.id }))
    
    return (
        <Flex flex='1' backgroundColor='gray.100'>
            <Header
                title='Detail Transaksi'
                onPressBack={() => navigation.goBack()}
            />

            {transactionData?.data &&
                <ScrollView>
                    <Stack space='10px'>
                        <Stack 
                            backgroundColor='white' 
                            paddingX='10px'
                            paddingY='20px' 
                            space='5px'
                        >
                            <Stack 
                                direction='row' 
                                alignItems='center' 
                                justifyContent='space-between'
                            >
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='gray.600'
                                >Tanggal Transaksi</Text>
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='black'
                                >{format(new Date(transactionData?.data?.created_at), 'dd MMMM yyyy', { locale: id })}</Text>
                            </Stack>
                            <Stack 
                                direction='row' 
                                alignItems='center' 
                                justifyContent='space-between'
                            >
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='gray.600'
                                >Tipe Transaksi</Text>
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='black'
                                    textTransform='capitalize'
                                >{transactionData?.data?.transaction_type}</Text>
                            </Stack>
                        </Stack>

                        <Stack 
                            backgroundColor='white' 
                            paddingX='10px'
                            paddingY='20px' 
                            space='5px'
                        >
                            <Stack 
                                direction='row' 
                                alignItems='center' 
                                justifyContent='space-between'
                            >
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='gray.600'
                                >Grup</Text>
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='black'
                                    textTransform='capitalize'
                                >{transactionData?.data?.order?.group}</Text>
                            </Stack>
                            <Stack 
                                direction='row' 
                                alignItems='center' 
                                justifyContent='space-between'
                            >
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='gray.600'
                                >Nama Trip</Text>
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='black'
                                    textTransform='capitalize'
                                >{transactionData?.data?.order?.trip?.name}</Text>
                            </Stack>
                        </Stack>

                        <Stack 
                            backgroundColor='white' 
                            paddingX='10px'
                            paddingY='20px' 
                            space='5px'
                        >
                            <Stack 
                                direction='row' 
                                alignItems='center' 
                                justifyContent='space-between'
                            >
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='gray.600'
                                >Metode Pembayaran</Text>
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='black'
                                    textTransform='capitalize'
                                >{transactionData?.data?.order?.payment?.bank_code} {transactionData?.data?.order?.payment_method?.replace('_', ' ')}</Text>
                            </Stack>
                            <Stack 
                                direction='row' 
                                alignItems='center' 
                                justifyContent='space-between'
                            >
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='gray.600'
                                >Total Harga</Text>
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='black'
                                >Rp. {transactionData?.data?.order?.payment?.expected_amount?.toLocaleString('id')}</Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </ScrollView>
            }
        </Flex>
    )
}

export default TransactionDetailScreen