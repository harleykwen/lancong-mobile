import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Header } from '../../../components'
import { useQuery } from 'react-query'
import { getListVaApi } from '../../../apis/payment.api'
import 
{ 
    Button,
    Flex, 
    Icon, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack, 
    Text, 
} from 'native-base'
import { 
    LOGO_BCA, 
    LOGO_BNI, 
    LOGO_BRI, 
    LOGO_MANDIRI, 
    LOGO_PERMATA, 
} from '../../../assets'

interface IPaymentMethodScreen {
    navigation?: any
    route?: any
} 

const PaymentMethodScreen = (props: IPaymentMethodScreen) => {
    const { navigation, route } = props
    const { 
        data, 
        group, 
        trip,
        pelancong,
        checkoutData, 
        paymentType,
        specialRequests,
    } = route?.params

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

        }
    }

    return (
        <Flex flex='1'>
            <Header
                title='Pembayaran'
                subtitle='1. Lengkap Data   -   2. Pembayaran'
                onPressBack={() => navigation.goBack()}
            />
            <ScrollView>
                <Stack paddingBottom='70px' space='10px'>
                    <Stack 
                        backgroundColor='white' 
                        // padding='10px' 
                        // space='10px'
                    >
                        <Text margin='10px' fontSize='15px' fontFamily='Poppins-SemiBold'>Virtual Account</Text>
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
                    onPress={() => navigation.push('payment-type', {
                        data: data,
                        group: group,
                        trip: trip,
                        pelancong,
                        checkoutData,
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

export default PaymentMethodScreen