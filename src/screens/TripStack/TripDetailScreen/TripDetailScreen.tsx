import React from 'react'
import Swiper from 'react-native-swiper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import PackageTripCard from '../ListTripScreen/components/PackageTripCard'
import { ROUTE_NAME } from '../../../router'
import { Dimensions } from 'react-native'
import { IC_LOCATION_ON } from '../../../assets'
import { 
    Flex, 
    HStack, 
    Icon, 
    Image, 
    Pressable, 
    ScrollView, 
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
    const { data, group } = route.params

    return (
        <Flex flex='1' backgroundColor='lancBackgroundLight'>
            <StatusBar backgroundColor='white' />
            <ScrollView>
                <Flex height={`${Dimensions.get('window').height / 3}px`}>
                    <Swiper 
                        style={{ height: Dimensions.get('window').height / 3 }} 
                        showsButtons={false} 
                        activeDotColor='#178a11'
                    >
                        {data?.images?.map((image: any, index: number) => {
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
                </Flex>
                <VStack 
                    space='16px' 
                    padding='16px' 
                    borderTopLeftRadius='xl' 
                    borderTopRightRadius='xl'
                >
                    <Text fontFamily='Poppins-SemiBold'>{data?.name}</Text>
                    <HStack alignItems='center' space='5px'>
                        <Image
                            alt='IC_LOCATION_ON'
                            source={IC_LOCATION_ON}
                            width='18px'
                            height='18px'
                            tintColor='gray.400'
                        />
                        <Text fontSize='10px' fontFamily='Poppins-SemiBold'>{data?.location?.text}</Text>
                    </HStack>
                    <Stack>
                        <Text fontFamily='Poppins-SemiBold' fontSize='10px'>Sorotan</Text>
                        <Text fontFamily='Poppins-Regular' fontSize='10px'>{data?.highlight}</Text>
                    </Stack>
                    <Stack>
                        <Text fontFamily='Poppins-SemiBold' fontSize='10px'>Deskripsi</Text>
                        <Text fontFamily='Poppins-Regular' fontSize='10px'>{data?.description}</Text>
                    </Stack>

                    <Stack space='4px'>
                        <Text fontFamily='Poppins-SemiBold' fontSize='10px'>Paket</Text>
                        {data?.[group]?.map((packageTrip: any, index: number) => {
                            return (
                                <PackageTripCard
                                    key={index}
                                    trip={data}
                                    data={packageTrip}
                                    group={group}
                                    onPress={() => navigation.push(ROUTE_NAME.TRIP_NAVIGATOR_PACKAGE_DETAIL, { 
                                        data: packageTrip,
                                        group: group,
                                        trip: data,
                                    })}
                                />
                            )
                        })}
                    </Stack>
                </VStack>
            </ScrollView>
        </Flex>
    )
}

export default TripDetailScreen