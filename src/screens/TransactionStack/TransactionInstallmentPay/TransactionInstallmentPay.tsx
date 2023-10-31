import React, { useState } from 'react'
import ActionSheetPaymentMethod from './components/ActionSheetPaymentMethod'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ROUTE_NAME } from '../../../router'
import { bankListApi, installmentPayApi } from '../../../apis/va'
import { useMutation, useQuery } from 'react-query'
import { IC_ARROW_BACK, IC_CHEVRON_RIGHT } from '../../../assets'
import { 
    Button,
    Center,
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

    return (
        <Flex flex='1' backgroundColor='#f7f7f7'>
            <Flex 
                direction='row' 
                paddingX='24px'
                paddingY='16px' 
                alignItems='center' 
                justifyContent='center'
                borderBottomWidth='1px'
                borderBottomColor='#e5e5e5'
                backgroundColor='#ffffff'
                position='relative'
            >
                <Pressable 
                    position='absolute'
                    left='16px'
                    onPress={() => navigation?.goBack()}
                >
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='18px'
                        height='18px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Text 
                    fontSize='14px' 
                    color='#101010' 
                    fontFamily='Poppins-SemiBold'
                >Pembayaran Termin</Text>
            </Flex>

            <Stack 
                backgroundColor='gray.100' 
                marginTop='16px' 
                space='16px'
            >
                {handleGetTerm()?.map((v: any, i: number) => {
                    return (
                        <Pressable
                            key={i} 
                            onPress={() => {
                                if (v?.payment_date !== null) return
                                const tempSelectedTerm = handleGetTerm()?.filter((_: any, idx: number) => idx <= i)
                                setSelectedTerm(() => {
                                    return tempSelectedTerm
                                        ?.filter((x: any) => x?.payment_date === null)
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
                                    backgroundColor='#ffffff'
                                    borderWidth='1px'
                                    borderColor='#e5e5e5'
                                    flex='1'
                                >
                                    <Center 
                                        backgroundColor={v?.status?.background??'#FFFFFF'}
                                        padding='4px'
                                        marginRight='auto'
                                    >
                                        <Text 
                                            fontSize='10px'
                                            fontFamily='Poppins-Regular'
                                            color={v?.status?.color}
                                        >
                                            {v?.status?.text?.toUpperCase()}
                                        </Text>
                                    </Center>
                                    <Text 
                                        fontSize='12px' 
                                        fontFamily='Poppins-Regular'
                                        marginTop='8px'
                                    >{data?.order?.trip?.name} {i+1}/{handleGetTerm()?.length}</Text>
                                    <Text 
                                        marginTop='8px' 
                                        color='orange.600'
                                        fontSize='12px'
                                        fontFamily='Poppins-Regular'
                                    >
                                        Rp. {v?.amount?.toLocaleString('id')}
                                    </Text>
                                    {
                                        !v?.payment_date &&
                                        <Text 
                                            color='gray.400'
                                            fontSize='12px'
                                            fontFamily='Poppins-Regular'
                                            marginTop='8px'
                                        >
                                            Bayar sebelum: {format(new Date(v?.expected_payment_date), 'dd MMM yyyy, HH:mm', { locale: id }) + ' WIB'}
                                        </Text>
                                    }
                                    {
                                        v?.payment_date
                                            ?   <Stack>
                                                    <Text 
                                                        marginTop='8px'
                                                        color='gray.400'
                                                        fontSize='12px'
                                                        fontFamily='Poppins-Regular'
                                                    >
                                                        Dibayar pada:
                                                    </Text>
                                                    <Text 
                                                        color='gray.400'
                                                        fontSize='12px'
                                                        fontFamily='Poppins-Regular'
                                                    >
                                                        {format(new Date(v?.payment_date), 'dd MMM yyyy, HH:mm', { locale: id }) + ' WIB'}
                                                    </Text>
                                                </Stack>
                                            :   null
                                    }
                                </Flex>
                            </Stack>
                        </Pressable>
                    )
                })}

                {
                    selectedTerm?.length > 0 &&
                    <Flex
                        padding='16px'
                        marginTop='16px'
                        flexDirection='row'
                        alignItems='flex-end'
                        justifyContent='space-between'
                        marginX='16px'
                        backgroundColor='#ffffff'
                        borderWidth='1px'
                        borderColor='#e5e5e5'
                    >
                        <Stack>
                            <Text fontSize='12px' color='gray.600'>Metode Pembayaran</Text>
                            { paymentMethod && <Text fontSize='12px' fontFamily='Poppins-SemiBold'>{paymentMethod?.name}</Text>}
                        </Stack>
                        <Pressable onPress={() => actoinSheetPaymentMethodDisclosure?.onOpen()}>
                            <Stack
                                direction='row'
                                space='0px'
                                alignItems='center'
                            >
                                <Text 
                                    fontSize='12px' 
                                    color='black'
                                >
                                    {
                                        paymentMethod
                                            ? 'Ganti'
                                            : 'Pilih'
                                    }
                                </Text>
                                <Image
                                    alt='IC_CHEVRON_RIGHT'
                                    source={IC_CHEVRON_RIGHT}
                                    width='18px'
                                    height='18px'
                                    tintColor='black'
                                />
                            </Stack>
                        </Pressable>
                    </Flex>
                }
            </Stack>

            <Stack 
                direction='row' 
                justifyContent='space-between'
                padding='16px'
                backgroundColor='white'
                alignItems='center'
                position='absolute'
                bottom='0px'
                left='0px'
                right='0px'
                shadow='5'
            >
                <Stack>
                    <Text fontFamily='Poppins-Regular' fontSize='12px'>Total</Text>
                    <Text 
                        color='orange.600' 
                        fontFamily='Poppins-Regular' 
                        fontSize='12px'
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
                    padding='12px'
                    borderRadius='0px'
                    width='150px'
                    isLoading={pay?.isLoading}
                    _text={{
                        fontSize: '12px',
                        fontFamily: 'Poppins-SemiBold'
                    }}
                    onPress={() => {
                        pay?.mutate({
                            transaction_id: data?.id,
                            bank_code: paymentMethod?.code,
                            term_id: selectedTerm?.map((x: any) => x?.id)
                        })
                    }}
                >
                    Konfirmasi
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