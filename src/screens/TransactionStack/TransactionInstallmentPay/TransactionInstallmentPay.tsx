import React, { useState } from 'react'
import ActionSheetPaymentMethod from './components/ActionSheetPaymentMethod'
import { IC_ARROW_BACK } from '../../../assets'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ROUTE_NAME } from '../../../router'
import { bankListApi, installmentPayApi } from '../../../apis/va'
import { useMutation, useQuery } from 'react-query'
import { 
    Button,
    Checkbox,
    Flex, 
    Image, 
    Pressable, 
    Stack, 
    Text,
    useDisclose, 
} from 'native-base'

interface ITransactionInstallmentPay {
    navigation?: any
    route?: any
}

const TransactionInstallmentPay: React.FC<ITransactionInstallmentPay> = (props: ITransactionInstallmentPay) => {
    const { navigation, route } = props
    const { data } = route?.params?.params

    const actoinSheetPaymentMethodDisclosure = useDisclose()

    const vas = useQuery('list-va', bankListApi)
    const pay = useMutation(installmentPayApi, {
        onSuccess: (resp: any) => {
            navigation?.replace(ROUTE_NAME.TRANSACTION_NAVIGATOR_INSTALLMENT_COMPLETE, { transaction: resp })
        }
    })

    const [selectedTerm, setSelectedTerm] = useState<any[]>([])
    const [paymentMethod, setPaymentMethod] = useState<any>(null)

    function handleGetTerm() {
        return data?.order?.payment?.installment?.filter((x: any) => x?.type !== 'down_payment')
    }

    console.log(data)

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
                <Pressable 
                    onPress={() => navigation?.goBack()}
                >
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='24px'
                        height='24px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Text fontFamily='Poppins-SemiBold' fontSize='20px'>Pembayaran Termin</Text>
            </Stack>

            <Stack backgroundColor='gray.100' marginTop='16px' space='16px'>
                {handleGetTerm()?.map((v: any, i: number) => {
                    console.log({v})

                    return (
                        <Pressable
                            key={i} 
                            onPress={() => {
                                if (v?.payment_date !== null) return
                                const tempSelectedTerm = handleGetTerm()?.filter((_: any, idx: number) => idx <= i)
                                setSelectedTerm(() => {
                                    return tempSelectedTerm
                                        ?.filter((x: any) => x?.payment_date === null)
                                        // ?.map((v: any) => v?.id)
                                })
                            }}
                        >
                            <Stack
                                direction='row' 
                                space='4px' 
                                alignItems='center'
                                marginX='16px'
                            >
                                <Checkbox 
                                    value='isChecked' 
                                    isDisabled={v?.payment_date !== null}
                                    isChecked={
                                        selectedTerm?.find((x: any) => x?.id === v?.id) ||
                                        v?.payment_date !== null
                                    }
                                >{''}</Checkbox>
                                <Flex
                                    padding='16px' 
                                    backgroundColor='white' 
                                    shadow='5'
                                    rounded='md'
                                    flex='1'
                                >
                                    <Text>{data?.order?.trip?.name} {i+1}/{handleGetTerm()?.length}</Text>
                                    <Text marginTop='8px' color='orange.600'>
                                        Rp. {v?.amount?.toLocaleString('id')}
                                    </Text>
                                    <Text color='blue.600'>
                                        {format(new Date(v?.expected_payment_date), 'dd LLLL yyyy, HH:mm', { locale: id }) + ' WIB'}
                                    </Text>
                                    <Text 
                                        marginTop='8px'
                                        color={v?.payment_date === null ? 'red.600' : 'green.600'}
                                    >
                                        {
                                            v?.payment_date === null
                                                ?   'Belum Dibayar'
                                                :   'Lunas'
                                        }
                                    </Text>
                                </Flex>
                            </Stack>
                        </Pressable>
                    )
                })}

                <Flex
                    padding='16px'
                    backgroundColor='green.200'
                    marginTop='16px'
                    alignItems='center'
                    flexDirection='row'
                    justifyContent='space-between'
                >
                    <Text fontSize='12px' color='green.600'>Metode Pembayaran</Text>
                    <Pressable onPress={() => actoinSheetPaymentMethodDisclosure?.onOpen()}>
                        <Text fontSize='12px' color='gray.600'>
                            {
                                paymentMethod
                                    ? paymentMethod?.name
                                    : 'Pilih'
                            }
                        </Text>
                    </Pressable>
                </Flex>
            </Stack>

            <Stack 
                direction='row' 
                justifyContent='space-between'
                padding='10px'
                backgroundColor='white'
                alignItems='center'
                position='absolute'
                bottom='0px'
                left='0px'
                right='0px'
                shadow='5'
            >
                <Stack>
                    <Text fontFamily='Poppins-Light' fontSize='11px'>Total</Text>
                    <Text 
                        color='lancPrimaryLight' 
                        fontFamily='Poppins-SemiBold' 
                        fontSize='13px'
                    >
                        Rp. 
                        {
                            selectedTerm.reduce((accumulator: any, currentValue: any) => {
                                return accumulator + currentValue.amount;
                            }, 0)?.toLocaleString('id')
                        }
                    </Text>
                </Stack>
                <Button 
                    isDisabled={selectedTerm?.length === 0 || paymentMethod === null}
                    size='lg'
                    width='150px'
                    isLoading={pay?.isLoading}
                    onPress={() => {
                        pay?.mutate({
                            transaction_id: data?.id,
                            bank_code: paymentMethod?.code,
                            term_id: selectedTerm?.map((x: any) => x?.id)
                        })
                    }}
                >
                    <Text
                        fontFamily='Poppins-SemiBold' 
                        fontSize='12px'
                        color='white'
                    >Konfirmasi</Text>
                </Button>
            </Stack>

            <ActionSheetPaymentMethod
                disclosure={actoinSheetPaymentMethodDisclosure}
                data={vas?.data?.data}
                paymentMethodCicilan={paymentMethod}
                setPaymentMethodCicilan={setPaymentMethod}
            />
        </Flex>
    )
}

export default TransactionInstallmentPay