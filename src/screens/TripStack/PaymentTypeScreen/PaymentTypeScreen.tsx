import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { bankListApi } from '../../../apis/va'
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

interface IPayment {
    navigation: any
    route: any
}

const PaymentTypeScreen = (props: IPayment) => {
    const { navigation, route } = props
    const { transaction } = route?.params

    const actionSheetDetailDisclosure = useDisclose()

    const [paymentType, setPaymentType] = useState('')
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

    const vas = useQuery('list-va', bankListApi)
    const checkout = useMutation(tripCheckoutApi, {
        onSuccess: (resp) => {
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

                    <Select 
                        placeholder="Pilih skema pembayaran"  
                        selectedValue={paymentType} 
                        onValueChange={itemValue => {
                            setPaymentType(itemValue)
                            setSelectedPaymentMethod('')
                        }}
                        dropdownIcon={
                            <Stack
                                direction='row'
                                width='full'
                                position='absolute'
                                top='0'
                                bottom='0'
                                alignItems='center'
                                justifyContent='space-between'
                            >
                                <Stack></Stack>
                                <Image
                                    alt='IC_ARROW_DROPDOWN'
                                    source={IC_ARROW_DROP_DOWN}
                                    width='32px'
                                    height='32px'
                                    marginRight='16px'
                                    tintColor='lancSurfaceLight'
                                />
                            </Stack>
                        } 
                    >
                        <Select.Item label="Cicilan" value="cicilan" />
                        <Select.Item label="Pembayaran Penuh" value="non-cicilan" />
                    </Select>

                    {paymentType === 'cicilan' &&
                        <Stack space='10px'>
                            <VStack>
                                <LInput 
                                    label='Down Payment' 
                                    type='number'
                                />
                                <Text 
                                    color='#038103' 
                                    fontSize='10px' 
                                    textAlign='right'
                                >
                                    15% of Total Payment
                                </Text>
                                <Text 
                                    color='gray.400' 
                                    fontSize='10px' 
                                    textAlign='right'
                                >
                                    Sudah termasuk biaya administrasi booking sebesar Rp. 7.000
                                </Text>
                            </VStack>
                            <HStack space='10px'>
                                <Flex width='50%'>
                                    <LInput
                                        label='Rencana Cicilan'
                                        type='select'
                                        options={[{label: '6x', value: '6x'}]}
                                    />
                                </Flex>
                                <Flex width='50%'>
                                    <LInput
                                        label=' '
                                        type='number'
                                        options={[{label: '6x', value: '6x'}]}
                                    />
                                </Flex>
                            </HStack>
                            <LInput 
                                label='Tanggal Pembayaran' 
                                type='radio'
                                options={[
                                    { label: '2', value: '2' },
                                    { label: '10', value: '10' },
                                    { label: '25', value: '25' },
                                    { label: '28', value: '28'}
                                ]} 
                            />
                            <Flex 
                                marginX='-10px' 
                                padding='10px' 
                                backgroundColor='#c5e2c5'
                            >
                                <Text fontSize='10px' color='#038103'>Rp. 151.625 x 6 Bulan</Text>
                                <Text fontSize='10px' color='gray.400'>Sudah termasuk biaya administrasi</Text>
                            </Flex>
                            <Text>Waktu Pembayaran</Text>
                            <VStack marginX='-10px'>
                                {[...Array(6)].map((cicilan: any, index: any) => {
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
                                                height='30px'
                                                width='30px'
                                            >
                                                <Text>{index+1}</Text>
                                            </Center>
                                            <Text>0{index+1} Juni 2021</Text>
                                            <Text fontWeight='bold' marginLeft='auto'>Rp. 151.000</Text>
                                        </HStack>
                                    )
                                })}
                            </VStack>
                        </Stack>
                    }

                    {paymentType &&
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
                        Rp. {transaction?.order?.total_price}
                    </Text>
                </Stack>
                <Button 
                    width='150px'
                    isLoading={checkout?.isLoading}
                    onPress={() => {
                        checkout.mutate({
                            transaction_id: transaction?.id,
                            bank_code: selectedPaymentMethod,
                        })
                    }}
                >
                    <Text
                        fontFamily='Poppins-SemiBold' 
                        fontSize='15px'
                        color='white'
                    >Konfirmasi</Text>
                </Button>
            </Stack>

            <ActionSheetDetail
                disclosure={actionSheetDetailDisclosure}
                data={transaction}
            />
        </Flex>
    )
}

export default PaymentTypeScreen