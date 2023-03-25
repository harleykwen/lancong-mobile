import React, { useEffect, useMemo } from 'react'
import * as Unicons from 'react-native-unicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useQuery } from 'react-query'
import { getTripListApi } from '../../../apis/trip'
import { 
    Button, 
    Center, 
    FlatList, 
    Flex, 
    HStack, 
    Icon, 
    Image, 
    Input, 
    Pressable, 
    Skeleton, 
    Stack, 
    Text, 
    VStack,
} from 'native-base'
import TripCard from './components/TripCard'

interface IListTripScreen {
    route: any
    navigation: any
}

interface IButtonDestination {
    label: string
    selected: string
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

const ListTripScreen = (props: IListTripScreen) => {
    const destinations = useMemo(() => ['Hiking', 'Diving', 'City Tour'], [])
    const { route, navigation } = props
    const { 
        type,
        destination,
        group,
        tripStart,
        participant,
    } = route.params

    const tripList = useQuery('get-trip-list', () => getTripListApi({
        type, 
        destination, 
        group,
        trip_start: new Date(tripStart).getTime(),
        participant,
    }))

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

            {tripList?.data &&
                <FlatList
                    keyExtractor={(trip: any) => trip.id}
                    data={tripList?.data}
                    padding='5px'
                    numColumns={2}
                    marginBottom='10px'
                    renderItem={({ item }) => {
                        return <TripCard data={item} navigation={navigation} group={group} />
                    }}
                />
            }
        </Flex>
    )
}

export default ListTripScreen