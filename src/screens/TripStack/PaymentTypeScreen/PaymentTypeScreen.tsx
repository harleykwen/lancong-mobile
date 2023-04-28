import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { getListVaApi } from '../../../apis/payment.api'
import { useQuery } from 'react-query'
import { Header, LInput } from '../../../components'
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
    VStack 
} from 'native-base'
import { 
    LOGO_BCA, 
    LOGO_BJB, 
    LOGO_BNI, 
    LOGO_BRI, 
    LOGO_BSI, 
    LOGO_CIMB, 
    LOGO_MANDIRI, 
    LOGO_PERMATA, 
} from '../../../assets'

interface IPayment {
    navigation: any
    route: any
}

const PaymentTypeScreen = (props: IPayment) => {
    const { navigation, route } = props
    const { 
        data, 
        group, 
        trip,
        pelancong,
        checkoutData, 
        specialRequests,
    } = route?.params

    const baseStylePressedComponent: object = {
        height:'50px',
        backgroundColor:'gray.200',
        paddingX:'16px',
        paddingY:'8px',
        flexDirection:'row',
        alignItems:'center',
        _pressed:{
            backgroundColor: 'gray.300'
        }
    }

    const baseStylePressedTextComponent: object = {
        fontFamily: 'Poppins-Medium',
        fontSize: '13px',
        marginTop: '2px',
    }

    const [paymentType, setPaymentType] = useState('')
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

    const vas = useQuery('list-va', getListVaApi)

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

    return (
        <Flex flex='1' backgroundColor='white'>
            <Header
                title='Pembayaran'
                subtitle='1. Lengkap Data   -   2. Pembayaran'
                onPressBack={() => navigation.goBack()}
            />

            <ScrollView>
                <VStack space='10px' padding='10px'>
                    <Select 
                        placeholder="Pilih skema pembayaran"  
                        mt={1} 
                        dropdownIcon={<></>} 
                        width='full'
                        selectedValue={paymentType} 
                        onValueChange={itemValue => {
                            setPaymentType(itemValue)
                            setSelectedPaymentMethod('')
                        }}
                        InputRightElement={<Icon as={MaterialIcons} name='chevron-right' color='gray.400' size='lg' marginRight='15px' />}
                        {...baseStylePressedComponent}
                        {...baseStylePressedTextComponent}
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
                                {vas?.data?.map((va: any, index: number) => {
                                    return (
                                        <Pressable key={index} onPress={() => setSelectedPaymentMethod(va?.code)}>
                                            <Stack
                                                direction='row' 
                                                alignItems='center'
                                                justifyContent='space-between' 
                                                padding='12px'
                                                backgroundColor={selectedPaymentMethod === va?.code ? 'xprimary.50' : 'white'}
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
                        color='xprimary.50' 
                        fontFamily='Poppins-Medium' 
                        fontSize='13px'
                    >
                        Rp. {' '}
                        {
                            (
                                Number(data?.price * checkoutData?.totalPelancong) +
                                Number(
                                    specialRequests
                                    ?.filter((x: any) => x?.qty != 0)
                                    ?.reduce((accumulator: number, { price, qty }: any ) => {
                                        return accumulator + (qty * price)
                                      }, 0)
                                )
                            )
                                ?.toLocaleString('id')
                        }
                    </Text>
                </Stack>
                <Button 
                    height='50px'
                    borderRadius='8px'
                    backgroundColor='xprimary.50'
                    _pressed={{
                        backgroundColor: 'xprimary.40'
                    }}
                    onPress={() => navigation.push('payment-method', { 
                        data: data,
                        group: group,
                        trip: trip,
                        pelancong,
                        checkoutData,
                        paymentType,
                        specialRequests,
                    })}
                >
                    <Text
                        fontFamily='Poppins-SemiBold' 
                        fontSize='15px'
                        color='white'
                    >Konfirmasi</Text>
                </Button>
            </Stack>
        </Flex>
    )
}

export default PaymentTypeScreen