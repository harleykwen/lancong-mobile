import React from 'react'
import * as Unicons from "react-native-unicons"
import { Box, Button, Flex, HStack, Icon, Image, ScrollView, Stack, Text, VStack } from 'native-base'
import { format } from 'date-fns'

interface ITripDetail {
    route: any
    navigation: any
}

const TripDetail = (props: ITripDetail) => {
    const { route, navigation } = props
    // const { id, title, refundable, meetingPoint, facilities, location, time, price, duration, image } = route.params
    const { data } = route.params
    console.log({data})

    return (
        <Flex flex='1' backgroundColor='white'>
            <ScrollView paddingBottom='100px'>
                <Image source={{uri: data?.images[0]?.url}} alt={data?.images[0]?.url} height='175px' />
                <Flex padding='10px'>
                    <HStack justifyContent='space-between' alignItems='center'>
                        <Box padding='10px' backgroundColor='black' rounded='lg'>
                            <Text fontSize='14px' color='white'>{data?.trip_duration_days + 'D' + data?.trip_duration_night + 'N'}</Text>
                        </Box>
                        <Icon as={Unicons.Bookmark} />
                    </HStack>
                </Flex>
                <VStack space='5px' padding='10px'>
                    <Text fontSize='14px' fontWeight='bold'>{data?.name}</Text>
                    <HStack alignItems='center' space='5px'>
                        <Icon as={Unicons.Star} color='yellow.400' />
                        <Text fontSize='14px'>4.1</Text>
                        <Text fontSize='14px'>(2500 reviews)</Text>
                    </HStack>
                    <HStack alignItems='center' space='5px'>
                        <Icon as={Unicons.LocationPinAlt} />
                        <Text fontSize='14px'>{data?.meeting_point?.text}</Text>
                    </HStack>
                    <Stack marginTop='20px' paddingBottom='60px'>
                        <Stack padding='10px'>
                            <Text>Highlight</Text>
                            <Text color='gray.500'>{data?.highlight}</Text>
                        </Stack>
                        <Stack padding='10px'>
                            <Text>Definition</Text>
                            <Text color='gray.500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt architecto dolores delectus commodi, illo minus fugiat, natus nisi officiis incidunt nostrum vitae recusandae mollitia provident aliquam molestias est veritatis laudantium?</Text>
                        </Stack>
                        <Stack padding='10px' space={2}>
                            <Text>Tour Intenerary</Text>
                            {data?.tour_itineraries?.map((tourItenerary: any, parentIndex: number) => {
                                return (
                                    <Stack key={parentIndex}>
                                        <Text>Day {parentIndex+1}</Text>
                                        {tourItenerary?.itineraries?.map((itinerary: any, childIndex: number) => {
                                            return (
                                                <Stack key={`${parentIndex}${childIndex}`} direction='row'>
                                                    <Text color='gray.500' fontWeight='semibold'>{format(new Date(itinerary?.start_time), 'HH:mm')} - {format(new Date(itinerary?.end_time), 'HH:mm')} </Text>
                                                    <Text color='gray.500'>{itinerary?.description}</Text>
                                                </Stack>
                                            )
                                        })}
                                    </Stack>
                                )
                            })}
                        </Stack>
                        <Stack padding='10px'>
                            <Text>Facilities</Text>
                            <VStack direction='row' alignItems='center' justifyContent='center'>
                                {data?.facilities?.find((x: any) => x?.facility_type === 'Tenda') &&
                                    <VStack alignItems='center'>
                                        <Icon as={Unicons.HouseUser} color='blue.400' />
                                        <Text fontSize='11px' color='blue.400'>Tent</Text>
                                    </VStack>
                                }
                            </VStack>
                        </Stack>
                    </Stack>
                </VStack>
            </ScrollView>
            <Flex 
                position='absolute' 
                bottom='0' 
                backgroundColor='white' 
                width='100%' 
                flexDirection='row' 
                justifyContent='space-between' 
                padding='10px'
                shadow='9'
            >
                <VStack>
                    <Text fontSize='12px'>Starting from</Text>
                    <Text fontSize='16px' color='green.500' fontWeight='semibold'>Rp. {Number(1000000).toLocaleString()}</Text>
                </VStack>
                <Button colorScheme='green' onPress={() => navigation.push('list-trip-type', {
                    id: data?._id, 
                    title: data?.name, 
                    duration: data?.trip_duration_days + 'D' + data?.trip_duration_night + 'N', 
                })}>
                    Find Option
                </Button>
            </Flex>
        </Flex>
    )
}

export default TripDetail