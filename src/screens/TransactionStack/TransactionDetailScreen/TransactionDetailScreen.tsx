import React from 'react'
import { useQuery } from 'react-query'
import { getTransactionDetailApi } from '../../../apis/transaction'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { IC_ARROW_BACK } from '../../../assets'
import { 
    Flex, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack, 
    Text, 
} from 'native-base'

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

            {transactionData?.data &&
                <ScrollView>
                    <Stack space='10px'>
                        <Stack 
                            backgroundColor='white' 
                            paddingX='10px'
                            paddingY='20px' 
                            space='5px'
                            marginTop='10px'
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
                                >{format(new Date(transactionData?.data?.data?.created_at), 'dd MMMM yyyy', { locale: id })}</Text>
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
                                >{transactionData?.data?.data?.transaction_type}</Text>
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
                                >{transactionData?.data?.data?.order?.group}</Text>
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
                                >{transactionData?.data?.data?.order?.trip?.name}</Text>
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
                                >{transactionData?.data?.data?.order[transactionData?.data?.data?.order?.payment_method]?.bank_code} {transactionData?.data?.data?.order?.payment_method?.replace('_', ' ')}</Text>
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
                                >Rp. {transactionData?.data?.data?.order[transactionData?.data?.data?.order?.payment_method]?.expected_amount?.toLocaleString('id')}</Text>
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
                                >Nomor Pembayaran</Text>
                                <Text 
                                    fontSize='13px' 
                                    fontFamily='Poppins-Regular' 
                                    color='black'
                                    textTransform='capitalize'
                                >{transactionData?.data?.data?.order[transactionData?.data?.data?.order?.payment_method]?.account_number}</Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </ScrollView>
            }
        </Flex>
    )
}

export default TransactionDetailScreen