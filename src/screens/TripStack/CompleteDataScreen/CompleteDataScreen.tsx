import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useMutation } from 'react-query'
import { updateTransactionTripApi } from '../../../apis/trip'
import { IC_ARROW_BACK } from '../../../assets'
import { ROUTE_NAME } from '../../../router'
import { 
    Button,
    Flex, 
    Icon, 
    Image, 
    Pressable, 
    Stack, 
    Text,
} from 'native-base'

interface ICompleteDataScreen {
    navigation: any
    route: any
}

const CompleteDataScreen = (props: ICompleteDataScreen) => {
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
        marginLeft: '8px',
        fontSize: '11px',
        marginTop: '2px',
    }

    const { navigation, route } = props
    const { 
        data, 
        group, 
        trip,
        checkoutData, 
        transaction,
    } = route?.params

    const [specialRequests, setSpecialRequests] = useState([...data?.special_requests?.map((data: any) => {
        return {
            ...data,
            amount: data?.amount??0,
        }
    })])

    const [pelancong, setPelancong] = useState<any>(
        typeof(checkoutData?.totalPelancong) === 'number'
            ?   [...Array(checkoutData?.totalPelancong)?.map(() => {
                    return {}
                })]
            :   [...checkoutData?.totalPelancong]
    )

    const updateTripTransaction = useMutation(updateTransactionTripApi, {
        onSuccess: (resp: any) => {
            if (resp?.data?.order?.participants?.length !== 0) {
                let tempPelancong = [...Array(resp?.data?.order?.pax)]?.map(() => {})
                resp?.data?.order?.participants?.map((data: any, index: number) => tempPelancong[index] = data)
                setPelancong(() => {
                    return [...tempPelancong]
                })
            }

            if (resp?.data?.order?.participants?.length !== 0) {
                setSpecialRequests((prev: any) => {
                    return [...resp?.data?.order?.special_requests]
                })
            }
        }
    })

    function onSelectPelancong(index: number, data: any) {
        const tempPelancong = pelancong
        tempPelancong[index] = data
        setPelancong(() => {
            return [...tempPelancong]
        })
        navigation?.goBack()
    }

    function calculateTotalPrice() {
        let price: any
        if (typeof(checkoutData.totalPelancong) === 'number') {
            price = data?.price * checkoutData?.totalPelancong
        } else {
            price = data?.price * checkoutData?.totalPelancong?.length
        }

        const totalPriceSpecialRequest = specialRequests
            ?.filter((x: any) => x?.amount != 0)
            ?.reduce((accumulator, { price, amount }) => {
                return accumulator + (amount * price)
            }, 0)

        return Number(price + totalPriceSpecialRequest)?.toLocaleString('id')
    }

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
                <Text fontFamily='Poppins-SemiBold' fontSize='20px'>Lengkapi Data</Text>
            </Stack>

            <Stack padding='24px' space='24px'>
                <Stack 
                    direction='row' 
                    padding='10px' 
                    shadow='3' 
                    backgroundColor='white'
                    borderRadius='8px'
                    alignItems='center'
                    space='10px'
                >
                    <Image 
                        source={{uri: trip?.images[0]?.url}} 
                        alt={trip?.images[0]?.url} 
                        height='100px'
                        width='100px' 
                        borderRadius='8px'
                    />
                    <Stack>
                        <Stack direction='row'>
                            <Text fontFamily='Poppins-Light' fontSize='11px'>Berkumpul di </Text>
                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{data?.meeting_point?.text}</Text>
                        </Stack>
                        <Stack direction='row'>
                            <Text fontFamily='Poppins-Light' fontSize='11px'>Total pelancong: </Text>
                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{typeof(checkoutData?.totalPelancong) === 'number' ? checkoutData?.totalPelancong : checkoutData?.totalPelancong?.length} orang</Text>
                        </Stack>
                        <Stack direction='row'>
                            <Text fontFamily='Poppins-Light' fontSize='11px'>Waktu melancong: </Text>
                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{checkoutData?.textSelectedDate}</Text>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack space='10px'>
                    <Text fontFamily='Poppins-Medium' fontSize='13px'>Daftar Pelancong</Text>
                    <Stack space='5px'>
                        {pelancong?.map((p: any, index: number) => {
                            return (
                                <Pressable 
                                    key={index}
                                    {...baseStylePressedComponent}  
                                    borderRadius='8px'
                                    onPress={() => navigation?.push(ROUTE_NAME.TRIP_NAVIGATOR_PELANCONG_DATA, {
                                        pelancong,
                                        setPelancong,
                                        index,
                                        onSelectPelancong,
                                        updateTripTransaction,
                                        specialRequests,
                                        transactionId: transaction?.id,
                                    })}
                                >
                                    <Icon 
                                        as={MaterialCommunityIcons} 
                                        name='face-man-profile' 
                                        color='gray.400' 
                                        size='lg' 
                                    />
                                    <Text {...baseStylePressedTextComponent}>
                                        {
                                            p?.id
                                                ?   p?.name
                                                :   `Pelancong ${index + 1}`
                                        }
                                    </Text>
                                    <Icon 
                                        as={MaterialCommunityIcons} 
                                        name='chevron-right' 
                                        color='gray.400' 
                                        size='lg' 
                                        marginLeft='auto'
                                    />
                                </Pressable>
                            )
                        })}
                    </Stack>
                </Stack>

                <Stack space='5px'>
                    <Pressable
                        {...baseStylePressedComponent}  
                        borderRadius='8px'
                        onPress={() => {
                            navigation.push(
                                ROUTE_NAME.TRIP_NAVIGATOR_SPECIAL_REQUEST, 
                                { 
                                    id: transaction?.id,
                                    specialRequests: specialRequests, 
                                    setSpecialRequests: setSpecialRequests, 
                                    participants: pelancong?.filter((x: any) => x?.id)?.map((x: any) => x?.id),
                                    updateTripTransaction,
                                },
                            )
                        }}
                    >
                        <Icon 
                            as={MaterialIcons} 
                            name='folder-special' 
                            color='gray.400' 
                            size='lg' 
                        />
                        <Text {...baseStylePressedTextComponent}>
                            Permintaan Khusus
                        </Text>
                        <Icon 
                            as={MaterialCommunityIcons} 
                            name='chevron-right' 
                            color='gray.400' 
                            size='lg' 
                            marginLeft='auto'
                        />
                    </Pressable>
                    {
                        specialRequests?.find((x: any) => x?.amount) !== undefined &&
                        <Stack direction='row'>
                            {/* sr price from updateTripTransaction?.data?.order?.sr_price */}
                            <Text fontSize='11px' fontFamily='Poppins-Regular'>Total permintaan khusus: </Text>
                            <Text fontSize='11px' fontFamily='Poppins-Medium'>Rp. {' '}
                                {
                                    Number(
                                        specialRequests
                                        ?.filter((x: any) => x?.amount != 0)
                                        ?.reduce((accumulator, { price, amount }) => {
                                            return accumulator + (amount * price)
                                          }, 0)
                                    )?.toLocaleString('id')
                                }
                            </Text>
                        </Stack>
                    }
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
                        fontFamily='Poppins-Medium' 
                        fontSize='13px'
                    >Rp. {calculateTotalPrice()}
                    </Text>
                </Stack>
                <Button 
                    width='150px'
                    onPress={() => navigation.push(ROUTE_NAME.TRIP_NAVIGATOR_PAYMENT_TYPE, {
                        data: data,
                        group: group,
                        trip: trip,
                        pelancong,
                        checkoutData,
                        specialRequests,
                        transaction,
                    })}
                >
                    Konfirmasi
                </Button>
            </Stack>
        </Flex>
    )
}

export default CompleteDataScreen