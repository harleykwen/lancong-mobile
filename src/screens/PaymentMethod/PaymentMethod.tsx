import React from 'react'
import * as Unicons from 'react-native-unicons'
import { Header } from '../../components'
import { 
    Center, 
    Flex, 
    HStack, 
    Icon, 
    Image, 
    Text, 
    VStack
} from 'native-base'
import { LOGO_BCA, LOGO_BNI, LOGO_BRI, LOGO_MANDIRI, LOGO_PERMATA } from '../../assets'

interface IPaymentMethod {
    navigation: any
}

const PaymentMethodItem = ({ data }: any) => {
    console.log(data)
    return (
        <HStack 
            justifyContent='space-between' 
            paddingY='10px' 
            borderBottomColor='gray.400'
            borderBottomWidth='1px'
            alignItems='center'
        >
            <HStack alignItems='center' space='5px'>
                <Image source={data.logo} width='50px' height='35.71px' />
                <Text fontSize='14px'>{data.name}</Text>
            </HStack>
            <Icon as={Unicons.AngleRight} />
        </HStack>
    )
}

const PaymentMethod = (props: IPaymentMethod) => {
    const { navigation } = props

    const paymentMethods = [
        {
            type: 'Transfer Bank',
            list: [
                { name: 'Mandiri', logo: LOGO_MANDIRI },
                { name: 'BCA', logo: LOGO_BCA },
                { name: 'BRI', logo: LOGO_BRI },
                { name: 'BNI', logo: LOGO_BNI },
                { name: 'Permata', logo: LOGO_PERMATA },
            ],
        },
        {
            type: 'Virtual Account',
            list: [
                { name: 'Mandiri', logo: LOGO_MANDIRI },
                { name: 'BCA', logo: LOGO_BCA },
            ],
        },
    ]

    return (
        <Flex flex='1'>
            <Header 
                title='Payment Method'
                subtitle='1. Order Data - 2. Payment'
                onPressBack={() => navigation?.goBack()}
            />
            <Center padding='10px' backgroundColor='#cde6cd'>
                <HStack space='5px'>
                    <Text color='#038103'>Complete the order in</Text>
                    <Text fontWeight='semibold' color='gray.700'>00:59:06</Text>
                    <Icon as={Unicons.Clock} color='gray.700' />
                </HStack>
            </Center>
            <VStack space='25px' padding='10px'>
                {paymentMethods?.map((paymentMethod: any, index: number) => {
                    return (
                        <Flex key={index}>
                            <Text fontSize='14px' fontWeight='semibold'>{paymentMethod.type}</Text>
                            {paymentMethod.list.map((paymentMethodList: any, index: number) => {
                                return <PaymentMethodItem key={index} data={paymentMethodList} />
                            })}
                        </Flex>
                    )
                })}
            </VStack>
        </Flex>
    )
}

export default PaymentMethod