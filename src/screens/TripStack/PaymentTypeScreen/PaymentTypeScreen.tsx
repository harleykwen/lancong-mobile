import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { bankListApi, blueprintApi, installmentCreateApi } from '../../../apis/va'
import { tripCheckoutApi } from '../../../apis/trip'
import { LInput } from '../../../components'
import { ROUTE_NAME } from '../../../router'
import { useMutation, useQuery } from 'react-query'
import { 
    Button, 
    Center, 
    Flex, 
    HStack, 
    Icon, 
    Image, 
    Pressable, 
    ScrollView, 
    Select, 
    Stack, 
    Text, 
    VStack, 
    useDisclose
} from 'native-base'
import { 
    IC_ARROW_BACK,
    IC_ARROW_DROP_DOWN,
    LOGO_BCA, 
    LOGO_BJB, 
    LOGO_BNI, 
    LOGO_BRI, 
    LOGO_BSI, 
    LOGO_CIMB, 
    LOGO_MANDIRI, 
    LOGO_PERMATA, 
} from '../../../assets'
import ActionSheetDetail from './components/ActionSheetDetail'
import ActionSheetPaymentMethodCicilan from './components/ActionSheetPaymentMethodCicilan'

interface IPayment {
    navigation: any
    route: any
}

const PaymentTypeScreen = (props: IPayment) => {
    const { navigation, route } = props
    const { transaction } = route?.params

    const [termPlan, setTermPlan] = useState(null)
    const [paymentDate, setPaymentDate] = useState(null)

    const actionSheetDetailDisclosure = useDisclose()
    const actionSheetPaymentMethodDisclosure = useDisclose()

    const [paymentType, setPaymentType] = useState('')
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const [paymentMethodCicilan, setPaymentMethodCicilan] = useState<any>('')

    const vas = useQuery('list-va', bankListApi)
    const blueprint = useQuery('blueprint', () => blueprintApi({
        transactionId: transaction?.id,
        term_plan: termPlan,
        payment_date: paymentDate,
    }), {
        onSuccess: (resp: any) => {
            console.log({ resp})
            if (termPlan === null) setTermPlan(resp?.data?.term_plan[resp?.data?.term_plan?.length - 1]?.value)
            if (paymentDate === null) setPaymentDate(resp?.data?.payment_date[0]?.value)
        }
    })
    const checkout = useMutation(tripCheckoutApi, {
        onSuccess: (resp) => {
            navigation?.replace(ROUTE_NAME.TRIP_NAVIGATOR_CHECKOUT_COMPLETE, { transaction: resp })
        }
    })
    const createInstallment = useMutation(installmentCreateApi, {
        onSuccess: (resp: any) => {
            navigation?.replace(ROUTE_NAME.TRIP_NAVIGATOR_CHECKOUT_COMPLETE, { transaction: resp })
        }
    })

    function generateIconBank(data: any) {
        switch(data?.code) {
            case 'BCA':
                return LOGO_BCA
            case 'BNI':
                return LOGO_BNI
            case 'MANDIRI':
                return LOGO_MANDIRI
            case 'PERMATA':
                return LOGO_PERMATA
            case 'BRI':
                return LOGO_BRI
            case 'CIMB':
                return LOGO_CIMB
            case 'BJB':
                return LOGO_BJB
            case 'BSI':
                return LOGO_BSI
        }
    }

    useEffect(() => {
        blueprint?.refetch()
    }, [termPlan, paymentDate])

    console.log({ transaction })

    return (
        <Flex flex='1' backgroundColor='white'>
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
                <Text fontFamily='Poppins-SemiBold' fontSize='20px'>Ringkasan Pesanan</Text>
            </Stack>

            <ScrollView>
                <VStack space='10px' padding='24px'>
                    <Stack 
                        direction='row' 
                        padding='10px' 
                        shadow='3' 
                        backgroundColor='white'
                        borderRadius='8px'
                        // alignItems='center'
                        space='10px'
                    >
                        <Image 
                            source={{uri: transaction?.order?.trip?.images[0]?.url}} 
                            alt={transaction?.order?.trip?.images[0]?.url} 
                            height='100px'
                            width='100px' 
                            borderRadius='8px'
                        />
                        <Stack flex='1'>
                            <Stack direction='row' alignItems='center'>
                                <Text fontFamily='Poppins-Regular' fontSize='12px'>{transaction?.order?.trip?.name} </Text>
                                <Center backgroundColor='gray.100' padding='4px 8px'>
                                    <Text 
                                        fontFamily='Poppins-SemiBold' 
                                        color='gray.600' 
                                        fontSize='10px'
                                    >
                                        {transaction?.order[transaction?.order?.group]?.duration?.day}
                                        D
                                        {transaction?.order[transaction?.order?.group]?.duration?.night}
                                        N
                                    </Text>
                                </Center>
                            </Stack>
                            <Text 
                                textTransform='capitalize' 
                                fontFamily='Poppins-Regular' 
                                fontSize='12px'
                            >{transaction?.order?.trip?.location?.name}</Text>
                            <Pressable 
                                marginTop='auto'
                                marginLeft='auto'
                                onPress={actionSheetDetailDisclosure.onOpen}
                            >
                                <Text 
                                    textTransform='capitalize' 
                                    fontFamily='Poppins-SemiBold' 
                                    fontSize='12px'
                                    color='lancPrimaryLight'
                                >Lihat lebih detail</Text>
                            </Pressable>
                        </Stack>
                    </Stack>

                    <VStack marginTop='16px' space='8px'>
                        <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Skema Pembayaran</Text>
                        <HStack space='8px'>
                            <Pressable 
                                borderColor={paymentType === 'non-cicilan' ? 'green.600' : 'gray.600'} 
                                borderWidth='1px' 
                                borderRadius='4px'
                                backgroundColor={paymentType === 'non-cicilan' ? 'green.200' : 'white'}
                                onPress={() => setPaymentType('non-cicilan')}
                            >
                                <Text 
                                    fontSize='12px' 
                                    marginX='12px' 
                                    marginY='4px'
                                    color={paymentType === 'non-cicilan' ? 'green.600' : 'gray.600'} 
                                >Pembayaran Penuh</Text>
                            </Pressable>
                            <Pressable 
                                borderColor={paymentType === 'cicilan' ? 'green.600' : 'gray.600'} 
                                borderWidth='1px' 
                                borderRadius='4px'
                                backgroundColor={paymentType === 'cicilan' ? 'green.200' : 'white'}
                                onPress={() => setPaymentType('cicilan')}
                            >
                                <Text 
                                    fontSize='12px' 
                                    marginX='12px' 
                                    marginY='4px'
                                    color={paymentType === 'cicilan' ? 'green.600' : 'gray.600'} 
                                >Cicilan</Text>
                            </Pressable>
                        </HStack>
                    </VStack>

                    {paymentType === 'cicilan' &&
                        <Stack paddingBottom='70px'>
                            <VStack 
                                backgroundColor='warning.200' 
                                padding='8px' 
                                marginX='-10px'
                                marginTop='16px'
                            >
                                <Flex
                                    direction='row' 
                                    alignItems='center' 
                                    justifyContent='space-between'
                                >
                                    <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Down Payment</Text>
                                    <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Rp. {blueprint?.data?.data?.down_payment?.total_amount?.toLocaleString('id')}</Text>
                                </Flex>
                                <Text 
                                    color='warning.600' 
                                    fontSize='10px' 
                                    textAlign='right'
                                >
                                    15% of Total Payment
                                </Text>
                                <Text 
                                    color='gray.600' 
                                    fontSize='10px' 
                                    textAlign='right'
                                >
                                    Sudah termasuk biaya administrasi booking sebesar Rp. {blueprint?.data?.data?.down_payment?.admin_fee?.toLocaleString('id')}
                                </Text>
                            </VStack>
                            <VStack marginTop='16px' space='8px'>
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Banyak Cicilan</Text>
                                <HStack space='8px'>
                                    {blueprint && blueprint?.data?.data?.term_plan?.map((plan: any, index: number) => {
                                        return (
                                            <Pressable 
                                                key={index}
                                                borderColor={termPlan === plan?.value ? 'green.600' : 'gray.600'} 
                                                borderWidth='1px' 
                                                borderRadius='4px'
                                                backgroundColor={termPlan === plan?.value ? 'green.200' : 'white'}
                                                onPress={() => setTermPlan(plan?.value)}
                                            >
                                                <Text 
                                                    fontSize='12px' 
                                                    marginX='12px' 
                                                    marginY='4px'
                                                    color={termPlan === plan?.value ? 'green.600' : 'gray.600'} 
                                                >{plan?.name}</Text>
                                            </Pressable>
                                        )
                                    })}
                                </HStack>
                            </VStack>
                            <VStack marginTop='16px' space='8px'>
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Tanggal Pembayaran</Text>
                                <HStack space='8px'>
                                    {blueprint && blueprint?.data?.data?.payment_date?.map((plan: any, index: number) => {
                                        return (
                                            <Pressable 
                                                key={index}
                                                borderColor={paymentDate === plan?.value ? 'green.600' : 'gray.600'} 
                                                borderWidth='1px' 
                                                borderRadius='4px'
                                                backgroundColor={paymentDate === plan?.value ? 'green.200' : 'white'}
                                                onPress={() => setPaymentDate(plan?.value)}
                                            >
                                                <Text 
                                                    fontSize='12px' 
                                                    marginX='12px' 
                                                    marginY='4px'
                                                    color={paymentDate === plan?.value ? 'green.600' : 'gray.600'} 
                                                >{plan?.name}</Text>
                                            </Pressable>
                                        )
                                    })}
                                </HStack>
                            </VStack>
                            <Flex 
                                marginX='-10px' 
                                padding='10px' 
                                backgroundColor='green.200'
                                marginTop='16px'
                            >
                                <Text fontSize='12px' color='green.600'>Rp. {blueprint?.data?.data?.terms[0]?.amount?.toLocaleString('id')} x {blueprint && blueprint?.data?.data?.terms?.length} Bulan</Text>
                                <Text fontSize='10px' color='gray.600'>Sudah termasuk biaya administrasi</Text>
                            </Flex>
                            <VStack marginTop='16px'>
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Waktu Pembayaran</Text>
                                <VStack marginX='-10px'>
                                    {blueprint?.data?.data?.terms?.map((cicilan: any, index: any) => {
                                        return (
                                            <HStack 
                                                key={index} 
                                                borderBottomColor='gray.400' 
                                                borderBottomWidth='1px' 
                                                padding='10px'
                                                space='10px'
                                                alignItems='center'
                                            >
                                                <Center 
                                                    rounded='full' 
                                                    borderColor='gray.400' 
                                                    borderWidth='1px'
                                                    height='20px'
                                                    width='20px'
                                                >
                                                    <Text fontSize='10px' fontFamily='Poppins-SemiBold'>{index+1}</Text>
                                                </Center>
                                                <Text fontSize='10px' fontFamily='Poppins-SemiBold'>{cicilan?.expected_date}</Text>
                                                <Flex flexDirection='column' marginLeft='auto' alignItems='flex-end'>
                                                    <Text fontFamily='Poppins-SemiBold' fontSize='12px' color='green.600'>Rp. {cicilan?.amount?.toLocaleString('id')}</Text>
                                                    <Text fontSize='10px' color='orange.600'>Include admin fee Rp. {cicilan?.admin_fee?.toLocaleString('id')}</Text>
                                                </Flex>
                                            </HStack>
                                        )
                                    })}
                                </VStack>
                            </VStack>
                            <Flex 
                                marginX='-10px' 
                                padding='10px' 
                                backgroundColor='green.200'
                                marginTop='16px'
                                alignItems='center'
                                flexDirection='row'
                                justifyContent='space-between'
                            >
                                <Text fontSize='12px' color='green.600'>Metode Pembayaran</Text>
                                <Pressable onPress={() => actionSheetPaymentMethodDisclosure?.onOpen()}>
                                    <Text fontSize='12px' color='gray.600'>
                                        {
                                            paymentMethodCicilan
                                                ?   paymentMethodCicilan?.name
                                                :   'Pilih'
                                        }
                                    </Text>
                                </Pressable>
                            </Flex>
                        </Stack>
                    }

                    {paymentType === 'non-cicilan' &&
                        <Stack paddingBottom='70px' space='10px'>
                            <Stack 
                                backgroundColor='white' 
                                // padding='10px' 
                                // space='10px'
                            >
                                <Stack space='10px'>
                                    <Text margin='10px' fontSize='15px' fontFamily='Poppins-SemiBold'>Bayar dengan:</Text>
                                    <Text margin='10px' fontSize='15px' fontFamily='Poppins-SemiBold'>Virtual Account</Text>
                                </Stack>
                                {vas?.data?.data?.map((va: any, index: number) => {
                                    return (
                                        <Pressable key={index} onPress={() => setSelectedPaymentMethod(va?.code)}>
                                            <Stack
                                                direction='row' 
                                                alignItems='center'
                                                justifyContent='space-between' 
                                                padding='12px'
                                                backgroundColor={selectedPaymentMethod === va?.code ? 'lancPrimaryLight' : 'white'}
                                            >
                                                <Stack 
                                                    direction='row' 
                                                    alignItems='center' 
                                                    space='10px'
                                                >
                                                    <Image 
                                                        source={generateIconBank(va)} 
                                                        width='50px' 
                                                        height='35.71px' 
                                                        alt={va?.name}
                                                    />
                                                    <Text 
                                                        fontSize='13px' 
                                                        fontFamily='Poppins-Medium'
                                                        color={selectedPaymentMethod === va?.code ? 'white' : 'black'}
                                                    >{va.name}</Text>
                                                </Stack>
                                                <Icon 
                                                    as={MaterialIcons} 
                                                    name='chevron-right' 
                                                    color={selectedPaymentMethod === va?.code ? 'white' : 'gray.600'} 
                                                    size='md' 
                                                />
                                            </Stack>
                                        </Pressable>
                                    )
                                })}
                            </Stack>
                        </Stack>
                    }
                </VStack>
            </ScrollView>

            {
                paymentType &&
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
                            Rp. {
                                paymentType === 'non-cicilan'
                                    ?   transaction?.order?.total_price?.toLocaleString('id')
                                    :   blueprint?.data?.data?.down_payment?.total_amount?.toLocaleString('id')
                            }
                        </Text>
                    </Stack>
                    <Button 
                        width='150px'
                        isLoading={checkout?.isLoading || createInstallment?.isLoading}
                        onPress={() => {
                            if (paymentType === 'cicilan') {
                                console.log({
                                    termPlan,
                                    paymentDate,
                                    paymentMethodCicilan,
                                })
                                createInstallment?.mutate({
                                    transaction_id: transaction?.id,
                                    term_plan: termPlan,
                                    payment_date: paymentDate,
                                    bank_code: paymentMethodCicilan?.code,
                                })
                            } else {
                                checkout.mutate({
                                    transaction_id: transaction?.id,
                                    bank_code: selectedPaymentMethod,
                                })
                            }
                        }}
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='15px'
                            color='white'
                        >Konfirmasi</Text>
                    </Button>
                </Stack>
            }

            <ActionSheetDetail
                disclosure={actionSheetDetailDisclosure}
                data={transaction}
            />

            <ActionSheetPaymentMethodCicilan
                disclosure={actionSheetPaymentMethodDisclosure}
                data={vas?.data?.data}
                paymentMethodCicilan={paymentMethodCicilan}
                setPaymentMethodCicilan={setPaymentMethodCicilan}
            />
        </Flex>
    )
}

export default PaymentTypeScreen