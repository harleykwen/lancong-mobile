import React from 'react'
import TripCard from './components/TripCard'
import TripCardSkeleton from './components/TripCardSkeleton'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useQuery } from 'react-query'
import { tripSearchApi } from '../../../apis/trip'
import { IC_ARROW_BACK } from '../../../assets'
import { 
    FlatList, 
    Flex, 
    Image, 
    Pressable, 
    Stack, 
    StatusBar, 
    Text, 
} from 'native-base'

interface IListTripScreen {
    route: any
    navigation: any
}

const ListTripScreen = (props: IListTripScreen) => {
    const { route, navigation } = props
    const { 
        type,
        destination,
        group,
        tripStart,
        participant,
    } = route.params

    const tripList = useQuery('get-trip-list', () => tripSearchApi({
        type, 
        destination, 
        group,
        trip_start: new Date(tripStart).getTime(),
        participant,
    }))

    return (
        <Flex backgroundColor='white' flex={1}>
            <StatusBar barStyle='dark-content' backgroundColor='white' />
            <Stack 
                direction='row' 
                paddingX='16px'
                paddingY='8px' 
                shadow='3' 
                backgroundColor='white'
                space='8px'
                alignItems='center'
            >
                <Pressable 
                    onPress={() => {
                        navigation?.goBack()
                    }}
                >
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='24px'
                        height='24px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Stack>
                    <Text fontSize='16px' fontFamily='Poppins-SemiBold'>{destination}</Text>
                    <Stack direction='row'>
                        <Text fontSize='12px' color='gray.400'>{format(new Date(tripStart), 'dd MMMM yyyy', { locale: id })},</Text>
                        <Text fontSize='12px' color='gray.400' textTransform='capitalize'> {group} Trip,</Text>
                        <Text fontSize='12px' color='gray.400'> {participant} Pelancong</Text>
                    </Stack>
                </Stack>
            </Stack>

            {
                tripList?.isFetching &&
                <Stack padding='16px' space='16px'>
                    {[...Array(3)]?.map((_, index: number) => {
                        return (
                            <TripCardSkeleton key={index} />
                        )
                    })}
                </Stack>
            }

            {
                !tripList?.isFetching &&
                tripList?.data &&
                <FlatList
                    keyExtractor={(trip: any) => trip.id}
                    data={tripList?.data?.data}
                    paddingX='16px'
                    paddingTop='16px'
                    numColumns={1}
                    renderItem={({ item }) => {
                        return <TripCard data={item} navigation={navigation} group={group} />
                    }}
                />
            }
        </Flex>
    )
}

export default ListTripScreen