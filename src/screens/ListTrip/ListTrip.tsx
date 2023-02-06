import React, { useEffect, useMemo } from 'react'
import * as Unicons from "react-native-unicons"
import { Button, Center, FlatList, Flex, HStack, Icon, Image, Input, Pressable, Skeleton, Text, VStack } from 'native-base'
import { dummyTrips } from './dummy'
import { useQuery } from 'react-query'
import { getTripListApi } from '../../apis/trip'
import { format } from 'date-fns'

interface IListTrip {
    route: any
    navigation: any
}

interface IButtonDestination {
    label: string
    selected: string
}

interface ITripCard {
    data: any
    navigation: any
}

const ButtonDestination = (props: IButtonDestination) => {
    const { label, selected } = props

    return (
        <Button 
            flex={1} 
            colorScheme={selected === label ? 'success' : 'white' }
            variant={selected === label ? 'solid' : 'outline' }
        >
            <Text color={selected === label ? 'white' : 'gray.400' }>{label}</Text>
        </Button>
    )
}

const TripCard = (props: ITripCard) => {
    const { navigation, data } = props

    return (
        <Flex flex={1} padding='5px'>
            <VStack rounded='lg' borderWidth='1px' borderColor='gray.200'>
                <Pressable 
                    onPress={() => navigation.push('detail-trip', { 
                        data: data
                        // id: data?._id, 
                        // title: data?.name, 
                        // refundable: true, 
                        // meetingPoint: data?.meeting_point?.text, 
                        // facilities: data?.facilities, 
                        // location: data?.location?.text, 
                        // time: format(new Date(data?.trip_start), 'dd MMM') + ' ' + format(new Date(data?.trip_end), 'dd MMM'), 
                        // price: 1000000, 
                        // duration: data?.trip_duration_days + 'D' + data?.trip_duration_night + 'N', 
                        // image: data?.images[0]?.url, 
                    })}
                >
                    <Image rounded='lg' source={{uri: data?.images[0]?.url}} alt={data?.images[0]?.url} height='100px' />
                </Pressable>
                <VStack padding='5px'>
                    <Text fontSize='11px' fontWeight='bold'>{data?.name}</Text>
                    <HStack alignItems='center'>
                        {/* {
                            refundable
                                ?   <Icon as={Unicons.Check} color='green.400' />
                                :   <Icon as={Unicons.Times} color='red.400' />
                        }
                        <Text fontSize='11px' color={refundable ? 'green.400' : 'red.400'}>Refundable</Text> */}
                        <Icon as={Unicons.Check} color='green.400' />
                        <Text fontSize='11px' color={'green.400'}>Refundable</Text>
                    </HStack>
                </VStack>
                <Flex height='1px' borderTopWidth='0.2px' borderColor='gray.200' />
                <HStack padding='5px' alignItems='center' space='5px'>
                    <Icon as={Unicons.MapPinAlt} />
                    <VStack>
                        <Text fontSize='11px' fontWeight='semibold'>Meeting Point</Text>
                        <Text fontSize='11px'>{data?.meeting_point?.text}</Text>
                    </VStack>
                </HStack>
                <VStack padding='5px'>
                    <HStack space='5px' alignItems='center'>
                        <Icon as={Unicons.ExclamationOctagon} />
                        <Text fontSize='11px' fontWeight='semibold'>Facilities</Text>
                    </HStack>
                    <HStack marginTop='5px' margin='auto' space='5px'>
                        {data?.facilities?.find((x: any) => x?.facility_type === 'Tenda') &&
                            <VStack alignItems='center'>
                                <Icon as={Unicons.HouseUser} color='blue.400' />
                                <Text fontSize='11px' color='blue.400'>Tent</Text>
                            </VStack>
                        }
                        {/* <VStack alignItems='center'>
                            <Icon as={Unicons.Utensils} color='yellow.400' />
                            <Text fontSize='11px' color='yellow.400'>Lunch</Text>
                        </VStack>
                        <VStack alignItems='center'>
                            <Icon as={Unicons.ParkingCircle} color='info.400' />
                            <Text fontSize='11px' color='info.400'>Parking Area</Text>
                        </VStack> */}
                    </HStack>
                </VStack>
                <HStack padding='5px' alignItems='center' space='5px'>
                    <Icon as={Unicons.LocationPoint} />
                    <Text fontSize='11px'>{data?.location?.text}</Text>
                </HStack>
                <HStack padding='5px' alignItems='center' space='5px'>
                    <Icon as={Unicons.Schedule} />
                    <Text fontSize='11px'>{format(new Date(data?.trip_start), 'dd MMM')} - {format(new Date(data?.trip_end), 'dd MMM')}</Text>
                </HStack>
                <HStack padding='5px' alignItems='center' space='5px'>
                    <Icon as={Unicons.Hourglass} />
                    <Text fontSize='11px'>{data?.trip_duration_days}D{data?.trip_duration_night}N</Text>
                </HStack>
                <HStack padding='5px' justifyContent='space-between'>
                    <Text fontSize='11px' fontWeight='semibold'>Starting from</Text>
                    <Text fontSize='11px' fontWeight='semibold' color='orange.400'>IDR. {Number(1000000).toLocaleString()}</Text>
                </HStack>
                <Pressable flexDirection='row' padding='5px' justifyContent='space-between' marginTop='10px'>
                    <Text fontSize='11px' fontWeight='semibold' color='green.400'>Show Package</Text>
                    <Icon as={Unicons.AngleUp} color='green.400' />
                </Pressable>
            </VStack>
        </Flex>
    )
}

