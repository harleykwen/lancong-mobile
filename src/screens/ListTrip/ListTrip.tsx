import React, { useMemo } from 'react'
import * as Unicons from "react-native-unicons"
import { Button, Center, FlatList, Flex, HStack, Icon, Image, Input, Pressable, Text, VStack } from 'native-base'
import { dummyTrips } from './dummy'

interface IListTrip {
    route: any
    navigation: any
}

interface IButtonDestination {
    label: string
    selected: string
}

interface ITripCard {
    id: number
    title: string
    refundable: boolean
    meetingPoint: string
    facilities: any
    location: string
    time: string
    price: number
    duration: string
    image: string
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
    const { id, title, refundable, meetingPoint, facilities, location, time, price, duration, image, navigation } = props

    return (
        <Flex flex={1} padding='5px'>
            <VStack rounded='lg' borderWidth='1px' borderColor='gray.200'>
                <Pressable onPress={() => navigation.push('detail-trip', { id, title, refundable, meetingPoint, facilities, location, time, price, duration, image })}>
                    <Image rounded='lg' source={{uri: image}} alt={image} height='100px' />
                </Pressable>
                <VStack padding='5px'>
                    <Text fontSize='11px' fontWeight='bold'>{title}</Text>
                    <HStack alignItems='center'>
                        {
                            refundable
                                ?   <Icon as={Unicons.Check} color='green.400' />
                                :   <Icon as={Unicons.Times} color='red.400' />
                        }
                        <Text fontSize='11px' color={refundable ? 'green.400' : 'red.400'}>Refundable</Text>
                    </HStack>
                </VStack>
                <Flex height='1px' borderTopWidth='0.2px' borderColor='gray.200' />
                <HStack padding='5px' alignItems='center' space='5px'>
                    <Icon as={Unicons.MapPinAlt} />
                    <VStack>
                        <Text fontSize='11px' fontWeight='semibold'>Meeting Point</Text>
                        <Text fontSize='11px'>{meetingPoint}</Text>
                    </VStack>
                </HStack>
                <VStack padding='5px'>
                    <HStack space='5px' alignItems='center'>
                        <Icon as={Unicons.ExclamationOctagon} />
                        <Text fontSize='11px' fontWeight='semibold'>Facilities</Text>
                    </HStack>
                    <HStack marginTop='5px' margin='auto' space='5px'>
                        <VStack alignItems='center'>
                            <Icon as={Unicons.HouseUser} color='blue.400' />
                            <Text fontSize='11px' color='blue.400'>Tent</Text>
                        </VStack>
                        <VStack alignItems='center'>
                            <Icon as={Unicons.Utensils} color='yellow.400' />
                            <Text fontSize='11px' color='yellow.400'>Lunch</Text>
                        </VStack>
                        <VStack alignItems='center'>
                            <Icon as={Unicons.ParkingCircle} color='info.400' />
                            <Text fontSize='11px' color='info.400'>Parking Area</Text>
                        </VStack>
                    </HStack>
                </VStack>
                <HStack padding='5px' alignItems='center' space='5px'>
                    <Icon as={Unicons.LocationPoint} />
                    <Text fontSize='11px'>{location}</Text>
                </HStack>
                <HStack padding='5px' alignItems='center' space='5px'>
                    <Icon as={Unicons.Schedule} />
                    <Text fontSize='11px'>{time}</Text>
                </HStack>
                <HStack padding='5px' alignItems='center' space='5px'>
                    <Icon as={Unicons.Hourglass} />
                    <Text fontSize='11px'>{duration}</Text>
                </HStack>
                <HStack padding='5px' justifyContent='space-between'>
                    <Text fontSize='11px' fontWeight='semibold'>Starting from</Text>
                    <Text fontSize='11px' fontWeight='semibold' color='orange.400'>IDR. {price.toLocaleString()}</Text>
                </HStack>
                <Pressable flexDirection='row' padding='5px' justifyContent='space-between' marginTop='10px'>
                    <Text fontSize='11px' fontWeight='semibold' color='green.400'>Show Package</Text>
                    <Icon as={Unicons.AngleUp} color='green.400' />
                </Pressable>
            </VStack>
        </Flex>
    )
}

const ListTrip = (props: IListTrip) => {
    const destinations = useMemo(() => ['Hiking', 'Diving', 'City Tour'], [])
    const { route, navigation } = props
    const { type, destination, dateStart, dateEnd, participant } = route.params
    console.log(type, destination, dateStart, dateEnd, participant)

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
            <FlatList
                keyExtractor={(trip: any) => trip.id}
                data={dummyTrips}
                padding='5px'
                numColumns={2}
                marginBottom='10px'
                renderItem={({ item }) => {
                    return (
                        <TripCard  
                            id={item.id}
                            title={item.title}
                            refundable={item.refundable}
                            meetingPoint={item.meetingPoint}
                            facilities={item.facilities}
                            location={item.location}
                            time={item.time}
                            price={item.price}
                            duration={item.duration}
                            image={item.image}
                            navigation={navigation}
                        />
                    )
                }}
            />
        </Flex>
    )
}

export default ListTrip