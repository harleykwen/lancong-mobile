import React from 'react'
import TripCard from './components/TripCard'
import { useQuery } from 'react-query'
import { tripSearchApi } from '../../../apis/trip'
import { IC_ARROW_BACK } from '../../../assets'
import { 
    FlatList, 
    Flex, 
    Image, 
    Pressable, 
    Stack, 
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
                <Text fontFamily='Poppins-SemiBold' fontSize='20px'>Daftar trip di {destination}</Text>
            </Stack>

            {tripList?.data &&
                <FlatList
                    keyExtractor={(trip: any) => trip.id}
                    data={tripList?.data?.data}
                    // columnWrapperStyle={{ flex: 1, maxWidth: '50%' }}
                    padding='24px'
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