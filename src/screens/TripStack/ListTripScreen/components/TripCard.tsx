import React, { memo } from 'react'
import PackageTripCard from './PackageTripCard'
import { Dimensions } from 'react-native'
import { ROUTE_NAME } from '../../../../router'
import { IC_ARROW_DROP_DOWN, IC_LOCATION_ON } from '../../../../assets'
import { 
    Actionsheet,
    Center,
    Flex, 
    Image, 
    Pressable, 
    Stack, 
    Text,
    useDisclose, 
} from 'native-base'

interface ITripCard {
    data: any
    group: any
    navigation: any
}

const TripCard = (props: ITripCard) => {
    const {
        data,
        group,
        navigation,
    } = props

    const { 
        isOpen, 
        onOpen, 
        onClose 
    } = useDisclose()

    return (
        <Flex flex={1} backgroundColor='white'>
            <Pressable 
                onPress={() => navigation.push(ROUTE_NAME.TRIP_NAVIGATOR_TRIP_DETAIL, { 
                    data: data,
                    group: group,
                })}
            >
                <Stack 
                    direction='row'
                    backgroundColor='white' 
                    shadow='3' 
                    rounded='lg'
                    marginBottom='16px'
                >
                    <Image 
                        source={{uri: data?.images[0]?.url}} 
                        alt={data?.images[0]?.url} 
                        height='150px' 
                        width='40%'
                        borderTopLeftRadius='lg'
                        borderBottomLeftRadius='lg'
                    />
                    <Stack 
                        padding='8px' 
                        backgroundColor='white' 
                        borderTopRightRadius='lg'
                        borderBottomRightRadius='lg'
                        flex='1'
                    >
                        <Text 
                            fontFamily='Poppins-SemiBold' 
                            fontSize='12px'
                            numberOfLines={1}
                            isTruncated={true}
                            maxWidth={Dimensions.get('window').width * 60 / 100}
                        >{data?.name}</Text>
                        <Center 
                            width='50px' 
                            backgroundColor='gray.100' 
                            rounded='sm' 
                            padding='1px'
                            marginTop='4px'
                        >
                            <Text fontSize='10px' fontFamily='Poppins-SemiBold' color='gray.400'>Trip</Text>
                        </Center>
                        <Stack 
                            direction='row' 
                            alignItems='center' 
                            marginTop='5px'
                        >
                            <Image
                                alt='IC_LOCATION_ON'
                                source={IC_LOCATION_ON}
                                width='18px'
                                height='18px'
                                tintColor='gray.400'
                                marginTop='-1px'
                            />
                            <Text 
                                fontSize='10px' 
                                color='gray.400' 
                                fontFamily='Poppins-SemiBold'
                            >{data?.location?.text}</Text>
                        </Stack>
                        <Stack 
                            marginTop='auto' 
                            direction='row' 
                            justifyContent='space-between'
                            alignItems='flex-end'
                        >
                            <Stack>
                                <Text fontSize='10px'>Mulai Dari</Text>
                                <Text 
                                    fontSize='10px' 
                                    fontFamily='Poppins-SemiBold' 
                                    color='orange.400'
                                >Rp. {Math.min(...data?.[group]?.map((packageTrip: any) => packageTrip.price))?.toLocaleString('id')}</Text>
                            </Stack>
                            <Pressable onPress={onOpen}>
                                <Stack direction='row' alignItems='flex-end'>
                                    <Text 
                                        color='lancPrimaryLight' 
                                        fontSize='10px' 
                                        fontFamily='Poppins-SemiBold'
                                    >Lihat Paket</Text>
                                    <Image
                                        alt='IC_ARROW_DROP_DOWN'
                                        source={IC_ARROW_DROP_DOWN}
                                        width='18px'
                                        height='18px'
                                        tintColor='lancPrimaryLight'
                                    />
                                </Stack>
                            </Pressable>
                        </Stack>
                    </Stack>
                </Stack>
            </Pressable>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content padding='16px' backgroundColor='white'>
                    <Stack width='100%' space='16px'>
                        <Stack 
                            direction='row' 
                            justifyContent='space-between' 
                            alignItems='center'
                        >
                            <Stack direction='row'>
                                <Text fontSize='12px' fontFamily='Poppins-Regular'>Paket Trip</Text>
                                <Text fontSize='12px' fontFamily='Poppins-SemiBold'> {data?.name}</Text>
                            </Stack>
                            <Stack direction='row'>
                                <Text 
                                    color='lancPrimaryLight' 
                                    fontSize='12px' 
                                    fontFamily='Poppins-SemiBold'
                                >{data?.[group]?.length}</Text>
                                <Text 
                                    color='lancPrimaryLight' 
                                    fontSize='12px' 
                                    fontFamily='Poppins-Regular'
                                > Paket</Text>
                            </Stack>
                        </Stack>
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
                                        trip: data
                                    })}
                                />
                            )
                        })}
                    </Stack>
                </Actionsheet.Content>
            </Actionsheet>
        </Flex>
    )
}

export default memo(TripCard)