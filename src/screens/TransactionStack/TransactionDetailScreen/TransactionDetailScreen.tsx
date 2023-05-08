import React from 'react'
import { useQuery } from 'react-query'
import { getTransactionDetailApi } from '../../../apis/transaction'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { IC_ARROW_BACK, IC_CONTENT_COPY } from '../../../assets'
import { 
    Flex, 
    Image, 
    Pressable, 
    ScrollView, 
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
    const { transaction } = route?.params
    const { value, onCopy } = useClipboard()

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
                            padding='16px' 
                            space='16px' 
                            backgroundColor='lancBackgroundLight'
                        >
                            <Stack direction='row' justifyContent='space-between'>
                                <Stack>
                                    <Text color='lancOutlineLight'>Tanggal Transaksi</Text>
                                    <Text fontFamily='Poppins-SemiBold'>{format(new Date(transactionData?.data?.data?.created_at), 'EEEE, dd MMMM yyyy HH:mm', { locale: id })} WIB</Text>
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
                                <Text fontFamily='Poppins-SemiBold' textTransform='uppercase'>{transactionData?.data?.data?.transaction_type}</Text>
                            </Stack>
                            <Stack>
                                <Text>Grup</Text>
                                <Text fontFamily='Poppins-SemiBold' textTransform='uppercase'>{transactionData?.data?.data?.order?.group}</Text>
                            </Stack>
                            <Stack>
                                <Text>Nama Trip</Text>
                                <Text fontFamily='Poppins-SemiBold'>{transactionData?.data?.data?.order?.trip?.name}</Text>
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
                                    <Text fontFamily='Poppins-SemiBold'>{format(new Date(transactionData?.data?.data?.order[transactionData?.data?.data?.order?.payment_method]?.expiration_date), 'EEEE, dd MMMM yyyy HH:mm', { locale: id })} WIB</Text>
                                </Stack>
                                <Pressable>

                                </Pressable>
                            </Stack>
                            <Stack direction='row' justifyContent='space-between'>
                                <Stack>
                                    <Text color='lancOutlineLight'>Metode Pembayaran</Text>
                                    <Text fontFamily='Poppins-SemiBold'>{transactionData?.data?.data?.order[transactionData?.data?.data?.order?.payment_method]?.bank_code} {transactionData?.data?.data?.order?.payment_method?.replace('_', ' ')}</Text>
                                </Stack>
                            </Stack>
                            <Stack
                                alignItems='center'
                                direction='row'
                                justifyContent='space-between'
                            >
                                <Stack>
                                    <Text color='lancOutlineLight'>Total Pembayaran</Text>
                                    <Text fontFamily='Poppins-SemiBold'>Rp. {transactionData?.data?.data?.order[transactionData?.data?.data?.order?.payment_method]?.expected_amount?.toLocaleString('id')}</Text>
                                </Stack>
                                <Pressable
                                    onPress={() => onCopy(`${transactionData?.data?.data?.order[transactionData?.data?.data?.order?.payment_method]?.expected_amount}`)}
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
                                    <Text fontFamily='Poppins-SemiBold'>{transactionData?.data?.data?.order[transactionData?.data?.data?.order?.payment_method]?.account_number}</Text>
                                </Stack>
                                <Pressable
                                    onPress={() => onCopy(`${transactionData?.data?.data?.order[transactionData?.data?.data?.order?.payment_method]?.account_number}`)}
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
            }
        </Flex>
    )
}

export default TransactionDetailScreen