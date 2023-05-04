import React, { memo } from 'react'
import { format } from 'date-fns'
import { 
    IC_AIRLINE_SEAT_RECLINE, 
    IC_CALENDAR_MONTH, 
    IC_LOCATION_ON, 
} from '../../../../assets'
import { 
    Icon, 
    Image, 
    Pressable, 
    Stack, 
    Text 
} from 'native-base'

interface IPackageTripCard {
    trip: any
    data: any
    group: any
    onPress: any
}

const PackageTripCard = (props: IPackageTripCard) => {
    const { 
        data, 
        onPress,
        group,
    } = props

    return (
        <Pressable onPress={onPress}>
            <Stack 
                direction='row' 
                borderWidth='1px'
                borderColor='gray.300'
                width='100%' 
                backgroundColor='white'
                rounded='md'
                padding='10px'
                justifyContent='space-between'
            >
                <Stack justifyContent='space-between'>
                    <Stack marginBottom='10px'>
                        <Stack alignItems='center' direction='row'>
                            <Text fontFamily='Poppins-Regular' fontSize='12px'>Paket </Text>
                            <Text fontFamily='Poppins-SemiBold' fontSize='12px'>{data?.duration?.day}D{data?.duration?.night}N</Text>
                        </Stack>
                        <Stack direction='row'>
                            <Text 
                                color='gray.400' 
                                fontFamily='Poppins-Regular' 
                                fontSize='10px'
                            >(</Text>
                            <Text 
                                color='gray.400' 
                                fontFamily='Poppins-Medium' 
                                fontSize='10px'
                            >{data?.duration?.day}</Text>
                            <Text 
                                color='gray.400' 
                                fontFamily='Poppins-Regular' 
                                fontSize='10px'
                            > hari</Text>
                            <Text 
                                color='gray.400' 
                                fontFamily='Poppins-Medium' 
                                fontSize='10px'
                            > {data?.duration?.night}</Text>
                            <Text 
                                color='gray.400' 
                                fontFamily='Poppins-Regular' 
                                fontSize='10px'
                            > malam{')'}</Text>
                        </Stack>
                    </Stack>
                    <Text 
                        marginTop='auto' 
                        fontFamily='Poppins-SemiBold' 
                        fontSize='14px'
                        color='orange.400'
                    >Rp. {data?.price?.toLocaleString('id')}</Text>
                </Stack>
                <Stack justifyContent='center' space='5px'>
                    {/* public */}
                    {group === 'public' &&
                        <>
                            <Stack direction='row' alignItems='center'>
                                <Image
                                    alt='IC_AIRLINE_SEAT_RECLINE'
                                    source={IC_AIRLINE_SEAT_RECLINE}
                                    width='18px'
                                    height='18px'
                                    tintColor='lancPrimaryLight'
                                />
                                <Text 
                                    fontFamily='Poppins-SemiBold' 
                                    fontSize='10px' 
                                    color='gray.400'
                                > {data?.quota - data?.current_participant}</Text>
                                <Text 
                                    fontFamily='Poppins-Regular' 
                                    fontSize='10px' 
                                    color='gray.400'
                                > kuota lagi</Text>
                            </Stack>
                            <Stack direction='row' alignItems='center'>
                                <Image
                                    alt='IC_CALENDAR_MONTH'
                                    source={IC_CALENDAR_MONTH}
                                    width='18px'
                                    height='18px'
                                    tintColor='lancPrimaryLight'
                                />
                                <Text 
                                    fontFamily='Poppins-Regular' 
                                    fontSize='10px' 
                                    color='gray.400'
                                > {format(new Date(data?.trip_start), 'dd MMM')} - {format(new Date(data?.trip_end), 'dd MMM')}</Text>
                            </Stack>
                        </>
                    }

                    {/* private */}
                    {group === 'private' &&
                        <>
                            <Stack direction='row' alignItems='center'>
                                <Image
                                    alt='IC_CALENDAR_MONTH'
                                    source={IC_CALENDAR_MONTH}
                                    width='18px'
                                    height='18px'
                                    tintColor='lancPrimaryLight'
                                />
                                <Text 
                                    fontFamily='Poppins-Regular' 
                                    fontSize='10px' 
                                    color='gray.400'
                                > {format(new Date(data?.availability?.open), 'dd MMM')} - {format(new Date(data?.availability?.close), 'dd MMM')}</Text>
                            </Stack>
                            <Stack direction='row' alignItems='center'>
                                <Image
                                    alt='IC_AIRLINE_SEAT_RECLINE'
                                    source={IC_AIRLINE_SEAT_RECLINE}
                                    width='18px'
                                    height='18px'
                                    tintColor='lancPrimaryLight'
                                />
                                <Text 
                                    fontFamily='Poppins-Medium' 
                                    fontSize='10px' 
                                    color='gray.400'
                                > {data?.person?.min}</Text>
                                <Text 
                                    fontFamily='Poppins-Regular' 
                                    fontSize='10px' 
                                    color='gray.400'
                                > sampai</Text>
                                <Text 
                                    fontFamily='Poppins-Medium' 
                                    fontSize='10px' 
                                    color='gray.400'
                                > {data?.person?.max}</Text>
                                <Text 
                                    fontFamily='Poppins-Regular' 
                                    fontSize='10px' 
                                    color='gray.400'
                                > orang</Text>
                            </Stack>
                        </>
                    }

                    <Stack direction='row' alignItems='center'>
                        <Image
                            alt='IC_LOCATION_ON'
                            source={IC_LOCATION_ON}
                            width='18px'
                            height='18px'
                            tintColor='lancPrimaryLight'
                        />
                        <Text 
                            fontFamily='Poppins-Regular' 
                            fontSize='10px' 
                            color='gray.400'
                        > titik bertemu di</Text>
                        <Text 
                            fontFamily='Poppins-SemiBold' 
                            fontSize='10px' 
                            color='gray.400'
                        > {data?.meeting_point?.text}</Text>
                    </Stack>
                </Stack>
            </Stack>
        </Pressable>
    )
}

export default memo(PackageTripCard)