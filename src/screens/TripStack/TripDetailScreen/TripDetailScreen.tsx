import React from 'react'
import Swiper from 'react-native-swiper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import PackageTripCard from '../ListTripScreen/components/PackageTripCard'
import { ROUTE_NAME } from '../../../router'
import { Dimensions } from 'react-native'
import { IC_LOCATION_ON } from '../../../assets'
import { useQuery } from 'react-query'
import { tripDetailApi } from '../../../apis/trip'
import { RefreshControl } from 'react-native-gesture-handler'
import { 
    Flex, 
    HStack, 
    Icon, 
    Image, 
    Pressable, 
    ScrollView, 
    Skeleton, 
    Stack, 
    StatusBar, 
    Text, 
    VStack 
} from 'native-base'

interface ITripDetailScreen {
    route: any
    navigation: any
}

const TripDetailScreen = (props: ITripDetailScreen) => {
    const { route, navigation } = props
    const { 
        id, 
        group, 
        packages, 
    } = route.params

    const tripDetail = useQuery(
        `trip-detail-${id}`,
        () => tripDetailApi({ 
            group, 
            id,  
            packages,
        })
    )

    return (
        <Flex flex='1' backgroundColor='lancBackgroundLight'>
            <StatusBar backgroundColor='white' />
            <ScrollView
                refreshControl={
                    <RefreshControl 
                        refreshing={tripDetail?.isFetching} 
                        onRefresh={() => {
                            tripDetail?.remove()
                            tripDetail?.refetch()
                        }} 
                    />
                }
            >
                <Flex height={`${Dimensions.get('window').height / 3}px`}>
                    {
                        !tripDetail?.isFetching &&
                        tripDetail?.data &&
                        tripDetail?.isSuccess
                            ?   <Swiper 
                                    style={{ height: Dimensions.get('window').height / 3 }} 
                                    showsButtons={false} 
                                    activeDotColor='#178a11'
                                >
                                    {tripDetail?.data?.data?.images?.map((image: any, index: number) => {
                                        return (
                                            <Image 
                                                key={index}
                                                source={{uri: image?.url}} 
                                                alt={image?.url} 
                                                height={`${Dimensions.get('window').height / 3}px`} 
                                            />
                                        )
                                    })}
                                </Swiper>
                            :   <Skeleton height={`${Dimensions.get('window').height / 3}px`} width={Dimensions.get('window').height}  />
                    }

                    {
                        !tripDetail?.isFetching &&
                        tripDetail?.data &&
                        tripDetail?.isSuccess &&
                        <Pressable
                            position='absolute'
                            top='16px'
                            left='16px'
                            onPress={() => navigation?.goBack()}
                        >
                            <Flex 
                                backgroundColor='white'
                                shadow='5' 
                                rounded='full'
                                height='30px'
                                width='30px'
                            >
                                <Icon 
                                    as={MaterialIcons} 
                                    name='arrow-back-ios' 
                                    color='gray.400' 
                                    size='sm' 
                                    marginLeft='10px'
                                    marginTop='7px'
                                />
                            </Flex>
                        </Pressable>
                    }
                </Flex>
                <VStack 
                    space='16px' 
                    padding='16px' 
                    borderTopLeftRadius='xl' 
                    borderTopRightRadius='xl'
                >
                    {
                        !tripDetail?.isFetching &&
                        tripDetail?.data &&
                        tripDetail?.isSuccess
                            ?   <Text fontFamily='Poppins-SemiBold'>{tripDetail?.data?.data?.name}</Text>
                            :   <Skeleton width='200px' height='21.5px' />
                    }

                    {
                        !tripDetail?.isFetching &&
                        tripDetail?.data &&
                        tripDetail?.isSuccess
                            ?   <HStack alignItems='center' space='5px'>
                                    <Image
                                        alt='IC_LOCATION_ON'
                                        source={IC_LOCATION_ON}
                                        width='18px'
                                        height='18px'
                                        tintColor='gray.400'
                                    />
                                    <Text fontSize='10px' fontFamily='Poppins-SemiBold'>{tripDetail?.data?.data?.location?.text}</Text>
                                </HStack>
                            :   <Skeleton width='150px' height='17.75px' />
                    }

                    {
                        !tripDetail?.isFetching &&
                        tripDetail?.data &&
                        tripDetail?.isSuccess
                            ?   <Stack>
                                    <Text fontFamily='Poppins-SemiBold' fontSize='10px'>Sorotan</Text>
                                    <Text fontFamily='Poppins-Regular' fontSize='10px'>{tripDetail?.data?.data?.highlight}</Text>
                                </Stack>
                            :   <Stack>
                                    <Skeleton width='150px' height='15.5px' />
                                    <Skeleton width='250px' height='15.5px' />
                                </Stack>
                    }

                    {
                        !tripDetail?.isFetching &&
                        tripDetail?.data &&
                        tripDetail?.isSuccess
                            ?   <Stack>
                                    <Text fontFamily='Poppins-SemiBold' fontSize='10px'>Deskripsi</Text>
                                    <Text fontFamily='Poppins-Regular' fontSize='10px'>{tripDetail?.data?.data?.description}</Text>
                                </Stack>
                            :   <Stack>
                                    <Skeleton width='150px' height='15.5px' />
                                    <Skeleton width='250px' height='15.5px'  />
                                </Stack>
                    }

                    {
                        !tripDetail?.isFetching &&
                        tripDetail?.data &&
                        tripDetail?.isSuccess
                            ?   <Stack space='4px'>
                                    <Text fontFamily='Poppins-SemiBold' fontSize='10px'>Paket</Text>
                                    {tripDetail?.data?.data?.[group]?.map((packageTrip: any, index: number) => {
                                        return (
                                            <PackageTripCard
                                                key={index}
                                                trip={tripDetail?.data?.data}
                                                data={packageTrip}
                                                group={group}
                                                onPress={() => navigation.push(ROUTE_NAME.TRIP_NAVIGATOR_PACKAGE_DETAIL, { 
                                                    data: packageTrip,
                                                    group: group,
                                                    trip: tripDetail?.data?.data,
                                                })}
                                            />
                                        )
                                    })}
                                </Stack>
                            :   <Stack space='4px'>
                                    <Skeleton width='150px' height='15.5px' />
                                    <Skeleton width='full' height='93px' />
                                    <Skeleton width='full' height='93px' />
                                    <Skeleton width='full' height='93px' />
                                </Stack>
                    }
                </VStack>
            </ScrollView>
        </Flex>
    )
}

export default TripDetailScreen