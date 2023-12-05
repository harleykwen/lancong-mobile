import React from 'react'
import { IC_ARROW_BACK } from '../../../assets'
import { ROUTE_NAME } from '../../../router'
import { useMutation, useQuery } from 'react-query'
import { getFullPaymentSummaryApiProps, tripCheckoutApi } from '../../../apis/trip'
import { 
    Button,
    Flex, 
    Image, 
    Pressable, 
    Stack,
    Text, 
} from 'native-base'

interface FullPaymentSummaryProps {
    navigation?: any
    route?: any
} 

const FullPaymentSummary:React.FC<FullPaymentSummaryProps> = (props: FullPaymentSummaryProps) => {
    const { navigation, route } = props
    const { transaction, selectedPaymentMethod } = route?.params

    console.log({ transaction, selectedPaymentMethod })

    const summary = useQuery(
        `trip-full-payment-summary-${transaction?.id}`, 
        () => getFullPaymentSummaryApiProps({ transactionId: transaction?.id }),
        {
            onSuccess: (resp) => console.log({resp})
        }
    )

    const checkout = useMutation(tripCheckoutApi, {
        onSuccess: (resp) => {
            navigation?.replace(ROUTE_NAME.TRIP_NAVIGATOR_CHECKOUT_COMPLETE, { transaction: resp })
        }
    })

    return (
        <Flex flex='1'>
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

            <Stack paddingX='16px' marginTop='16px'>
                <Stack 
                    padding='16px' 
                    backgroundColor='white' 
                    borderRadius='4px' 
                    shadow='5'
                    space='8px'
                >
                    <Text fontFamily='Poppins-SemiBold'>Trip</Text>
                    <Stack>
                        <Text fontSize='12px'>Group</Text>
                        <Text fontSize='12px' fontFamily='Poppins-SemiBold'>{summary?.data?.data?.order?.group?.toUpperCase()}</Text>
                    </Stack>
                    <Stack>
                        <Text fontSize='12px'>Participant</Text>
                        <Stack>
                            {summary?.data?.data?.order?.participants?.map((participant: any, participantIndex: number) => {
                                return (
                                    <Text fontSize='12px' fontFamily='Poppins-SemiBold'>{participantIndex+1}. {participant?.name}</Text>
                                )
                            })}
                        </Stack>
                    </Stack>
                    <Stack>
                        <Text fontSize='12px'>Special Request</Text>
                        <Stack>
                            {summary?.data?.data?.order?.special_requests
                                ?.filter((sr: any) => sr?.amount !== 0)
                                ?.map((sr: any, srIndex: number) => {
                                    return (
                                        <Text fontSize='12px' fontFamily='Poppins-SemiBold'>{srIndex+1}. {sr?.type} {sr?.description} {sr?.amount}X</Text>
                                    )
                                })
                            }
                            {summary?.data?.data?.order?.special_requests?.filter((sr: any) => sr?.amount !== 0)?.length === 0
                                ?   <Text fontSize='12px' fontFamily='Poppins-SemiBold'>-</Text>
                                :   null
                            }
                        </Stack>
                    </Stack>
                    <Stack>
                        <Text fontSize='12px'>Pax Price</Text>
                        <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Rp. {summary?.data?.data?.order?.pax_price?.toLocaleString('id')}</Text>
                    </Stack>
                    <Stack>
                        <Text fontSize='12px'>SR Price</Text>
                        <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Rp. {summary?.data?.data?.order?.sr_price?.toLocaleString('id')}</Text>
                    </Stack>
                </Stack>
            </Stack>

            <Stack paddingX='16px' marginTop='16px'>
                <Stack 
                    padding='16px' 
                    backgroundColor='white' 
                    borderRadius='4px' 
                    shadow='5'
                    space='8px'
                >
                    <Text fontFamily='Poppins-SemiBold'>Pembayaran</Text>
                    <Stack>
                        <Text fontSize='12px'>Amount</Text>
                        <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Rp. {summary?.data?.data?.payments?.amount?.toLocaleString('id')}</Text>
                    </Stack>
                    <Stack>
                        <Text fontSize='12px'>Admin Fee</Text>
                        <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Rp. {summary?.data?.data?.payments?.cnb[0]?.amount?.toLocaleString('id')}</Text>
                    </Stack>
                    <Stack>
                        <Text fontSize='12px'>Total Amount</Text>
                        <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Rp. {summary?.data?.data?.payments?.total_amount?.toLocaleString('id')}</Text>
                    </Stack>
                    <Stack>
                        <Text fontSize='12px'>Metode Pembayaran</Text>
                        <Text fontSize='12px' fontFamily='Poppins-SemiBold'>Virtual Account {selectedPaymentMethod}</Text>
                    </Stack>
                </Stack>
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
                        Rp. {summary?.data?.data?.payments?.total_amount?.toLocaleString('id')}
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
        </Flex>
    )
}

export default FullPaymentSummary