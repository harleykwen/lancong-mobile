import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { IC_ARROW_BACK } from '../../../assets'
import { ROUTE_NAME } from '../../../router'
import { getTransactionDetailApi } from '../../../apis/transaction'
import { updateTransactionTripApi } from '../../../apis/trip'
import { RefreshControl } from 'react-native-gesture-handler'
import { 
    useMutation, 
    useQuery, 
    useQueryClient, 
} from 'react-query'
import { 
    Button,
    Flex, 
    Icon, 
    Image, 
    Pressable, 
    ScrollView, 
    Skeleton, 
    Stack, 
    Text,
} from 'native-base'

interface ICompleteDataScreen {
    navigation: any
    route: any
}

const CompleteDataScreen = (props: ICompleteDataScreen) => {
    const queryClient = useQueryClient()

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
    const { transactionId } = route?.params

    const [specialRequests, setSpecialRequests] = useState<any[]>([])

    const [pelancong, setPelancong] = useState<any[]>([])

    const updateTripTransaction = useMutation(updateTransactionTripApi, {
        onSuccess: () => {
            queryClient?.invalidateQueries(`transaction-detail-${transactionId}`)
        }
    })

    const transactionDetail = useQuery(
        `transaction-detail-${transactionId}`,
        () => getTransactionDetailApi({ id: transactionId }),
        {
            onSuccess: (resp: any) => {
                console.log({ resp })
                if (resp?.data?.order?.participants?.length === 0) {
                    setPelancong(() => {
                        return [...Array(resp?.data?.order?.pax)]?.map(() => {})
                    })
                } else {
                    const pelancongLeft = resp?.data?.order?.pax - resp?.data?.order?.participants?.length
                    const pelancongLeftArray = [...Array(pelancongLeft)]?.map(() => {})
                    setPelancong(() => {
                        return [...resp?.data?.order?.participants, ...pelancongLeftArray]
                    })
                }

                if (resp?.data?.order?.special_requests?.length === 0) {
                    setSpecialRequests(() => {
                        return resp?.data?.order[resp?.data?.order?.group]?.special_requests?.map((data: any) => {
                            return {
                                ...data,
                                amount: 0,
                            }
                        })
                    })
                } else {
                    setSpecialRequests(() => {
                        return [...resp?.data?.order?.special_requests]
                    })
                }
            }
        }
    )

    function onSelectPelancong() {
        queryClient?.invalidateQueries(`transaction-detail-${transactionId}`)
        navigation?.goBack()
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

            <ScrollView
                refreshControl={
                    <RefreshControl 
                        refreshing={transactionDetail?.isFetching} 
                        onRefresh={() => {
                            transactionDetail?.remove()
                            transactionDetail?.refetch()
                        }} 
                    />
                }
            >
                <Stack padding='24px' space='24px'>
                    {
                        transactionDetail?.isFetching
                            ?   <Stack 
                                    direction='row' 
                                    padding='10px' 
                                    shadow='3' 
                                    backgroundColor='white'
                                    borderRadius='8px'
                                    alignItems='center'
                                    space='10px'
                                >
                                    <Skeleton 
                                        height='100px' 
                                        width='100px' 
                                        borderRadius='8px' 
                                    />
                                    <Stack space='4px'>
                                        <Skeleton height='15px' width='150px' />
                                        <Skeleton height='15px' width='100px' />
                                        <Skeleton height='15px' width='125px' />
                                    </Stack>
                                </Stack>
                            :   <Stack 
                                    direction='row' 
                                    padding='10px' 
                                    shadow='3' 
                                    backgroundColor='white'
                                    borderRadius='8px'
                                    alignItems='center'
                                    space='10px'
                                >
                                    <Image 
                                        source={{uri: transactionDetail?.data?.data?.order?.trip?.images[0]?.url}} 
                                        alt={transactionDetail?.data?.data?.order?.trip?.images[0]?.url} 
                                        height='100px'
                                        width='100px' 
                                        borderRadius='8px'
                                    />
                                    <Stack>
                                        <Stack direction='row'>
                                            <Text fontFamily='Poppins-Light' fontSize='11px'>Berkumpul di </Text>
                                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{transactionDetail?.data?.data?.order[transactionDetail?.data?.data?.order?.group]?.meeting_point?.text}</Text>
                                        </Stack>
                                        <Stack direction='row'>
                                            <Text fontFamily='Poppins-Light' fontSize='11px'>Total pelancong: </Text>
                                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{transactionDetail?.data?.data?.order?.pax} orang</Text>
                                        </Stack>
                                        {/* <Stack direction='row'>
                                            <Text fontFamily='Poppins-Light' fontSize='11px'>Waktu melancong: </Text>
                                            <Text fontFamily='Poppins-Medium' fontSize='11px'>{checkoutData?.textSelectedDate}</Text>
                                        </Stack> */}
                                    </Stack>
                                </Stack>
                    }

                    <Stack space='10px'>
                        <Text fontFamily='Poppins-Medium' fontSize='13px'>Daftar Pelancong</Text>
                        <Stack space='5px'>
                            {
                                transactionDetail?.isFetching
                                    ?   <>
                                            <Skeleton 
                                                height='50px'
                                                width='100%'
                                                borderRadius='8px' 
                                            />
                                            <Skeleton 
                                                height='50px'
                                                width='100%'
                                                borderRadius='8px' 
                                            />
                                            <Skeleton 
                                                height='50px'
                                                width='100%'
                                                borderRadius='8px' 
                                            />
                                        </>
                                    :   pelancong?.map((p: any, index: number) => {
                                            return (
                                                <Pressable 
                                                    key={index}
                                                    {...baseStylePressedComponent}  
                                                    borderRadius='8px'
                                                    onPress={() => navigation?.push(ROUTE_NAME.TRIP_NAVIGATOR_PELANCONG_DATA, {
                                                        pelancong,
                                                        index,
                                                        onSelectPelancong,
                                                        updateTripTransaction,
                                                        specialRequests,
                                                        transactionId: transactionId,
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
                                        })
                            }
                        </Stack>
                    </Stack>

                    <Stack space='5px'>
                        {
                            transactionDetail?.isFetching
                                ?   <Skeleton 
                                        height='50px'
                                        width='100%'
                                        borderRadius='8px' 
                                    />
                                :   <Pressable
                                        {...baseStylePressedComponent}  
                                        borderRadius='8px'
                                        onPress={() => {
                                            navigation.push(
                                                ROUTE_NAME.TRIP_NAVIGATOR_SPECIAL_REQUEST, 
                                                { 
                                                    id: transactionId,
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
                        }

                        {
                            transactionDetail?.isFetching
                                ?   <Skeleton height='15px' width='200px' />
                                :   transactionDetail?.data?.data?.order?.sr_price !== 0 &&
                                    <Stack direction='row'>
                                        {/* sr price from updateTripTransaction?.data?.order?.sr_price */}
                                        <Text fontSize='11px' fontFamily='Poppins-Regular'>Total permintaan khusus: </Text>
                                        <Text fontSize='11px' fontFamily='Poppins-Medium'>Rp. {transactionDetail?.data?.data?.order?.sr_price?.toLocaleString('id')}{}</Text>
                                    </Stack>
                        }
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
                    {
                        transactionDetail?.isFetching
                            ?   <Skeleton height='20px' width='100px' />
                            :   <Text 
                                    color='lancPrimaryLight' 
                                    fontFamily='Poppins-Medium' 
                                    fontSize='13px'
                                >Rp. {transactionDetail?.data?.data?.order?.total_price?.toLocaleString('id')}</Text>
                    }
                </Stack>
                <Button 
                    isDisabled={transactionDetail?.isFetching || transactionDetail?.data?.data?.order?.participants?.length !== transactionDetail?.data?.data?.order?.pax}
                    width='150px'
                    onPress={() => navigation.push(ROUTE_NAME.TRIP_NAVIGATOR_PAYMENT_TYPE, {
                        transaction: transactionDetail?.data?.data,
                    })}
                >
                    Konfirmasi
                </Button>
            </Stack>
        </Flex>
    )
}

export default CompleteDataScreen