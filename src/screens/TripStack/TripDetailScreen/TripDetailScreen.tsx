import React from 'react'
import Swiper from 'react-native-swiper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import PackageTripCard from '../ListTripScreen/components/PackageTripCard'
import * as Unicons from 'react-native-unicons'
import { 
    Flex, 
    HStack, 
    Icon, 
    Image, 
    Pressable, 
    ScrollView, 
    Stack, 
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
        <Flex flex='1' backgroundColor='white'>
            <ScrollView paddingBottom='100px'>
                <Flex height='175px'>
                    <Swiper style={{ height: 175 }} showsButtons={false} activeDotColor='#178a11'>
                        {data?.images?.map((image: any, index: number) => {
                            return (
                                <Image 
                                    key={index}
                                    source={{uri: image?.url}} 
                                    alt={image?.url} 
                                    height='175px' 
                                />
                            )
                        })}
                    </Swiper>
                    <Pressable
                        position='absolute'
                        top='10px'
                        left='10px'
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
                <VStack space='5px' padding='10px'>
                    <Text 
                        marginTop='15px' 
                        fontSize='14px' 
                        fontWeight='bold' 
                        marginLeft='10px'
                        fontFamily='Poppins-Bold'
                    >{data?.name}</Text>
                    <HStack 
                        padding='5px' 
                        alignItems='center' 
                        space='5px'
                    >
                        <Icon as={Unicons.LocationPoint} />
                        <Text fontSize='11px' fontFamily='Poppins-Light'>{data?.location?.text}</Text>
                    </HStack>
                    <Stack marginTop='10px'>
                        <Stack padding='10px'>
                            <Text fontFamily='Poppins-Medium'>Sorotan</Text>
                            <Text color='gray.500' fontFamily='Poppins-Light'>{data?.highlight}</Text>
                        </Stack>
                        <Stack padding='10px'>
                            <Text fontFamily='Poppins-Medium'>Deskripsi</Text>
                            <Text color='gray.500' fontFamily='Poppins-Light'>{data?.description}</Text>
                        </Stack>
                    </Stack>

                    <Stack padding='10px' space='5px'>
                        <Text marginTop='5px' fontFamily='Poppins-Medium'>Paket</Text>
                        {data?.[group]?.map((packageTrip: any, index: number) => {
                            return (
                                <PackageTripCard
                                    key={index}
                                    trip={data}
                                    data={packageTrip}
                                    group={group}
                                    onPress={() => navigation.push('trip-package-detail', { 
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