import React from 'react'
import TripCard from './components/TripCard'
import TripCardSkeleton from './components/TripCardSkeleton'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useQuery } from 'react-query'
import { tripSearchApi } from '../../../apis/trip'
import { IC_ARROW_BACK, IL_TRIP_NOT_FOUND } from '../../../assets'
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

    const tripList = useQuery(
        'get-trip-list', 
        () => tripSearchApi({
            type, 
            destination: destination?.place_id, 
            group,
            trip_start: new Date(tripStart).getTime(),
            participant,
        }),
    )

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
                    <Text fontSize='16px' fontFamily='Poppins-SemiBold'>{destination?.name}</Text>
                    <Stack direction='row'>
                        { tripStart && <Text fontSize='12px' color='gray.400'>{format(new Date(tripStart), 'dd MMMM yyyy', { locale: id })},</Text> }
                        <Text fontSize='12px' color='gray.400' textTransform='capitalize'> {group} Trip,</Text>
                        { participant && <Text fontSize='12px' color='gray.400'> {participant} Pelancong</Text> }
                    </Stack>
                </Stack>
            </Stack>

            {
                !tripList?.isFetching &&
                tripList?.data?.data?.length > 0 &&
                <FlatList
                    keyExtractor={(trip: any) => trip.id}
                    data={tripList?.data?.data}
                    paddingX='16px'
                    paddingTop='16px'
                    numColumns={1}
                    onRefresh={() => tripList?.refetch()}
                    refreshing={tripList?.isFetching}
                    renderItem={({ item }) => {
                        return <TripCard data={item} navigation={navigation} group={group} />
                    }}
                />
            }

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
                tripList?.data?.data?.length === 0 &&
                <Flex 
                    flex='1'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Image
                        marginTop='-24'
                        alt='IL_TRIP_NOT_FOUND'
                        source={IL_TRIP_NOT_FOUND}
                        width='250px'
                        height='250px'
                    /> 
                    <Text fontFamily='Poppins-SemiBold'>Yaah, belum ada trip tersedia di tempat ini</Text>
                </Flex>
            }
        </Flex>
    )
}

export default ListTripScreen