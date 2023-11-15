import React, { useState } from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { IC_CHEVRON_RIGHT, IC_CONTENT_COPY } from '../../../../assets'
import { 
    Actionsheet, 
    Button, 
    Flex, 
    HStack, 
    Image, 
    Pressable, 
    Stack, 
    Text, 
    useClipboard, 
    useDisclose, 
} from 'native-base'
import { useMutation, useQuery } from 'react-query'
import { bankListApi } from '../../../../apis/va'
import ActionSheetPaymentMethod from './ActionSheetPaymentMethod'
import { renewalFullPaymentVaApi } from '../../../../apis/transaction'
import { ROUTE_NAME } from '../../../../router'

type TInstallmentCard = {
    data: any
    index: number
    navigation: any
}

const InstallmentCard: React.FC<TInstallmentCard> = (props: TInstallmentCard) => {
    const { 
        data, 
        index, 
        navigation, 
    } = props

    const actionSheetDetail = useDisclose()
    const actoinSheetPaymentMethodDisclosure = useDisclose()
    const { onCopy } = useClipboard()

    const [isGoingRenewal, setIsGoingRenewal] = useState<boolean>(false)
    const [paymentMethod, setPaymentMethod] = useState<any>(null)

    const vas = useQuery('list-va', bankListApi)
    const renewal = useMutation(renewalFullPaymentVaApi, {
        onSuccess: (resp: any) => {
            navigation?.replace(ROUTE_NAME.TRANSACTION_NAVIGATOR_INSTALLMENT_COMPLETE, { transaction: resp })
        }
    })

    console.log({data})
    
    return (
        <Pressable
            onPress={() => {
                if (data?.method === null) return
                actionSheetDetail?.onOpen()
            }}
        >
            <Flex
                padding='16px' 
                backgroundColor='#ffffff'
                borderWidth='1px'
                borderColor='#e5e5e5'
            >
                <HStack alignItems='center' justifyContent='space-between'>
                    <Text 
                        fontFamily='Poppins-Regular' 
                        fontSize='12px'
                    >{index === 0 ? 'Down Payment' : `Termin ke - ${index}`}</Text>
                    <Flex 
                        padding='4px' 
                        borderRadius='0px'
                        backgroundColor={data?.status?.background}
                    >
                        <Text 
                            fontFamily='Poppins-Regular' 
                            fontSize='10px' 
                            color={data?.status?.color}
                        >{data?.status?.text?.toUpperCase()}</Text>
                    </Flex>
                </HStack>
                <Text
                    fontFamily='Poppins-Regular' 
                    color='orange.600' 
                    fontSize='12px'
                >Rp. {data?.total_amount?.toLocaleString('id')}</Text>
            </Flex>

            <Actionsheet isOpen={actionSheetDetail?.isOpen} onClose={actionSheetDetail?.onClose}>
                <Actionsheet.Content
                    padding='16px'
                    backgroundColor='lancBackgroundLight'
                    alignItems='flex-start'
                >
                    <Stack space='16px' width='full'>
                        <Stack>
                            <Text fontSize='12px' color='lancOutlineLight'>Metode Pembayaran</Text>
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>
                                {data[data?.method]?.bank_code} {data?.method?.replaceAll('_', ' ')?.toUpperCase()}
                            </Text>
                        </Stack>

                        <Stack width='full'>
                            <Text fontSize='12px' color='lancOutlineLight'>Total Pembayaran</Text>
                            <HStack alignItems='center' justifyContent='space-between'>
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>
                                    Rp. {data[data?.method]?.expected_amount?.toLocaleString('id')}
                                </Text>
                                {
                                    data?.status?.flag !== 'PAID' &&
                                    <Pressable
                                        onPress={() => onCopy(`${data[data?.method]?.expected_amount}`)}
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
                                }
                            </HStack>
                        </Stack>

                        {
                            data?.status?.flag !== 'PAID' ||
                            data?.status?.flag?.toUpperCase() !== 'EXPIRED' &&
                            <Stack width='full'>
                                <Text fontSize='12px' color='lancOutlineLight'>Nomor Virtual Account</Text>
                                <HStack alignItems='center' justifyContent='space-between'>
                                    <Text fontSize='12px' fontFamily='Poppins-SemiBold'>
                                        {data[data?.method]?.account_number}
                                    </Text>
                                    <Pressable
                                        onPress={() => onCopy(`${data[data?.method]?.account_number}`)}
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
                                </HStack>
                            </Stack>
                        }

                        <Stack>
                            <Text fontSize='12px' color='lancOutlineLight'>Status</Text>
                            <Text fontSize='12px' fontFamily='Poppins-SemiBold'>
                                {data?.status?.text?.toUpperCase()}
                            </Text>
                        </Stack>

                        {
                            data?.status?.flag?.toUpperCase() === 'PAID' &&
                            <Stack>
                                <Text fontSize='12px' color='lancOutlineLight'>Tanggal Pembayaran</Text>
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>
                                    {format(new Date(data?.payment_date), 'dd LLLL yyyy, HH:mm', { locale: id })} WIB
                                </Text>
                            </Stack>
                        }

                        {
                            data?.status?.flag?.toUpperCase() === 'EXPIRED' || data?.status?.flag?.toUpperCase() === 'AWAITING_PAYMENT' &&
                            <Stack>
                                <Text fontSize='12px' color='lancOutlineLight'>Batas Akhir Pembayaran</Text>
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>
                                    {format(new Date(data?.expected_payment_date), 'dd LLLL yyyy, HH:mm', { locale: id })} WIB
                                </Text>
                            </Stack>
                        }

                        {
                            data?.status?.flag?.toUpperCase() === 'EXPIRED' &&
                            isGoingRenewal 
                                ?   <Flex
                                        padding='16px'
                                        flexDirection='row'
                                        alignItems='flex-end'
                                        justifyContent='space-between'
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
                                :   null
                        }

                        {
                            data?.status?.flag?.toUpperCase() === 'EXPIRED'
                                ?   <Button 
                                        size='lg' 
                                        _text={{ fontSize: '12px' }}
                                        isDisabled={isGoingRenewal && !paymentMethod}
                                        isLoading={renewal?.isLoading}
                                        onPress={() => {
                                            if (isGoingRenewal) {
                                                // renewal?.mutate({
                                                //     full_payment_id: data?.payment_id,
                                                //     payment_id: data?.payment_id,
                                                //     bank_code: paymentMethod?.code,
                                                // })
                                            } else {
                                                setIsGoingRenewal(true)
                                            }
                                        }}
                                    >
                                        {isGoingRenewal ? 'Perbarui Sekarang' : 'Perbarui'}
                                    </Button>
                                :   null
                        }
                    </Stack>
                </Actionsheet.Content>
            </Actionsheet>

            <ActionSheetPaymentMethod
                disclosure={actoinSheetPaymentMethodDisclosure}
                data={vas?.data?.data}
                paymentMethodCicilan={paymentMethod}
                setPaymentMethodCicilan={setPaymentMethod}
            />
        </Pressable>
    )
}

export default InstallmentCard