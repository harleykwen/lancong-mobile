import React, { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { IC_ARROW_BACK } from '../../../assets'
import { useMutation } from 'react-query'
import { tripCreateTransactionApi } from '../../../apis/trip'
import { ROUTE_NAME } from '../../../router'
import { add, format } from 'date-fns'
import { 
    Button, 
    Flex, 
    Icon, 
    Image, 
    Pressable, 
    Stack, 
    Text, 
} from 'native-base'

interface ICheckoutPackageScreen {
    navigation: any
    route: any
}

const CheckoutPackageScreen = (props: ICheckoutPackageScreen) => {
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
        fontSize: '13px',
        marginTop: '2px',
    }

    const { navigation, route } = props
    const { data, group, trip } = route?.params

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [totalPelancong, setTotalPelancong] = useState(group === 'public' ? 1 : data?.person?.min)
    const [startDate, setStartDate] = useState<any>(null)
    const [endDate, setEndDate] = useState<any>(null)
    const [textSelectedDate, setTextSelectedDate] = useState('')

    const createTransaction = useMutation(tripCreateTransactionApi, {
        onSuccess: (resp: any) => {
            navigation.push(ROUTE_NAME.TRIP_NAVIGATOR_COMPLETE_DATA, { 
                data: data,
                group: group,
                trip: trip,
                checkoutData: {
                    totalPelancong,
                    startDate,
                    endDate,
                    textSelectedDate,
                },
                transaction: resp,
            })
        }
    })

    function handleTotalPelancong(type: 'plus' | 'min') {
        setTotalPelancong((prev: any) => {
            return type === 'plus' ? prev + 1 : prev - 1
        })
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
                <Text fontFamily='Poppins-SemiBold' fontSize='20px'>{`${trip?.name} - ${data?.duration?.day}D${data?.duration?.night}N`}</Text>
            </Stack>

            <Stack padding='10px' space='10px'>
                <Pressable 
                    {...baseStylePressedComponent}  
                    borderRadius='8px'
                    onPress={() => setShowDatePicker(true)}
                >
                    <Icon 
                        as={MaterialCommunityIcons} 
                        name='calendar-range' 
                        color='gray.400' 
                        size='lg' 
                    />
                    <Text {...baseStylePressedTextComponent}>
                        {textSelectedDate !== '' ? textSelectedDate : 'Pilih tanggal mulai ngelancong'}
                    </Text>
                </Pressable>

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
                        {group === 'public'
                            ?   <Stack direction='row'>
                                    <Text fontFamily='Poppins-Light' fontSize='11px'>Sisa kuota: </Text>
                                    <Text fontFamily='Poppins-Medium' fontSize='11px'>{data?.quota - data?.current_participant} orang</Text>
                                </Stack>
                            :   <Stack direction='row'>
                                    <Text fontFamily='Poppins-Light' fontSize='11px'>Batas penumpang: </Text>
                                    <Text fontFamily='Poppins-Medium' fontSize='11px'>{data?.person?.min} - {data?.person?.max} orang</Text>
                                </Stack>
                        }
                    </Stack>
                </Stack>

                <Stack direction='row' justifyContent='space-between' alignItems='center' marginTop='24px'>
                    <Text fontFamily='Poppins-Medium' fontSize='13px'>Jumlah pelancong</Text>
                    <Stack 
                        direction='row' 
                        space='24px' 
                        alignItems='center'
                        marginLeft='auto'
                    >
                        <Pressable 
                            onPress={() => handleTotalPelancong('min')}
                            isDisabled={group === 'public'
                                ?   totalPelancong === 0
                                :   totalPelancong === data?.person?.min
                            }
                        >
                            <Icon 
                                as={SimpleLineIcons} 
                                name='minus' 
                                size='xl' 
                                color={group === 'public'
                                    ?   totalPelancong === 1
                                        ?   'gray.400'
                                        :   'lancPrimaryLight'
                                    :   totalPelancong === data?.person?.min
                                        ?   'gray.400'
                                        :   'lancPrimaryLight'
                                }

                            />
                        </Pressable>
                        <Text 
                            fontFamily='Poppins-Bold' 
                            fontSize='16px'
                            width='25px'
                            textAlign='center'
                        >{totalPelancong}</Text>
                        <Pressable 
                            onPress={() => handleTotalPelancong('plus')}
                            isDisabled={group === 'public'
                                ?   totalPelancong === data?.quota - data?.current_participant
                                :   totalPelancong === data?.person?.max
                            }
                        >
                            <Icon 
                                as={SimpleLineIcons} 
                                name='plus' 
                                size='xl' 
                                color={group === 'public'
                                    ?   totalPelancong === data?.quota - data?.current_participant
                                        ?   'gray.400'
                                        :   'lancPrimaryLight'
                                    :   totalPelancong === data?.person?.max
                                        ?   'gray.400'
                                        :   'lancPrimaryLight'
                                }
                            />
                        </Pressable>
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
                        fontFamily='Poppins-Medium' 
                        fontSize='13px'
                    >Rp. {(data?.price * totalPelancong)?.toLocaleString('id')}</Text>
                </Stack>
                <Button
                    width='125px' 
                    onPress={() => {
                        createTransaction?.mutate({
                            trip_id: trip?.id,
                            package_id: data?.id,
                            group,
                            pax: totalPelancong,
                            trip_start: new Date(startDate)?.getTime(),
                        })
                    }}
                >
                    Lanjutkan
                </Button>
            </Stack>

            <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                onConfirm={(e: any) => {
                    setStartDate(e)
                    setEndDate(add(new Date(e), { days: data?.duration?.day }))
                    setTextSelectedDate(`${format(new Date(e), 'dd MMM')} - ${format(new Date(add(new Date(e), { days: data?.duration?.day - 1 })), 'dd MMM')}`)
                    setShowDatePicker(false)
                }}
                onCancel={() => setShowDatePicker(false)}
                minimumDate={group === 'public'
                    ?   new Date(data?.trip_start)
                    :   new Date(data?.availability?.open)
                }
                maximumDate={group === 'public'
                    ?   new Date(data?.trip_end)
                    :   new Date(data?.availability?.close)
                }
            />
        </Flex>
    )
}

export default CheckoutPackageScreen