const TripCardSkeleton = () => {
    return (
        <Flex flex={1} padding='5px'>
            <VStack rounded='lg' borderWidth='1px' borderColor='gray.200'>
                <Pressable>
                    <Skeleton height='100px' />
                </Pressable>
                <VStack padding='5px' space='5px'>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </VStack>
            </VStack>
        </Flex>
    )
}

const ListTrip = (props: IListTrip) => {
    const destinations = useMemo(() => ['Hiking', 'Diving', 'City Tour'], [])
    const { route, navigation } = props
    const { type, destination, dateStart, dateEnd, participant } = route.params

    const tripList = useQuery('get-trip-list', () => getTripListApi({
        type, 
        destination, 
        start_date: new Date(dateStart).getTime(), 
        end_date: new Date(dateEnd).getTime(), 
        participant,
    }))
    
    useEffect(() => {
        console.log({ type, destination, dateStart, dateEnd, participant })
    }, [])

    return (
        <Flex backgroundColor='white' flex={1}>
            <Center height='50px' width='100%' backgroundColor='#038103'>
                <Text fontSize='16px' color='white' fontWeight='semibold'>{destination}</Text>
                <Pressable position='absolute' left='10px' onPress={() => navigation.goBack()}>
                    <Icon as={Unicons.ArrowLeft} color='white' />
                </Pressable>
            </Center>
            <VStack padding='10px' space='10px'>
                <Input 
                    leftElement={<Icon as={Unicons.Search} color='gray.400' marginLeft='10px' />} 
                    variant='outline' 
                    placeholder='Cari tipe trip harapan kamu'
                />
                <HStack space='10px'>
                    <Button variant='outline'>
                        <Icon as={Unicons.Filter} color='gray.400' />
                    </Button>
                    {destinations?.map((d: any, index: any) => {
                        return <ButtonDestination key={index} label={d} selected={type} />
                    })}
                </HStack>
            </VStack>
            {/* {!tripList?.isFetching &&
                <FlatList
                    data={[...Array(4)]}
                    padding='5px'
                    numColumns={2}
                    marginBottom='10px'
                    renderItem={() => {
                        return (
                            <TripCardSkeleton />
                        )
                    }}
                />
            } */}
            {tripList?.data &&
                <FlatList
                    keyExtractor={(trip: any) => trip._id}
                    data={tripList?.data}
                    padding='5px'
                    numColumns={2}
                    marginBottom='10px'
                    renderItem={({ item }) => {
                        console.log({item})
                        return (
                            <>
                                <TripCard data={item} navigation={navigation} />
                                <TripCard data={item} navigation={navigation} />
                            </>
                        )
                    }}
                />
            }
        </Flex>
    )
}

export default ListTrip