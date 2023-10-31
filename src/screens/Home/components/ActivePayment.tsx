import React, { useEffect } from 'react'
import useCountDown from '../../../../hooks/useCountdown'
import { ROUTE_NAME } from '../../../router'
import { 
    Flex, 
    Pressable, 
    Stack, 
    Text, 
} from 'native-base'

type TActivePayment = {
    navigation: any
    activePayment: any
}

const ActivePayment: React.FC<TActivePayment> = (props: TActivePayment) => {
    const { navigation, activePayment } = props

    const { hours, minutes, seconds, start: startCountdown, isCountdown } = useCountDown()

    useEffect(() => {
        startCountdown(activePayment?.data?.data?.expiration_date)
    }, [activePayment])

    if (!activePayment?.isFetching && activePayment?.data?.data && isCountdown) return (
        <Pressable
            onPress={() => {
                navigation.navigate(ROUTE_NAME.TRANSACTION_NAVIGATOR, {
                    screen: ROUTE_NAME.TRANSACTION_NAVIGATOR_DETAIL,
                    params: {
                        transactionId: activePayment?.data?.data?.transaction_id,
                    },
                })
            }}
        >
            <Stack
                margin='16px'
                backgroundColor='white'
                padding='16px'
                borderRadius='4px'
                borderWidth='1px'
                borderColor='#e5e5e5'
            >
                <Flex
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Text 
                        color='orange.600' 
                        fontFamily='Poppins-Regular' 
                        fontSize='12px'
                    >Menunggu Pembayaran</Text>
                    {
                        isCountdown &&
                        <Flex
                            alignItems='center'
                            justifyContent='center'
                            paddingY='4px'
                            paddingX='16px'
                            backgroundColor='red.600'
                            borderRadius='full'
                        >
                            <Text
                                color='white'
                                fontFamily='Poppins-SemiBold'
                                fontSize='xs'
                            >{hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                        </Flex>
                    }
                </Flex>
                <Text
                    marginTop='8px'
                    color='black'
                    fontFamily='Poppins-Regular'
                    fontSize='12px'
                >{activePayment?.data?.data?.bank_code} {activePayment?.data?.data?.payment_method?.replaceAll('_', ' ')?.toUpperCase()}</Text>
                <Text
                    color='black'
                    fontFamily='Poppins-Regular'
                    fontSize='12px'
                >Rp. {activePayment?.data?.data?.expected_amount?.toLocaleString('id')}</Text>
            </Stack>
        </Pressable>
    )

    return <></>
}

export default ActivePayment