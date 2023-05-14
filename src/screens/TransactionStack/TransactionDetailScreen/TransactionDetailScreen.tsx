import React from 'react'
import { useQuery } from 'react-query'
import { getTransactionDetailApi } from '../../../apis/transaction'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { RefreshControl } from 'react-native-gesture-handler'
import { IC_ARROW_BACK, IC_CONTENT_COPY } from '../../../assets'
import { 
    Flex, 
    Image, 
    Pressable, 
    ScrollView, 
    Skeleton, 
    Stack, 
    Text,
    useClipboard, 
} from 'native-base'

interface ITransactionDetailScreen {
    navigation?: any
    route?: any
}

const TransactionDetailScreen = (props: ITransactionDetailScreen) => {
    const { navigation, route } = props
    const { transactionId } = route?.params
    const { onCopy } = useClipboard()

    const transactionDetail = useQuery(`transaction-detail-${transactionId}`, () => getTransactionDetailApi({ id: transactionId }))
    
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
                    <Stack 
                        padding='16px' 
                        space='16px' 
                        backgroundColor='lancBackgroundLight'
                    >
                        <Stack direction='row' justifyContent='space-between'>
                            <Stack>
                                <Text color='lancOutlineLight'>Tanggal Transaksi</Text>
                                {
                                    transactionDetail?.isFetching
                                        ?   <Skeleton height='22px' width='150px' />
                                        :   <Text fontFamily='Poppins-SemiBold'>{format(new Date(transactionDetail?.data?.data?.created_at), 'EEEE, dd MMMM yyyy HH:mm', { locale: id })} WIB</Text>
                                }
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
                                    :   <Text fontFamily='Poppins-SemiBold' textTransform='uppercase'>{transactionDetail?.data?.data?.transaction_type}</Text>
                            }
                        </Stack>
                        <Stack>
                            <Text>Grup</Text>
                            {
                                transactionDetail?.isFetching
                                    ?   <Skeleton height='20.5px' width='150px' />
                                    :   <Text fontFamily='Poppins-SemiBold' textTransform='uppercase'>{transactionDetail?.data?.data?.order?.group}</Text>
                            }
                        </Stack>
                        <Stack>
                            <Text>Nama Trip</Text>
                            {
                                transactionDetail?.isFetching
                                    ?   <Skeleton height='20.5px' width='150px' />
                                    :   <Text fontFamily='Poppins-SemiBold'>{transactionDetail?.data?.data?.order?.trip?.name}</Text>
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
                                        :   <Text fontFamily='Poppins-SemiBold'>{format(new Date(transactionDetail?.data?.data?.order[transactionDetail?.data?.data?.order?.payment_method]?.expiration_date), 'EEEE, dd MMMM yyyy HH:mm', { locale: id })} WIB</Text>
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
                                        :   <Text fontFamily='Poppins-SemiBold'>{transactionDetail?.data?.data?.order[transactionDetail?.data?.data?.order?.payment_method]?.bank_code} {transactionDetail?.data?.data?.order?.payment_method?.replace('_', ' ')}</Text>
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
                                        :   <Text fontFamily='Poppins-SemiBold'>Rp. {transactionDetail?.data?.data?.order[transactionDetail?.data?.data?.order?.payment_method]?.expected_amount?.toLocaleString('id')}</Text>
                                }
                            </Stack>
                            <Pressable
                                onPress={() => onCopy(`${transactionDetail?.data?.data?.order[transactionDetail?.data?.data?.order?.payment_method]?.expected_amount}`)}
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
                                        :   <Text fontFamily='Poppins-SemiBold'>{transactionDetail?.data?.data?.order[transactionDetail?.data?.data?.order?.payment_method]?.account_number}</Text>
                                }
                            </Stack>
                            <Pressable
                                onPress={() => onCopy(`${transactionDetail?.data?.data?.order[transactionDetail?.data?.data?.order?.payment_method]?.account_number}`)}
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
            </ScrollView>
        </Flex>
    )
}

export default TransactionDetailScreen