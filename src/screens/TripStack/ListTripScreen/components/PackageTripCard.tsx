import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { format } from 'date-fns'
import { 
    Icon, 
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
                            <Text fontFamily='Poppins-Light' fontSize='13px'>Paket </Text>
                            <Text fontFamily='Poppins-Medium' fontSize='13px'>{data?.duration?.day}D{data?.duration?.night}N</Text>
                        </Stack>
                        <Stack direction='row'>
                            <Text 
                                color='gray.500' 
                                fontFamily='Poppins-Light' 
                                fontSize='11px'
                            >(</Text>
                            <Text 
                                color='gray.500' 
                                fontFamily='Poppins-Medium' 
                                fontSize='11px'
                            >{data?.duration?.day}</Text>
                            <Text 
                                color='gray.500' 
                                fontFamily='Poppins-Light' 
                                fontSize='11px'
                            > hari</Text>
                            <Text 
                                color='gray.500' 
                                fontFamily='Poppins-Medium' 
                                fontSize='11px'
                            > {data?.duration?.night}</Text>
                            <Text 
                                color='gray.500' 
                                fontFamily='Poppins-Light' 
                                fontSize='11px'
                            > malam{')'}</Text>
                        </Stack>
                    </Stack>
                    <Text 
                        marginTop='auto' 
                        fontFamily='Poppins-SemiBold' 
                        fontSize='15px'
                    >Rp. {data?.price?.toLocaleString('id')}</Text>
                </Stack>
                <Stack justifyContent='center' space='5px'>
                    {/* public */}
                    {group === 'public' &&
                        <>
                            <Stack direction='row' alignItems='center'>
                                <Icon 
                                    as={MaterialIcons} 
                                    name='airline-seat-recline-normal' 
                                    color='xprimary.50' 
                                    size='sm' 
                                />
                                <Text fontFamily='Poppins-Medium' fontSize='11px' color='gray.500'> {data?.quota - data?.current_participant}</Text>
                                <Text fontFamily='Poppins-Light' fontSize='11px' color='gray.500'> kuota lagi</Text>
                            </Stack>
                            <Stack direction='row' alignItems='center'>
                                <Icon 
                                    as={Ionicons} 
                                    name='calendar' 
                                    color='xprimary.50' 
                                    size='sm' 
                                />
                                <Text fontFamily='Poppins-Light' fontSize='11px' color='gray.500'> {format(new Date(data?.trip_start), 'dd MMM')} - {format(new Date(data?.trip_end), 'dd MMM')}</Text>
                            </Stack>
                        </>
                    }

                    {/* private */}
                    {group === 'private' &&
                        <>
                            <Stack direction='row' alignItems='center'>
                                <Icon 
                                    as={Ionicons} 
                                    name='calendar' 
                                    color='xprimary.50' 
                                    size='sm' 
                                />
                                <Text fontFamily='Poppins-Light' fontSize='11px' color='gray.500'> {format(new Date(data?.availability?.open), 'dd MMM')} - {format(new Date(data?.availability?.close), 'dd MMM')}</Text>
                            </Stack>
                            <Stack direction='row' alignItems='center'>
                                <Icon 
                                    as={MaterialIcons} 
                                    name='reduce-capacity' 
                                    color='xprimary.50' 
                                    size='sm' 
                                />
                                <Text fontFamily='Poppins-Medium' fontSize='11px' color='gray.500'> {data?.person?.min}</Text>
                                <Text fontFamily='Poppins-Light' fontSize='11px' color='gray.500'> sampai</Text>
                                <Text fontFamily='Poppins-Medium' fontSize='11px' color='gray.500'> {data?.person?.max}</Text>
                                <Text fontFamily='Poppins-Light' fontSize='11px' color='gray.500'> orang</Text>
                            </Stack>
                            {/* <Stack direction='row' alignItems='center'>
                                <Icon 
                                    as={MaterialIcons} 
                                    name='local-police' 
                                    color='xprimary.50' 
                                    size='sm' 
                                />
                                <Text fontFamily='Poppins-Medium' fontSize='11px' color='gray.500'> {data?.team_on_duty}</Text>
                                <Text fontFamily='Poppins-Light' fontSize='11px' color='gray.500'> petugas</Text>
                            </Stack> */}
                        </>
                    }

                    <Stack direction='row' alignItems='center'>
                        <Icon 
                            as={MaterialIcons} 
                            name='location-on' 
                            color='xprimary.50' 
                            size='sm' 
                        />
                        <Text fontFamily='Poppins-Light' fontSize='11px' color='gray.500'> titik bertemu di</Text>
                        <Text fontFamily='Poppins-Medium' fontSize='11px' color='gray.500'> {data?.meeting_point?.text}</Text>
                    </Stack>
                </Stack>
            </Stack>
        </Pressable>
    )
}

export default PackageTripCard